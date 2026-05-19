"""
StellarWave — AI Operations Sales Deck Builder.

Renders 10 pages × 2 languages (EN + FR) to PNG via Pillow,
then assembles two PDFs via PyMuPDF.

Usage:
    python scripts/build_sales_deck.py [--lang en|fr|all] [--page N] [--no-pdf]

Output:
    public/decks/stellarwave-ai-ops-en.pdf
    public/decks/stellarwave-ai-ops-fr.pdf
"""

from __future__ import annotations

import argparse
import io
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Iterable

import fitz  # PyMuPDF
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# ─────────────────────────────────────────────
# Paths
# ─────────────────────────────────────────────

ROOT = Path(__file__).resolve().parent.parent
FONTS_SRC = ROOT / "public" / "fonts"
FONTS_CACHE = ROOT / "scripts" / "_fonts_cache"
PAGES_DIR = ROOT / "docs" / "sales-deck" / "pages"
OUTPUT_DIR = ROOT / "public" / "decks"

PAGES_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
FONTS_CACHE.mkdir(parents=True, exist_ok=True)


# ─────────────────────────────────────────────
# Design tokens (mirror docs/sales-deck/design-system.md)
# ─────────────────────────────────────────────

# Canvas
CANVAS_W, CANVAS_H = 1920, 1080
MARGIN_X, MARGIN_Y = 120, 96

# Colors
COLOR_BG = "#0A0E1A"
COLOR_SURFACE = "#131829"
COLOR_SURFACE_HI = "#1A2038"
COLOR_TEXT = "#E7ECFF"
COLOR_TEXT_2 = "#A6B0CF"
COLOR_TEXT_3 = "#6B7599"
COLOR_AMBER = "#F59E0B"
COLOR_AMBER_DIM = "#C97D08"
COLOR_TEAL = "#2DD4BF"
COLOR_CORAL = "#EF6C4A"
COLOR_VIOLET = "#A78BFA"
COLOR_BORDER = (120, 150, 230, 31)        # rgba 0.12
COLOR_BORDER_AMBER = (245, 158, 11, 89)   # rgba 0.35


# ─────────────────────────────────────────────
# Fonts: convert woff2 → ttf cache, then load
# ─────────────────────────────────────────────

WOFF2_FONTS = {
    "clash_regular": "ClashDisplay-Regular.woff2",
    "clash_medium": "ClashDisplay-Medium.woff2",
    "clash_semibold": "ClashDisplay-Semibold.woff2",
    "clash_bold": "ClashDisplay-Bold.woff2",
    "cabinet_regular": "CabinetGrotesk-Regular.woff2",
    "cabinet_medium": "CabinetGrotesk-Medium.woff2",
    "cabinet_bold": "CabinetGrotesk-Bold.woff2",
}

# System TTFs (Windows) — used for glyphs unavailable in Clash/Cabinet
# (notably arrows, en-dashes when not present in display fonts).
SYSTEM_FALLBACKS = {
    "inter_regular": Path("C:/Windows/Fonts/Inter-Regular.ttf"),
    "inter_medium": Path("C:/Windows/Fonts/Inter-Medium.ttf"),
    "inter_semibold": Path("C:/Windows/Fonts/Inter-SemiBold.ttf"),
}


def ensure_ttf_cache() -> dict[str, Path]:
    """Convert woff2 → ttf into FONTS_CACHE; expose system Inter as well."""
    out: dict[str, Path] = {}
    for key, woff2_name in WOFF2_FONTS.items():
        src = FONTS_SRC / woff2_name
        dst = FONTS_CACHE / (woff2_name.replace(".woff2", ".ttf"))
        if not src.exists():
            print(f"[warn] Missing font: {src}", file=sys.stderr)
            continue
        if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
            font = TTFont(str(src))
            font.flavor = None
            font.save(str(dst))
        out[key] = dst
    for key, path in SYSTEM_FALLBACKS.items():
        if path.exists():
            out[key] = path
    return out


_FONT_CACHE: dict[tuple[str, int], ImageFont.FreeTypeFont] = {}
_TTFS: dict[str, Path] | None = None


def font(key: str, size: int) -> ImageFont.FreeTypeFont:
    """Load a TTF font from cache. Falls back to Inter if missing."""
    global _TTFS
    if _TTFS is None:
        _TTFS = ensure_ttf_cache()
    cache_key = (key, size)
    if cache_key in _FONT_CACHE:
        return _FONT_CACHE[cache_key]

    if key in _TTFS:
        f = ImageFont.truetype(str(_TTFS[key]), size=size)
    else:
        # Fallback: Inter from system
        sys_inter = Path("C:/Windows/Fonts/Inter-Regular.ttf")
        if sys_inter.exists():
            f = ImageFont.truetype(str(sys_inter), size=size)
        else:
            f = ImageFont.load_default()
    _FONT_CACHE[cache_key] = f
    return f


# ─────────────────────────────────────────────
# Drawing primitives
# ─────────────────────────────────────────────


def new_canvas(bg: str = COLOR_BG) -> Image.Image:
    return Image.new("RGB", (CANVAS_W, CANVAS_H), bg)


def add_radial_glow(
    img: Image.Image,
    center: tuple[int, int],
    radius: int,
    color: tuple[int, int, int],
    intensity: float = 0.18,
) -> None:
    """Soft radial glow overlay. center=(x,y) px, intensity in [0,1]."""
    w, h = img.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = center
    # Approximate a soft glow with a single ellipse + blur
    bbox = (cx - radius, cy - radius, cx + radius, cy + radius)
    draw.ellipse(bbox, fill=(*color, int(255 * intensity)))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius / 3))
    img.paste(overlay, (0, 0), overlay)


def add_constellation(img: Image.Image, count: int = 40, seed: int = 1) -> None:
    """Decorative dots at low opacity (cover/last page)."""
    import random

    rng = random.Random(seed)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for _ in range(count):
        x = rng.randint(0, img.width)
        y = rng.randint(0, img.height)
        s = rng.choice([1, 1, 2, 2, 3])
        a = rng.randint(20, 50)
        draw.ellipse([x, y, x + s, y + s], fill=(159, 179, 255, a))
    img.paste(overlay, (0, 0), overlay)


def text(
    img: Image.Image,
    xy: tuple[int, int],
    s: str,
    *,
    font_key: str,
    size: int,
    color: str | tuple = COLOR_TEXT,
    anchor: str = "la",
    tracking: float = 0,
) -> tuple[int, int, int, int]:
    """Draw text. anchor PIL: la=left-ascender, lt=left-top, mm=middle-middle, etc.
    Returns bbox (l, t, r, b)."""
    f = font(font_key, size)
    draw = ImageDraw.Draw(img)
    if tracking != 0:
        # Approximate letter-spacing: draw char by char.
        x, y = xy
        if anchor == "mm":
            # Pre-measure for centering
            total_w = sum(draw.textlength(c, font=f) for c in s) + tracking * (len(s) - 1)
            x = xy[0] - total_w / 2
            asc, desc = f.getmetrics()
            y = xy[1] - (asc + desc) / 2
            anchor = "la"
        for c in s:
            draw.text((x, y), c, font=f, fill=color, anchor=anchor)
            x += draw.textlength(c, font=f) + tracking
        return (xy[0], xy[1], int(x), xy[1] + size)

    draw.text(xy, s, font=f, fill=color, anchor=anchor)
    bbox = draw.textbbox(xy, s, font=f, anchor=anchor)
    return bbox


def separator(
    img: Image.Image,
    xy: tuple[int, int],
    width: int = 64,
    height: int = 2,
    color: str = COLOR_AMBER,
) -> None:
    """Amber gradient line under titles."""
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    # Linear gradient: amber → transparent
    r, g, b = ImageDraw.ImageColor.getrgb(color)
    for x in range(width):
        a = int(255 * (1 - x / width))
        draw.line([(x, 0), (x, height)], fill=(r, g, b, a))
    img.paste(overlay, xy, overlay)


def rounded_rect(
    img: Image.Image,
    box: tuple[int, int, int, int],
    radius: int = 24,
    fill: str | None = None,
    outline: tuple | None = None,
    outline_width: int = 1,
) -> None:
    """Rounded rectangle (card)."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    if fill:
        if isinstance(fill, str):
            fill = ImageDraw.ImageColor.getrgb(fill) + (255,)
        draw.rounded_rectangle(box, radius=radius, fill=fill)
    if outline:
        draw.rounded_rectangle(box, radius=radius, outline=outline, width=outline_width)
    img.paste(overlay, (0, 0), overlay)


def page_chrome(img: Image.Image, page_num: int, total: int = 10, lang: str = "en", show_logo: bool = True) -> None:
    """Footer: page number left, URL right, optional logo top-left."""
    if show_logo:
        text(img, (MARGIN_X, MARGIN_Y - 50), "STELLARWAVE", font_key="clash_medium",
             size=20, color=COLOR_TEXT, tracking=2)
    text(img, (MARGIN_X, CANVAS_H - 50), f"{page_num:02d} / {total:02d}",
         font_key="cabinet_regular", size=13, color=COLOR_TEXT_3)
    url = "stellarwave.fr/ai-operations" if lang == "en" else "stellarwave.fr/operations-ia"
    text(img, (CANVAS_W - MARGIN_X, CANVAS_H - 50), url,
         font_key="cabinet_regular", size=13, color=COLOR_TEXT_3, anchor="ra")


def wrap_text(s: str, font_obj: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    """Word-wrap to fit max_width pixels."""
    words = s.split()
    lines: list[str] = []
    current = ""
    draw = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    for w in words:
        test = (current + " " + w).strip()
        if draw.textlength(test, font=font_obj) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


def text_block(
    img: Image.Image,
    xy: tuple[int, int],
    s: str,
    *,
    font_key: str,
    size: int,
    color: str | tuple = COLOR_TEXT_2,
    max_width: int,
    line_height: float = 1.55,
) -> int:
    """Multi-line wrapped text. Returns final y."""
    f = font(font_key, size)
    lines = wrap_text(s, f, max_width)
    x, y = xy
    line_h = int(size * line_height)
    draw = ImageDraw.Draw(img)
    for line in lines:
        draw.text((x, y), line, font=f, fill=color)
        y += line_h
    return y


# ─────────────────────────────────────────────
# Per-page renderers — EN
# ─────────────────────────────────────────────


@dataclass(frozen=True)
class PageContext:
    lang: str  # "en" or "fr"


def page_01_cover(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (CANVAS_W * 0.85, CANVAS_H * 0.1), 700, (245, 158, 11), 0.06)
    add_radial_glow(img, (CANVAS_W * 0.1, CANVAS_H * 0.9), 800, (28, 65, 230), 0.08)
    add_constellation(img, count=50, seed=42)

    is_en = ctx.lang == "en"

    # Tag
    tag = "STELLARWAVE × WEALTH MANAGEMENT" if is_en else "STELLARWAVE × GESTION DE PATRIMOINE"
    text(img, (CANVAS_W / 2, 380), tag, font_key="cabinet_medium", size=18,
         color=COLOR_AMBER, anchor="mm", tracking=4)

    # H1 — two lines
    line1 = "AI Operations" if is_en else "Opérations IA"
    line2 = "for Wealth Managers" if is_en else "pour cabinets de gestion"
    text(img, (CANVAS_W / 2, 510), line1, font_key="clash_medium", size=110,
         color=COLOR_TEXT, anchor="mm")
    text(img, (CANVAS_W / 2, 630), line2, font_key="clash_medium", size=110,
         color=COLOR_TEXT, anchor="mm")

    # Separator
    sep_y = 730
    sep_w = 200
    separator(img, ((CANVAS_W - sep_w) // 2, sep_y), width=sep_w, height=2)

    # Italic subtitle
    sub_en = '"Custom automation systems that give your senior advisors\n10 to 15 hours back — every week."'
    sub_fr = '« Des systèmes d\'automatisation sur mesure qui rendent\nà vos conseillers seniors 10 à 15 heures par semaine. »'
    sub = sub_en if is_en else sub_fr
    f_sub = font("cabinet_medium", 30)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(sub.split("\n")):
        draw.text((CANVAS_W / 2, 800 + i * 44), line, font=f_sub, fill=COLOR_VIOLET, anchor="mm")

    # Bottom edition note
    note = "A premium engagement framework — 2026 edition" if is_en else "Cadre d'engagement premium — édition 2026"
    text(img, (CANVAS_W / 2, 970), note, font_key="cabinet_regular", size=14,
         color=COLOR_TEXT_3, anchor="mm", tracking=2)

    page_chrome(img, page_num=1, lang=ctx.lang, show_logo=False)
    return img


def page_02_problem(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (CANVAS_W * 0.9, CANVAS_H * 0.1), 600, (239, 108, 74), 0.06)

    is_en = ctx.lang == "en"

    label = "THE INVISIBLE COST" if is_en else "LE COÛT INVISIBLE"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    # Hero stat — left column
    text(img, (MARGIN_X, MARGIN_Y + 50), "30%", font_key="clash_bold", size=180,
         color=COLOR_AMBER)

    # Sub-stat — right of hero (vertical center align with hero)
    sub_en = "of your top advisors' week\nis spent on tasks AI can do\nin minutes."
    sub_fr = "du temps de vos meilleurs\nconseillers part en tâches\nautomatisables."
    sub = sub_en if is_en else sub_fr
    f_sub = font("clash_medium", 38)
    draw = ImageDraw.Draw(img)
    sub_x = MARGIN_X + 600
    sub_y_start = MARGIN_Y + 100
    for i, line in enumerate(sub.split("\n")):
        draw.text((sub_x, sub_y_start + i * 52), line, font=f_sub, fill=COLOR_TEXT)

    # Body line
    body_en = ("Onboarding documents, RFP responses, compliance reviews, quarterly reporting — "
               "the tasks no one bills for that quietly consume your highest-paid people.")
    body_fr = ("Onboarding clients, réponses aux AO, revues conformité, reporting trimestriel — "
               "ces tâches que personne ne facture, qui rongent vos collaborateurs les mieux payés.")
    text_block(img, (MARGIN_X, MARGIN_Y + 320), body_en if is_en else body_fr,
               font_key="cabinet_regular", size=20, color=COLOR_TEXT_2,
               max_width=CANVAS_W - 2 * MARGIN_X, line_height=1.55)

    # Three pain columns — compact
    col_y = MARGIN_Y + 460
    col_h = 280
    col_w = (CANVAS_W - 2 * MARGIN_X - 60) // 3
    cols_en = [
        ("Client onboarding", "8 hours", "per new client",
         "KYC, account setup, IPS drafting, custodian paperwork."),
        ("RFP responses", "5,800 hours", "per year (10-person team)",
         "Institutional & gov RFPs consume up to 23% of team capacity."),
        ("Compliance reviews", "30–40%", "of admin cost wasted",
         "Doc parsing, audit trails, filings — rules-based, manual."),
    ]
    cols_fr = [
        ("Onboarding client", "8 heures", "par nouveau client",
         "KYC, ouverture, rédaction du DEC, dossier dépositaire."),
        ("Réponses aux AO", "5 800 heures", "par an (équipe 10 personnes)",
         "Les AO institutionnels consomment 23 % de la capacité."),
        ("Revues conformité", "30–40 %", "du coût admin perdu",
         "Lecture, traçabilité, reportings ACPR — règles fixes manuelles."),
    ]
    cols = cols_en if is_en else cols_fr

    for i, (title, big, small, body) in enumerate(cols):
        cx = MARGIN_X + i * (col_w + 30)
        rounded_rect(img, (cx, col_y, cx + col_w, col_y + col_h), radius=20,
                     fill=COLOR_SURFACE)
        text(img, (cx + 30, col_y + 28), title, font_key="cabinet_medium",
             size=13, color=COLOR_TEXT_3, tracking=2)
        text(img, (cx + 30, col_y + 60), big, font_key="clash_semibold",
             size=48, color=COLOR_CORAL)
        text(img, (cx + 30, col_y + 130), small, font_key="cabinet_regular",
             size=16, color=COLOR_TEXT_2)
        text_block(img, (cx + 30, col_y + 180), body, font_key="cabinet_regular",
                   size=14, color=COLOR_TEXT_2, max_width=col_w - 60, line_height=1.5)

    # Bottom strip — single line, compact
    strip_en = ("At $300 / advisor-hour fully loaded, a 5-advisor firm loses "
                "$200k+ of senior capacity every year. No one notices.")
    strip_fr = ("À 250 € l'heure chargé, un cabinet de 5 conseillers perd "
                "165 k€+ de capacité senior chaque année. Personne ne le remarque.")
    text(img, (MARGIN_X, col_y + col_h + 30), strip_en if is_en else strip_fr,
         font_key="cabinet_medium", size=17, color=COLOR_VIOLET)

    # Footnotes
    foot_en = "1 RFXAI  ·  2 Empaxis  ·  3 Internal calc — 5 × 10h × $300 × 50w = $750k (floor at $200k)"
    foot_fr = "1 RFXAI  ·  2 Empaxis  ·  3 Calcul interne — 5 × 10 h × 250 € × 50 sem = 625 k€ (plancher à 165 k€)"
    text(img, (MARGIN_X, CANVAS_H - 90), foot_en if is_en else foot_fr,
         font_key="cabinet_regular", size=11, color=COLOR_TEXT_3)

    page_chrome(img, page_num=2, lang=ctx.lang)
    return img


def page_03_failures(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (CANVAS_W * 0.5, 0), 800, (245, 158, 11), 0.04)

    is_en = ctx.lang == "en"

    label = "THE FOUR FALSE PATHS" if is_en else "LES QUATRE FAUSSES PISTES"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h2_en = "Why most AI initiatives in wealth\nmanagement stall."
    h2_fr = "Pourquoi la plupart des projets IA\nbloquent dans les cabinets de gestion."
    h2 = h2_en if is_en else h2_fr
    f_h2 = font("clash_medium", 56)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h2.split("\n")):
        draw.text((MARGIN_X, MARGIN_Y + 50 + i * 64), line, font=f_h2, fill=COLOR_TEXT)

    # Comparison table — 4 rows × 3 cols
    rows_en = [
        ("ChatGPT Enterprise / Copilot", "AI for everyone in the firm",
         "Generic outputs. No knowledge of your IPS templates, custodian, compliance rules. Advisors stop using it after week 2."),
        ("Make / Zapier / n8n", "Automate without code",
         "Recipe-based. Breaks at the first API change. Cannot reason. Cannot read a 60-page document and flag the three risk clauses."),
        ("In-house AI engineer", "Build it ourselves",
         "$250k+ fully loaded. 12-month ramp. Likely to leave inside 18 months — taking the architecture with them."),
        ("Big-4 / strategy consulting", "Enterprise-grade AI roadmap",
         "$500k–$2M engagements. 18-month timelines. PowerPoint deliverables. Code you don't own."),
    ]
    rows_fr = [
        ("ChatGPT Enterprise / Copilot", "« De l'IA pour tout le monde »",
         "Sorties génériques. Aucune connaissance de vos modèles DEC, votre dépositaire, vos règles ACPR. Vos conseillers décrochent en 15 jours."),
        ("Make / Zapier / n8n", "« Automatisez sans code »",
         "Logique en cascade fragile. Casse au premier changement d'API. Incapable de raisonner. Incapable de lire 60 pages et d'en sortir 3 clauses à risque."),
        ("Recruter un ingénieur IA", "« Internalisons »",
         "180 k€+ chargé. Ramp-up 12 mois. Risque de départ à 18 mois — l'architecture part avec lui."),
        ("Conseil stratégique (Big-4)", "« Roadmap IA enterprise »",
         "Engagement 400 k€ – 1,5 M€. 18 mois de delivery. Livrables PowerPoint. Code que vous ne possédez pas."),
    ]
    rows = rows_en if is_en else rows_fr

    table_y = MARGIN_Y + 230
    row_h = 130
    col_w_option = 360
    col_w_promise = 340
    col_w_fail = CANVAS_W - 2 * MARGIN_X - col_w_option - col_w_promise - 60

    # Header line
    draw.line([(MARGIN_X, table_y - 20), (CANVAS_W - MARGIN_X, table_y - 20)],
              fill=COLOR_BORDER_AMBER[:3] + (140,), width=1)

    for idx, (option, promise, why_fail) in enumerate(rows):
        y = table_y + idx * row_h
        # Option (left)
        text(img, (MARGIN_X, y), option, font_key="clash_medium", size=24, color=COLOR_TEXT)
        # Promise (middle, italic)
        text(img, (MARGIN_X + col_w_option + 30, y), promise, font_key="cabinet_regular",
             size=18, color=COLOR_TEXT_3)
        # Why it fails (right)
        text_block(img, (MARGIN_X + col_w_option + col_w_promise + 60, y - 3),
                   why_fail, font_key="cabinet_regular", size=15,
                   color=COLOR_TEXT_2, max_width=col_w_fail, line_height=1.5)
        # Separator below row
        if idx < len(rows) - 1:
            sep_y = y + row_h - 25
            draw.line([(MARGIN_X, sep_y), (CANVAS_W - MARGIN_X, sep_y)],
                      fill=COLOR_BORDER[:3] + (40,), width=1)

    # Closing line
    closing_en = "There is a fifth path."
    closing_fr = "Il existe une cinquième voie."
    text(img, (MARGIN_X, CANVAS_H - 130), closing_en if is_en else closing_fr,
         font_key="cabinet_bold", size=36, color=COLOR_VIOLET)

    page_chrome(img, page_num=3, lang=ctx.lang)
    return img


def page_04_approach(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (CANVAS_W / 2, CANVAS_H / 2), 700, (245, 158, 11), 0.05)

    is_en = ctx.lang == "en"

    label = "THE FIFTH PATH" if is_en else "LA CINQUIÈME VOIE"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h1_en = "Custom AI operations.\nDelivered in weeks. Owned by you."
    h1_fr = "Des opérations IA sur mesure.\nLivrées en semaines. Possédées par vous."
    h1 = h1_en if is_en else h1_fr
    f_h1 = font("clash_medium", 64)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h1.split("\n")):
        draw.text((MARGIN_X, MARGIN_Y + 50 + i * 76), line, font=f_h1, fill=COLOR_TEXT)

    # 4 pillar cards — 2×2
    pillars_en = [
        ("01 · CUSTOM-BUILT",
         "Claude agents + MCP servers + skill files,\ndesigned around YOUR firm's workflows.\nNot a SaaS template. Not a generic chatbot.\nYour operations, codified."),
        ("02 · DATA SOVEREIGNTY",
         "MCP servers run on-premise.\nAnthropic API: zero training-data retention.\nGDPR-aligned. SOC 2 in progress.\nYour client data never leaves your perimeter."),
        ("03 · SENIOR-LED DELIVERY",
         "One architect from discovery to deployment.\nNo junior hand-offs. No account managers.\nYou speak with the person\nbuilding it."),
        ("04 · EMBEDDED OPERATIONS",
         "A monthly retainer keeps it alive:\nnew automations, monitoring, edge fixes.\nThe system grows with the firm.\nIt does not rot in production."),
    ]
    pillars_fr = [
        ("01 · SUR MESURE",
         "Agents Claude + serveurs MCP + skill files,\nconstruits autour de VOS workflows.\nPas un template SaaS. Pas un chatbot.\nVos opérations, codifiées."),
        ("02 · SOUVERAINETÉ DES DONNÉES",
         "Serveurs MCP déployables on-premise.\nAPI Anthropic : zéro rétention contractuelle.\nConforme RGPD. SOC 2 en cours.\nVos données ne quittent jamais\nvotre périmètre."),
        ("03 · DELIVERY MENÉE PAR UN SENIOR",
         "Un seul architecte du discovery au deploy.\nPas de relais junior. Pas d'AM.\nVous parlez à la personne\nqui construit."),
        ("04 · OPÉRATIONS EMBARQUÉES",
         "Le retainer maintient le système vivant :\nnouvelles automations, monitoring, fixes.\nLe système grandit avec le cabinet.\nIl ne pourrit pas en production."),
    ]
    pillars = pillars_en if is_en else pillars_fr

    card_w = (CANVAS_W - 2 * MARGIN_X - 30) // 2
    card_h = 260
    grid_y = MARGIN_Y + 250

    for i, (title, body) in enumerate(pillars):
        col = i % 2
        row = i // 2
        cx = MARGIN_X + col * (card_w + 30)
        cy = grid_y + row * (card_h + 30)
        rounded_rect(img, (cx, cy, cx + card_w, cy + card_h), radius=20,
                     fill=COLOR_SURFACE)
        text(img, (cx + 32, cy + 28), title, font_key="cabinet_medium",
             size=14, color=COLOR_AMBER, tracking=3)
        # Body multi-line
        f_body = font("cabinet_regular", 16)
        for j, line in enumerate(body.split("\n")):
            draw.text((cx + 32, cy + 70 + j * 28), line, font=f_body, fill=COLOR_TEXT_2)

    page_chrome(img, page_num=4, lang=ctx.lang)
    return img


def page_05_use_cases(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    is_en = ctx.lang == "en"

    label = "WHAT WE BUILD" if is_en else "CE QUE NOUS CONSTRUISONS"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h2_en = "Five proven automations\nfor wealth management firms."
    h2_fr = "Cinq automations éprouvées\npour les cabinets de gestion."
    h2 = h2_en if is_en else h2_fr
    f_h2 = font("clash_medium", 50)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h2.split("\n")):
        draw.text((MARGIN_X, MARGIN_Y + 50 + i * 58), line, font=f_h2, fill=COLOR_TEXT)

    # 5 cards in 2 rows: 3 + 2
    cases_en = [
        ("01", "Client onboarding",
         "Pulls KYC docs, drafts the IPS from intake notes, generates custodian paperwork.",
         "8 h → 2 h", "per new client (-75%)"),
        ("02", "RFP response system",
         "Reads RFP, retrieves matching content from your knowledge base, drafts the response.",
         "-60% / +16%", "response time / win rate"),
        ("03", "Compliance review",
         "Parses regulatory updates, flags impact on filings, drafts amendment language.",
         "-30 to -40%", "admin cost reduction"),
        ("04", "Quarterly reviews",
         "Pulls portfolio data, drafts personalized review per client. Advisor edits in 30 min.",
         "4 h → 30 min", "per client (-87%)"),
        ("05", "Lead intelligence",
         "Researches inbound prospect, produces 1-page brief, suggests best-fit advisor.",
         "< 5 min", "pre-call brief ready"),
    ]
    cases_fr = [
        ("01", "Onboarding client",
         "Récupère les pièces KYC, rédige le DEC, génère le dossier dépositaire.",
         "8 h → 2 h", "par nouveau client (-75 %)"),
        ("02", "Réponses aux AO",
         "Lit l'AO, retrouve le contenu pertinent dans votre base, rédige la réponse.",
         "-60 % / +16 %", "temps / taux de win"),
        ("03", "Revue de conformité",
         "Lit les évolutions ACPR/AMF, identifie les impacts, rédige les amendements.",
         "-30 à -40 %", "du coût admin"),
        ("04", "Reportings trimestriels",
         "Récupère les données portefeuille, rédige une revue personnalisée par client.",
         "4 h → 30 min", "par client (-87 %)"),
        ("05", "Intelligence prospects",
         "Analyse le prospect entrant, produit une note d'1 page, suggère le bon conseiller.",
         "< 5 min", "note de pré-RDV"),
    ]
    cases = cases_en if is_en else cases_fr

    grid_y = MARGIN_Y + 220
    card_w = (CANVAS_W - 2 * MARGIN_X - 60) // 3
    card_h = 290

    for i, (num, title, body, roi_main, roi_sub) in enumerate(cases):
        col = i % 3
        row = i // 3
        cx = MARGIN_X + col * (card_w + 30)
        cy = grid_y + row * (card_h + 30)
        rounded_rect(img, (cx, cy, cx + card_w, cy + card_h), radius=20,
                     fill=COLOR_SURFACE)
        text(img, (cx + 28, cy + 24), num, font_key="cabinet_medium",
             size=14, color=COLOR_AMBER, tracking=2)
        text(img, (cx + 28, cy + 60), title, font_key="clash_medium",
             size=26, color=COLOR_TEXT)
        text_block(img, (cx + 28, cy + 110), body, font_key="cabinet_regular",
                   size=14, color=COLOR_TEXT_2, max_width=card_w - 56, line_height=1.5)
        # Bottom ROI block
        draw.line([(cx + 28, cy + card_h - 90), (cx + card_w - 28, cy + card_h - 90)],
                  fill=COLOR_BORDER[:3] + (50,), width=1)
        text(img, (cx + 28, cy + card_h - 75), roi_main, font_key="inter_semibold",
             size=24, color=COLOR_TEAL)
        text(img, (cx + 28, cy + card_h - 38), roi_sub, font_key="cabinet_regular",
             size=13, color=COLOR_TEXT_3)

    page_chrome(img, page_num=5, lang=ctx.lang)
    return img


def page_06_roi(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (CANVAS_W * 0.85, CANVAS_H * 0.9), 700, (45, 212, 191), 0.06)

    is_en = ctx.lang == "en"

    label = "THE NUMBERS" if is_en else "LES CHIFFRES"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h2_en = "Capacity returned to your firm —\nmeasured, not promised."
    h2_fr = "De la capacité rendue à votre cabinet —\nmesurée, pas promise."
    h2 = h2_en if is_en else h2_fr
    f_h2 = font("clash_medium", 50)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h2.split("\n")):
        draw.text((MARGIN_X, MARGIN_Y + 50 + i * 58), line, font=f_h2, fill=COLOR_TEXT)

    # Formula visualization
    formula_y = MARGIN_Y + 230
    rounded_rect(img, (MARGIN_X, formula_y, CANVAS_W - MARGIN_X, formula_y + 220),
                 radius=20, fill=COLOR_SURFACE)

    if is_en:
        labels = ["Advisors freed", "Hours/week saved", "Loaded $/hour", "Weeks/year"]
        vals = ["5", "× 10", "× $300", "× 50"]
        big_label = "Capacity returned per year"
        big_val = "$ 750,000"
    else:
        labels = ["Conseillers libérés", "Heures/sem économisées", "Coût horaire chargé", "Semaines/an"]
        vals = ["5", "× 10", "× 250 €", "× 50"]
        big_label = "Capacité rendue par an"
        big_val = "625 000 €"

    # 4 cells + 1 result
    cell_w = 200
    cell_x = MARGIN_X + 50
    for i, (lbl, val) in enumerate(zip(labels, vals)):
        x = cell_x + i * (cell_w + 10)
        text(img, (x, formula_y + 50), lbl, font_key="cabinet_medium",
             size=12, color=COLOR_TEXT_3, tracking=2)
        text(img, (x, formula_y + 90), val, font_key="clash_semibold",
             size=44, color=COLOR_TEXT)

    # Result block (right side of formula)
    result_x = MARGIN_X + 50 + 4 * (cell_w + 10) + 60
    text(img, (result_x, formula_y + 50), big_label, font_key="cabinet_medium",
         size=12, color=COLOR_TEAL, tracking=2)
    text(img, (result_x, formula_y + 80), big_val, font_key="clash_bold",
         size=64, color=COLOR_AMBER)

    # Scenario table
    table_y = formula_y + 280
    text(img, (MARGIN_X, table_y), "Scenarios" if is_en else "Scénarios",
         font_key="cabinet_medium", size=14, color=COLOR_AMBER, tracking=2)

    if is_en:
        headers = ["Firm size", "Hours saved / week", "Capacity returned / year", "Workflow Studio payback"]
        rows = [
            ("3 advisors", "30 h", "$450k", "1.7 months"),
            ("5 advisors", "50 h", "$750k", "1 month"),
            ("12 advisors", "120 h", "$1.8M", "< 3 weeks"),
        ]
    else:
        headers = ["Taille du cabinet", "Heures économisées / sem", "Capacité rendue / an", "Payback Workflow Studio"]
        rows = [
            ("3 conseillers", "30 h", "375 k€", "2 mois"),
            ("5 conseillers", "50 h", "625 k€", "1,2 mois"),
            ("12 conseillers", "120 h", "1,5 M€", "< 1 mois"),
        ]

    col_widths = [340, 360, 380, 360]
    cx_pos = MARGIN_X
    th_y = table_y + 40
    for i, h in enumerate(headers):
        text(img, (cx_pos, th_y), h, font_key="cabinet_medium",
             size=12, color=COLOR_TEXT_3, tracking=1)
        cx_pos += col_widths[i]
    draw.line([(MARGIN_X, th_y + 30), (CANVAS_W - MARGIN_X, th_y + 30)],
              fill=COLOR_BORDER_AMBER[:3] + (140,), width=1)

    for r_idx, row in enumerate(rows):
        ry = th_y + 50 + r_idx * 50
        cx_pos = MARGIN_X
        for c_idx, val in enumerate(row):
            color = COLOR_TEAL if c_idx == 2 else COLOR_TEXT
            text(img, (cx_pos, ry), val, font_key="clash_medium",
                 size=22, color=color)
            cx_pos += col_widths[c_idx]

    # Bottom strip
    strip_en = "We measure ROI in our engagements. We do not project it from slides."
    strip_fr = "Nous mesurons le ROI dans nos engagements. Nous ne le projetons pas en slide."
    text(img, (MARGIN_X, CANVAS_H - 110), strip_en if is_en else strip_fr,
         font_key="cabinet_medium", size=17, color=COLOR_VIOLET)

    page_chrome(img, page_num=6, lang=ctx.lang)
    return img


def page_07_case_study(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (0, CANVAS_H / 2), 700, (167, 139, 250), 0.05)

    is_en = ctx.lang == "en"

    label = "CASE STUDY" if is_en else "CAS CLIENT"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h2_en = "80-operator services firm —\nbefore / after."
    h2_fr = "Cabinet de services, 80 opérateurs —\navant / après."
    h2 = h2_en if is_en else h2_fr
    f_h2 = font("clash_medium", 48)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h2.split("\n")):
        draw.text((MARGIN_X, MARGIN_Y + 50 + i * 56), line, font=f_h2, fill=COLOR_TEXT)

    # Disclosure
    disc_en = ("Adapted from a recent StellarWave engagement in operations-heavy services. "
               "We do not yet claim a wealth management client; this case will be replaced "
               "by a named RIA reference upon our first signed deal in the segment. Numbers below are real.")
    disc_fr = ("Adapté d'un engagement StellarWave récent dans les services à fort volume opérationnel. "
               "Nous ne revendiquons pas de client en gestion de patrimoine à ce stade ; ce cas sera "
               "remplacé par une référence cabinet nommée dès notre premier client du segment. Les chiffres sont réels.")
    text_block(img, (MARGIN_X, MARGIN_Y + 200), disc_en if is_en else disc_fr,
               font_key="cabinet_regular", size=13, color=COLOR_TEXT_3,
               max_width=CANVAS_W - 2 * MARGIN_X - 600, line_height=1.5)

    # Left column — before / after
    left_x = MARGIN_X
    left_y = MARGIN_Y + 320
    col_w = (CANVAS_W - 2 * MARGIN_X) * 0.55

    if is_en:
        before_lines = [
            ("3 hours", "of manual coordination per operator per day"),
            ("Recurring entry errors", "flagged by the controller"),
            ("Hard-cap at 80 operators", "without a full-time admin"),
        ]
        after_lines = [
            ("30 minutes", "of supervised review per operator per day"),
            ("Zero entry errors in 90 days", "audit trail auto-generated"),
            ("Capacity to 160", "without hire — margin per operator +18%"),
        ]
        before_label = "BEFORE"
        after_label = "AFTER (12 weeks)"
    else:
        before_lines = [
            ("3 heures", "de coordination manuelle par opérateur / jour"),
            ("Erreurs de saisie récurrentes", "détectées par le contrôleur"),
            ("Plafond à 80 opérateurs", "sans embauche d'admin"),
        ]
        after_lines = [
            ("30 minutes", "de revue supervisée par opérateur / jour"),
            ("Zéro erreur sur 90 jours", "piste d'audit auto-générée"),
            ("Capacité à 160", "sans embauche — marge par op. +18 %"),
        ]
        before_label = "AVANT"
        after_label = "APRÈS (12 semaines)"

    # Two columns: BEFORE / AFTER
    col_inner_w = (col_w - 30) / 2

    text(img, (left_x, left_y), before_label, font_key="cabinet_medium",
         size=14, color=COLOR_CORAL, tracking=3)
    text(img, (left_x + col_inner_w + 30, left_y), after_label,
         font_key="cabinet_medium", size=14, color=COLOR_TEAL, tracking=3)

    draw.line([(left_x, left_y + 40), (left_x + col_w, left_y + 40)],
              fill=COLOR_BORDER[:3] + (40,), width=1)

    for i, ((b_main, b_sub), (a_main, a_sub)) in enumerate(zip(before_lines, after_lines)):
        ly = left_y + 70 + i * 130
        text(img, (left_x, ly), b_main, font_key="clash_semibold",
             size=24, color=COLOR_TEXT)
        text_block(img, (left_x, ly + 38), b_sub, font_key="cabinet_regular",
                   size=14, color=COLOR_TEXT_2, max_width=col_inner_w, line_height=1.5)

        text(img, (left_x + col_inner_w + 30, ly), a_main, font_key="clash_semibold",
             size=24, color=COLOR_TEXT)
        text_block(img, (left_x + col_inner_w + 30, ly + 38), a_sub,
                   font_key="cabinet_regular", size=14, color=COLOR_TEXT_2,
                   max_width=col_inner_w, line_height=1.5)

    # Right column — quote + outcome panel
    right_x = MARGIN_X + col_w + 80
    right_y = MARGIN_Y + 320

    quote_en = '"We were not looking for AI.\nWe were looking for our weekends back."'
    quote_fr = "« On ne cherchait pas de l'IA.\nOn cherchait à récupérer nos week-ends. »"
    quote = quote_en if is_en else quote_fr
    f_quote = font("cabinet_bold", 28)
    for i, line in enumerate(quote.split("\n")):
        draw.text((right_x, right_y + i * 40), line, font=f_quote, fill=COLOR_VIOLET)

    text(img, (right_x, right_y + 110), "— COO, anonymized" if is_en else "— COO, anonymisé",
         font_key="cabinet_regular", size=14, color=COLOR_TEXT_3)

    # Outcome panel
    panel_y = right_y + 170
    panel_h = 280
    panel_w = CANVAS_W - MARGIN_X - right_x
    rounded_rect(img, (right_x, panel_y, right_x + panel_w, panel_y + panel_h),
                 radius=20, fill=COLOR_SURFACE)

    if is_en:
        kv = [
            ("Project investment", "$32,000"),
            ("Retainer", "$3,500 / month"),
            ("Payback", "Month 5"),
            ("Status", "Engagement ongoing 18+ months"),
        ]
    else:
        kv = [
            ("Investissement projet", "28 000 €"),
            ("Retainer", "3 200 € / mois"),
            ("Payback", "Mois 5"),
            ("Statut", "Engagement actif 18+ mois"),
        ]
    for i, (k, v) in enumerate(kv):
        ky = panel_y + 28 + i * 60
        text(img, (right_x + 28, ky), k, font_key="cabinet_medium",
             size=12, color=COLOR_TEXT_3, tracking=2)
        text(img, (right_x + 28, ky + 22), v, font_key="clash_medium",
             size=22, color=COLOR_TEXT)

    page_chrome(img, page_num=7, lang=ctx.lang)
    return img


def page_08_packages(ctx: PageContext) -> Image.Image:
    img = new_canvas()

    is_en = ctx.lang == "en"

    label = "ENGAGEMENT MODEL" if is_en else "MODÈLE D'ENGAGEMENT"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h2 = "Three ways to start." if is_en else "Trois manières de commencer."
    text(img, (MARGIN_X, MARGIN_Y + 50), h2, font_key="clash_medium",
         size=64, color=COLOR_TEXT)

    # 3 pricing cards
    cards_y = MARGIN_Y + 230
    card_h = 580
    card_w = (CANVAS_W - 2 * MARGIN_X - 60) // 3
    draw = ImageDraw.Draw(img)

    if is_en:
        cards = [
            ("DIAGNOSIS CALL", "Free", "30 min · video · no pitch",
             ["Mapping of 5–8 automation candidates", "Ranked by ROI / effort / risk",
              "Written summary within 48 h", "No commitment to proceed"],
             "Book the call →", False),
            ("WORKFLOW STUDIO", "$ 25 – 40 k", "6–10 weeks · fixed-price",
             ["Discovery + custom design", "5 production-ready automations",
              "Documentation + team training", "30 days post-launch support"],
             "Request a scope →", True),
            ("AI OPERATIONS", "$ 3 – 5 k / mo", "6-month minimum · ongoing",
             ["One new automation per month", "Monitoring + edge-case fixes",
              "Quarterly ROI review", "Direct Slack with the architect"],
             "Discuss the retainer →", False),
        ]
        footer = ("Most engagements: Workflow Studio first, then the AI Operations retainer. "
                  "First-year envelope: $60-90k per client.")
    else:
        cards = [
            ("AUDIT DIAGNOSTIC", "Gratuit", "30 min · visio · sans pitch",
             ["Cartographie de 5 à 8 candidats", "Classement par ROI / effort / risque",
              "Synthèse écrite sous 48 h", "Aucun engagement de poursuivre"],
             "Réserver l'audit →", False),
            ("WORKFLOW STUDIO", "25 – 40 k€", "6-10 semaines · prix fixe",
             ["Discovery + design sur mesure", "5 automations en production",
              "Documentation + formation équipe", "30 jours de support"],
             "Demander un cadrage →", True),
            ("OPÉRATIONS IA", "3 – 5 k€ / mois", "6 mois minimum · récurrent",
             ["1 nouvelle automation / mois", "Monitoring + correctifs",
              "Revue ROI trimestrielle", "Slack direct avec l'architecte"],
             "Discuter du retainer →", False),
        ]
        footer = ("La majorité des engagements : Workflow Studio puis retainer Opérations IA. "
                  "Enveloppe première année : 60-90 k€ par client.")

    for i, (name, price, sub, bullets, cta, highlighted) in enumerate(cards):
        cx = MARGIN_X + i * (card_w + 30)
        outline = (COLOR_BORDER_AMBER, 2) if highlighted else (None, 0)
        rounded_rect(img, (cx, cards_y, cx + card_w, cards_y + card_h),
                     radius=24, fill=COLOR_SURFACE,
                     outline=outline[0], outline_width=outline[1])
        text(img, (cx + 32, cards_y + 32), name, font_key="cabinet_medium",
             size=13, color=COLOR_AMBER, tracking=3)
        text(img, (cx + 32, cards_y + 80), price, font_key="clash_bold",
             size=58, color=COLOR_AMBER)
        text(img, (cx + 32, cards_y + 170), sub, font_key="cabinet_regular",
             size=14, color=COLOR_TEXT_2)

        # Separator
        draw.line([(cx + 32, cards_y + 220), (cx + card_w - 32, cards_y + 220)],
                  fill=COLOR_BORDER[:3] + (50,), width=1)

        # Bullets
        f_bul = font("cabinet_regular", 16)
        for j, b in enumerate(bullets):
            by = cards_y + 250 + j * 50
            # bullet dot
            draw.ellipse([(cx + 32, by + 9), (cx + 38, by + 15)],
                         fill=COLOR_TEAL)
            draw.text((cx + 50, by), b, font=f_bul, fill=COLOR_TEXT_2)

        # CTA at bottom — Inter for arrow glyph support
        text(img, (cx + 32, cards_y + card_h - 60), cta, font_key="inter_semibold",
             size=15, color=COLOR_AMBER)

    # Footer strip
    text(img, (MARGIN_X, CANVAS_H - 100), footer, font_key="cabinet_medium",
         size=15, color=COLOR_TEXT_2)

    page_chrome(img, page_num=8, lang=ctx.lang)
    return img


def page_09_process_security(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    is_en = ctx.lang == "en"

    label = "HOW WE WORK" if is_en else "COMMENT ON TRAVAILLE"
    text(img, (MARGIN_X, MARGIN_Y), label, font_key="cabinet_medium", size=14,
         color=COLOR_AMBER, tracking=4)

    h2_en = "Predictable delivery.\nDefensible architecture."
    h2_fr = "Delivery prévisible.\nArchitecture défendable."
    h2 = h2_en if is_en else h2_fr
    f_h2 = font("clash_medium", 50)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h2.split("\n")):
        draw.text((MARGIN_X, MARGIN_Y + 50 + i * 58), line, font=f_h2, fill=COLOR_TEXT)

    split_x = CANVAS_W // 2

    # LEFT — Process timeline
    left_label = "DELIVERY TIMELINE" if is_en else "CALENDRIER DE DELIVERY"
    text(img, (MARGIN_X, MARGIN_Y + 220), left_label, font_key="cabinet_medium",
         size=12, color=COLOR_TEXT_3, tracking=3)

    if is_en:
        steps = [
            ("Week 1", "DISCOVERY", "Workflows mapped. Stakeholders interviewed.\nAutomation candidates ranked."),
            ("Week 2-3", "DESIGN", "Skill files architected. MCP servers scoped.\nApproval before build."),
            ("Week 4-7", "BUILD", "Iterative development. Weekly demos.\nTest data + dry runs."),
            ("Week 8-10", "DEPLOY + TRAIN", "Production deployment. Team training.\n30-day support window opens."),
        ]
    else:
        steps = [
            ("Semaine 1", "DISCOVERY", "Cartographie des workflows. Entretiens.\nClassement des candidats."),
            ("Sem. 2-3", "DESIGN", "Skill files. Cadrage des serveurs MCP.\nValidation avant build."),
            ("Sem. 4-7", "BUILD", "Développement itératif. Démos hebdo.\nTests + dry runs."),
            ("Sem. 8-10", "DEPLOY + FORMATION", "Mise en production. Formation équipe.\nFenêtre de support 30 jours."),
        ]

    for i, (week, name, body) in enumerate(steps):
        sy = MARGIN_Y + 270 + i * 130
        text(img, (MARGIN_X, sy), week, font_key="cabinet_bold",
             size=15, color=COLOR_TEAL, tracking=1)
        text(img, (MARGIN_X + 130, sy), name, font_key="clash_semibold",
             size=20, color=COLOR_TEXT)
        f_body = font("cabinet_regular", 14)
        for j, line in enumerate(body.split("\n")):
            draw.text((MARGIN_X + 130, sy + 35 + j * 22), line, font=f_body,
                      fill=COLOR_TEXT_2)

    # Vertical separator
    draw.line([(split_x, MARGIN_Y + 220), (split_x, CANVAS_H - 130)],
              fill=COLOR_BORDER[:3] + (40,), width=1)

    # RIGHT — Security stack
    right_x = split_x + 60
    right_label = "SECURITY STACK" if is_en else "STACK SÉCURITÉ"
    text(img, (right_x, MARGIN_Y + 220), right_label, font_key="cabinet_medium",
         size=12, color=COLOR_TEXT_3, tracking=3)

    if is_en:
        sec = [
            ("LLM PROVIDER", "Anthropic Claude API\nZero training-data retention by contract\nEU & US data residency available"),
            ("ORCHESTRATION", "MCP servers — self-hostable\nSkill files versioned in your repo\nNo third-party SaaS in the data path"),
            ("DATA HANDLING", "Encryption at rest (AES-256)\nEncryption in transit (TLS 1.3)\nGDPR / EU AI Act aligned"),
            ("ACCESS CONTROL", "Role-based, audited\nPer-automation kill switch\nDaily monitoring + monthly review"),
        ]
    else:
        sec = [
            ("LLM PROVIDER", "API Anthropic Claude\nZéro rétention pour entraînement\nRésidence des données EU & US au choix"),
            ("ORCHESTRATION", "Serveurs MCP — auto-hébergeables\nSkill files dans VOTRE dépôt Git\nAucun SaaS tiers dans le data path"),
            ("TRAITEMENT DONNÉES", "Chiffrement au repos (AES-256)\nChiffrement en transit (TLS 1.3)\nConforme RGPD / EU AI Act"),
            ("CONTRÔLE D'ACCÈS", "Rôles + audit\nKill switch par automation\nMonitoring quotidien + revue mensuelle"),
        ]

    for i, (cat, body) in enumerate(sec):
        sy = MARGIN_Y + 270 + i * 130
        text(img, (right_x, sy), cat, font_key="clash_semibold",
             size=18, color=COLOR_AMBER)
        f_body = font("cabinet_regular", 14)
        for j, line in enumerate(body.split("\n")):
            draw.text((right_x, sy + 32 + j * 22), line, font=f_body,
                      fill=COLOR_TEXT_2)

    # Footer SOC2 note
    soc_en = "SOC 2 Type II — in progress. Target Q4 2026."
    soc_fr = "SOC 2 Type II — en cours. Objectif Q4 2026."
    text(img, (MARGIN_X, CANVAS_H - 100), soc_en if is_en else soc_fr,
         font_key="cabinet_medium", size=14, color=COLOR_TEXT_3)

    page_chrome(img, page_num=9, lang=ctx.lang)
    return img


def page_10_next_step(ctx: PageContext) -> Image.Image:
    img = new_canvas()
    add_radial_glow(img, (CANVAS_W / 2, CANVAS_H * 0.95), 800, (245, 158, 11), 0.08)
    add_constellation(img, count=40, seed=99)

    is_en = ctx.lang == "en"

    tag = "NEXT STEP" if is_en else "PROCHAINE ÉTAPE"
    text(img, (CANVAS_W / 2, MARGIN_Y + 50), tag, font_key="cabinet_medium",
         size=18, color=COLOR_AMBER, anchor="mm", tracking=4)

    if is_en:
        h1_lines = ["One question.", "Thirty minutes.", "Your roadmap."]
    else:
        h1_lines = ["Une question.", "Trente minutes.", "Votre roadmap."]
    f_h1 = font("clash_medium", 90)
    draw = ImageDraw.Draw(img)
    for i, line in enumerate(h1_lines):
        draw.text((CANVAS_W / 2, 220 + i * 110), line, font=f_h1, fill=COLOR_TEXT, anchor="mm")

    body_en = ("Book a Diagnosis Call. We map five to eight automation candidates for your firm,\n"
               "ranked by ROI. We send the written summary within 48 h.\n"
               "You decide what to do next.")
    body_fr = ("Réservez l'Audit Diagnostic. Nous cartographions 5 à 8 candidats d'automation\n"
               "pour votre cabinet, classés par ROI. Nous envoyons la synthèse sous 48 h.\n"
               "Vous décidez de la suite.")
    body = body_en if is_en else body_fr
    f_body = font("cabinet_regular", 22)
    for i, line in enumerate(body.split("\n")):
        draw.text((CANVAS_W / 2, 600 + i * 36), line, font=f_body, fill=COLOR_TEXT_2, anchor="mm")

    # CTA pill
    cta_text = "Book the Diagnosis Call →" if is_en else "Réserver l'Audit Diagnostic →"
    pill_w, pill_h = 540, 80
    pill_x = (CANVAS_W - pill_w) // 2
    pill_y = 750
    rounded_rect(img, (pill_x, pill_y, pill_x + pill_w, pill_y + pill_h),
                 radius=40, fill=COLOR_AMBER)
    text(img, (CANVAS_W / 2, pill_y + pill_h / 2), cta_text,
         font_key="inter_semibold", size=20, color="#0A0E1A", anchor="mm")

    # Caption
    cap = "cal.com/stellarwave/diagnosis" if is_en else "cal.com/stellarwave/audit"
    text(img, (CANVAS_W / 2, pill_y + pill_h + 30), cap, font_key="cabinet_regular",
         size=13, color=COLOR_TEXT_3, anchor="mm")

    # Contact block
    contact_y = 920
    if is_en:
        contact_lines = [
            ("Amar Mehdaoui", "clash_medium", 22, COLOR_TEXT),
            ("Founder, StellarWave", "cabinet_regular", 14, COLOR_TEXT_2),
            ("amar@stellarwave.fr  ·  linkedin.com/in/amar-mehdaoui", "cabinet_regular", 14, COLOR_AMBER),
        ]
    else:
        contact_lines = [
            ("Amar Mehdaoui", "clash_medium", 22, COLOR_TEXT),
            ("Fondateur, StellarWave", "cabinet_regular", 14, COLOR_TEXT_2),
            ("amar@stellarwave.fr  ·  linkedin.com/in/amar-mehdaoui", "cabinet_regular", 14, COLOR_AMBER),
        ]
    for i, (line, fkey, sz, col) in enumerate(contact_lines):
        text(img, (CANVAS_W / 2, contact_y + i * (sz + 8)), line,
             font_key=fkey, size=sz, color=col, anchor="mm")

    page_chrome(img, page_num=10, lang=ctx.lang, show_logo=False)
    return img


# ─────────────────────────────────────────────
# Page registry — full deck
# ─────────────────────────────────────────────

PAGE_RENDERERS: list[Callable[[PageContext], Image.Image]] = [
    page_01_cover,
    page_02_problem,
    page_03_failures,
    page_04_approach,
    page_05_use_cases,
    page_06_roi,
    page_07_case_study,
    page_08_packages,
    page_09_process_security,
    page_10_next_step,
]


# ─────────────────────────────────────────────
# Build pipeline
# ─────────────────────────────────────────────


def render_pages(lang: str, only: int | None = None) -> list[Path]:
    """Render all pages for a language. Returns list of png paths."""
    paths = []
    ctx = PageContext(lang=lang)
    for i, renderer in enumerate(PAGE_RENDERERS, start=1):
        if only and i != only:
            continue
        img = renderer(ctx)
        out = PAGES_DIR / f"page-{i:02d}-{lang}.png"
        img.save(out, "PNG", optimize=True)
        print(f"  ✓ {out.name}")
        paths.append(out)
    return paths


def build_pdf(png_paths: list[Path], output: Path, title: str) -> None:
    """Assemble PNGs into a single PDF via PyMuPDF."""
    doc = fitz.open()
    for png in sorted(png_paths):
        pix = fitz.Pixmap(str(png))
        rect = fitz.Rect(0, 0, pix.width, pix.height)
        page = doc.new_page(width=pix.width, height=pix.height)
        page.insert_image(rect, pixmap=pix)
    doc.set_metadata({
        "title": title,
        "author": "StellarWave",
        "subject": "AI Operations for Wealth Managers",
        "keywords": "AI automation, wealth management, RIA, Claude, MCP",
    })
    doc.save(str(output), garbage=4, deflate=True, clean=True)
    doc.close()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--lang", choices=["en", "fr", "all"], default="all")
    parser.add_argument("--page", type=int, default=None,
                        help="Render a single page (1-10) for fast iteration")
    parser.add_argument("--no-pdf", action="store_true",
                        help="Skip PDF assembly (PNG only)")
    args = parser.parse_args()

    langs = ["en", "fr"] if args.lang == "all" else [args.lang]

    for lang in langs:
        print(f"\n→ Rendering pages [{lang.upper()}]")
        paths = render_pages(lang, only=args.page)

        if not args.no_pdf and not args.page:
            output = OUTPUT_DIR / f"stellarwave-ai-ops-{lang}.pdf"
            title = ("AI Operations for Wealth Managers"
                     if lang == "en" else "Opérations IA pour cabinets de gestion")
            build_pdf(paths, output, title)
            size_mb = output.stat().st_size / (1024 * 1024)
            print(f"  → {output.relative_to(ROOT)} ({size_mb:.2f} MB)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
