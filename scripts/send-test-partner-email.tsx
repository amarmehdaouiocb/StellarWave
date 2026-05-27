/**
 * Rend + envoie (test) les e-mails de prospection partenaires dans le design
 * StellarWave, via Resend, avec 2 PDF en pièces jointes (pitch + deck de
 * l'audience) + logo & photo embarqués en images inline (cid:).
 *
 * Deux audiences :
 *   --audience=comptables   (défaut) → cabinets d'expertise comptable (10 %)
 *   --audience=commerciaux            → apporteurs d'affaires / commerciaux (8 %)
 *
 * Usage :
 *   tsx scripts/send-test-partner-email.tsx                          → preview comptables
 *   tsx scripts/send-test-partner-email.tsx --audience=commerciaux   → preview commerciaux
 *   tsx scripts/send-test-partner-email.tsx --send --to=x@y.com       → envoi réel
 *   tsx scripts/send-test-partner-email.tsx --send --audience=commerciaux --to=x@y.com
 *
 * Expéditeur : amar.mehdaoui@stellarwave.fr
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { ComponentType } from "react";
import sharp from "sharp";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { PartenariatComptablesOutreachEmail } from "../src/emails/partenariat-comptables-outreach";
import { AffiliationCommerciauxOutreachEmail } from "../src/emails/affiliation-commerciaux-outreach";

const ROOT = process.cwd();

// ── Chargement minimal de .env.local (dotenv absent du projet) ──
function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    console.warn("⚠️  .env.local introuvable — RESEND_API_KEY peut manquer.");
  }
}

const FROM = "Amar · StellarWave <amar.mehdaoui@stellarwave.fr>";
// Destinataire paramétrable : --to=adresse@exemple.com (défaut : adresse de test perso)
const TO =
  process.argv.find((a) => a.startsWith("--to="))?.split("=")[1] ??
  "amar.mehdaoui.pro@gmail.com";
const REPLY_TO = "amar.mehdaoui@stellarwave.fr";

type EmailProps = {
  bookingUrl?: string;
  logoSrc?: string;
  photoSrc?: string;
  warm?: boolean;
  tu?: boolean;
};

type AudienceKey = "comptables" | "commerciaux";

type AudienceConfig = {
  Email: ComponentType<EmailProps>;
  subjectBase: string;
  subjectWarm: string;
  deck: { filename: string; path: string };
  guide: { filename: string; path: string };
  plainText: string;
  plainTextWarm: string;
};

// Pièce jointe « pitch ». Les decks sont générés sans grain (PdfPage noise={false})
// → fond vectoriel, PDF léger (~0.4 Mo) et lisible sur iOS. Plus besoin de version -web.
const PITCH_ATTACHMENT = {
  filename: "stellarwave-pitch.pdf",
  path: "public/stellarwave-pitch.pdf",
} as const;

const PLAIN_TEXT_COMPTABLES = `Bonjour,

Je suis Amar, fondateur de StellarWave, une entreprise de développement logiciel sur mesure pour PME.

Je contacte quelques cabinets d'expertise comptable pour mettre en place un partenariat simple : quand l'un de vos clients a un besoin sur la partie informatique, vous pouvez nous le présenter.

On a déjà construit des outils pour des restaurants indépendants, des centres de formation Taxi/VTC et médicale, ainsi que des acteurs de la copropriété : CRM, apps mobiles, dashboards, portails client, automatisations.

On échange avec le client, on cadre le besoin, on fait le devis, puis on gère la livraison et le support. Le cabinet ne porte pas la mission technique, ne prend pas de risque projet, et garde un partenaire fiable à recommander.

Si un projet est signé puis encaissé, le cabinet touche 10 % du contrat, sans exclusivité ni engagement de volume.

Est-ce que le sujet mérite un échange de 15 minutes avec la bonne personne chez vous ?

Bonne journée,
Amar
StellarWave
contact@stellarwave.fr
stellarwave.fr

Si ce message n'est pas pertinent, répondez simplement "stop" et je ne vous recontacterai pas.`;

const PLAIN_TEXT_COMMERCIAUX = `Bonjour,

Je suis Amar, fondateur de StellarWave, une entreprise de développement logiciel sur mesure pour PME.

Je mets en place un programme d'affiliation simple : quand vous croisez une entreprise avec un besoin digital — site, app, outil interne, automatisation —, vous nous présentez le contact, et on gère tout le reste.

Vous faites l'intro et une qualification rapide. On prend le relais : audit gratuit, démo, devis à prix fixe, contrat. On livre le projet et on assure le support — vous n'avez rien à gérer.

On a déjà construit des outils pour des restaurants indépendants, des centres de formation Taxi/VTC et médicale, ainsi que des acteurs de la copropriété : CRM, apps mobiles, dashboards, portails client, automatisations.

Vous touchez 8 % du contrat signé. Sur un ticket de 18 à 40 k€, ça représente 1 440 à 3 200 € par client présenté — versé à l'encaissement, sans exclusivité ni engagement de volume.

Vous avez un ou deux contacts en tête à qui ça pourrait servir ?

Bonne journée,
Amar
StellarWave
contact@stellarwave.fr
stellarwave.fr

Si ce message n'est pas pertinent, répondez simplement "stop" et je ne vous recontacterai pas.`;

// ── Variantes « warm » (relance après un appel d'il y a ~1 mois) ──
const PLAIN_TEXT_COMPTABLES_WARM = `Bonjour,

On a échangé au téléphone il y a environ un mois, au sujet d'un partenariat possible entre votre cabinet et StellarWave. Comme convenu, je vous envoie les éléments de présentation.

Pour rappel, on développe des logiciels sur mesure pour les PME : quand l'un de vos clients a un besoin sur la partie informatique, vous nous le présentez, et on s'occupe de tout le reste — cadrage du besoin, devis à prix fixe, livraison et support. Le cabinet ne porte aucune mission technique, et aucun risque projet.

Si un projet est signé puis encaissé, le cabinet touche 10 % du contrat, sans exclusivité ni engagement de volume.

Vous trouverez notre présentation (pitch + plaquette du partenariat) en pièce jointe. Si le sujet vous parle, on peut en reparler 30 minutes quand vous voulez : https://calendar.app.google/51BiLHgAVhsLrxTC9 — ou je vous rappelle.

Bonne journée,
Amar Mehdaoui
Fondateur · StellarWave
amar.mehdaoui@stellarwave.fr · stellarwave.fr`;

const PLAIN_TEXT_COMMERCIAUX_WARM = `Bonjour,

On a échangé au téléphone il y a environ un mois au sujet du programme d'affiliation StellarWave. Comme convenu, je t'envoie les éléments.

Pour rappel, on développe des logiciels sur mesure pour les PME : quand tu croises une entreprise avec un besoin digital — site, app, outil interne, automatisation —, tu nous présentes le contact, et on gère tout le reste : audit gratuit, démo, devis à prix fixe, livraison et support. Tu ne portes ni la technique, ni le devis, ni le risque projet.

Tu touches 8 % du contrat signé, à l'encaissement, sans exclusivité ni engagement de volume.

Tu trouveras notre présentation (pitch + programme d'affiliation) en pièce jointe. On en reparle 30 minutes quand tu veux : https://calendar.app.google/51BiLHgAVhsLrxTC9 — ou je te rappelle.

Bonne journée,
Amar Mehdaoui
Fondateur · StellarWave
amar.mehdaoui@stellarwave.fr · stellarwave.fr`;

const SUBJECT_WARM = "StellarWave — les éléments suite à notre échange";

const AUDIENCES: Record<AudienceKey, AudienceConfig> = {
  comptables: {
    Email: PartenariatComptablesOutreachEmail,
    subjectBase: "Partenaire informatique pour vos clients",
    subjectWarm: SUBJECT_WARM,
    deck: {
      filename: "stellarwave-partenariat-comptables.pdf",
      path: "public/decks/cabinetcomptable/stellarwave-partenariat-comptables-fr.pdf",
    },
    guide: {
      filename: "stellarwave-guide-cabinet-comptable.pdf",
      path: "public/decks/cabinetcomptable/stellarwave-guide-cabinet-comptable-fr.pdf",
    },
    plainText: PLAIN_TEXT_COMPTABLES,
    plainTextWarm: PLAIN_TEXT_COMPTABLES_WARM,
  },
  commerciaux: {
    Email: AffiliationCommerciauxOutreachEmail,
    subjectBase: "Vendez StellarWave à votre réseau — 8 % par contrat",
    subjectWarm: SUBJECT_WARM,
    deck: {
      filename: "stellarwave-affiliation-commerciaux.pdf",
      path: "public/decks/commerciaux/stellarwave-affiliation-commerciaux-fr.pdf",
    },
    guide: {
      filename: "stellarwave-guide-apporteur.pdf",
      path: "public/decks/commerciaux/stellarwave-guide-apporteur-fr.pdf",
    },
    plainText: PLAIN_TEXT_COMMERCIAUX,
    plainTextWarm: PLAIN_TEXT_COMMERCIAUX_WARM,
  },
};

function resolveAudience(): AudienceKey {
  const raw = process.argv.find((a) => a.startsWith("--audience="))?.split("=")[1];
  if (raw === "commerciaux" || raw === "comptables") return raw;
  if (raw) {
    console.error(`✖ --audience invalide : "${raw}". Valeurs : comptables | commerciaux`);
    process.exit(1);
  }
  return "comptables";
}

// ── Optimisation des images (1,5 Mo → quelques Ko) ──
async function buildImages() {
  const logo = await sharp(resolve(ROOT, "public/logo-footer.png"))
    .resize({ height: 120 }) // ratio préservé (~91px de large)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  const photo = await sharp(resolve(ROOT, "public/avatar.jpg"))
    .resize(160, 160, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return { logo, photo };
}

async function screenshot(html: string, audience: AudienceKey) {
  const { chromium } = await import("playwright");
  const previewHtmlPath = resolve(ROOT, `scripts/.partner-email-preview-${audience}.html`);
  const previewPngPath = resolve(ROOT, `scripts/.partner-email-preview-${audience}.png`);
  writeFileSync(previewHtmlPath, html, "utf8");

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 648, height: 1400 },
      deviceScaleFactor: 2,
    });
    await page.goto(pathToFileURL(previewHtmlPath).href, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => (document as Document).fonts.ready);
    await page.screenshot({ path: previewPngPath, fullPage: true });
    console.log(`✔  Aperçu image  → ${previewPngPath}`);
    console.log(`✔  Aperçu HTML   → ${previewHtmlPath}`);
  } finally {
    await browser.close();
  }
}

// ── Construction d'un message RFC822 complet (brouillon) ──
function encodeMimeWord(s: string): string {
  return `=?UTF-8?B?${Buffer.from(s, "utf8").toString("base64")}?=`;
}

function b64chunked(buf: Buffer): string {
  return (buf.toString("base64").match(/.{1,76}/g) ?? []).join("\r\n");
}

function buildEml(o: {
  fromName: string;
  fromEmail: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  plain: string;
  logo: Buffer;
  photo: Buffer;
  pdfs: { filename: string; content: Buffer }[];
}): string {
  const CRLF = "\r\n";
  const rnd = () => Math.random().toString(36).slice(2);
  const MIX = `mix_${rnd()}`;
  const REL = `rel_${rnd()}`;
  const ALT = `alt_${rnd()}`;

  let m = "";
  m += `From: ${encodeMimeWord(o.fromName)} <${o.fromEmail}>${CRLF}`;
  m += `To: ${o.to}${CRLF}`;
  m += `Reply-To: ${o.replyTo}${CRLF}`;
  m += `Subject: ${encodeMimeWord(o.subject)}${CRLF}`;
  m += `Date: ${new Date().toUTCString()}${CRLF}`;
  m += `MIME-Version: 1.0${CRLF}`;
  m += `Content-Type: multipart/mixed; boundary="${MIX}"${CRLF}${CRLF}`;

  m += `--${MIX}${CRLF}`;
  m += `Content-Type: multipart/related; boundary="${REL}"${CRLF}${CRLF}`;

  m += `--${REL}${CRLF}`;
  m += `Content-Type: multipart/alternative; boundary="${ALT}"${CRLF}${CRLF}`;
  m += `--${ALT}${CRLF}`;
  m += `Content-Type: text/plain; charset=UTF-8${CRLF}`;
  m += `Content-Transfer-Encoding: base64${CRLF}${CRLF}`;
  m += `${b64chunked(Buffer.from(o.plain, "utf8"))}${CRLF}`;
  m += `--${ALT}${CRLF}`;
  m += `Content-Type: text/html; charset=UTF-8${CRLF}`;
  m += `Content-Transfer-Encoding: base64${CRLF}${CRLF}`;
  m += `${b64chunked(Buffer.from(o.html, "utf8"))}${CRLF}`;
  m += `--${ALT}--${CRLF}`;

  m += `--${REL}${CRLF}`;
  m += `Content-Type: image/png${CRLF}`;
  m += `Content-Transfer-Encoding: base64${CRLF}`;
  m += `Content-ID: <sw-logo>${CRLF}`;
  m += `Content-Disposition: inline; filename="stellarwave-logo.png"${CRLF}${CRLF}`;
  m += `${b64chunked(o.logo)}${CRLF}`;
  m += `--${REL}${CRLF}`;
  m += `Content-Type: image/jpeg${CRLF}`;
  m += `Content-Transfer-Encoding: base64${CRLF}`;
  m += `Content-ID: <amar-photo>${CRLF}`;
  m += `Content-Disposition: inline; filename="amar-mehdaoui.jpg"${CRLF}${CRLF}`;
  m += `${b64chunked(o.photo)}${CRLF}`;
  m += `--${REL}--${CRLF}`;

  for (const pdf of o.pdfs) {
    m += `--${MIX}${CRLF}`;
    m += `Content-Type: application/pdf; name="${pdf.filename}"${CRLF}`;
    m += `Content-Transfer-Encoding: base64${CRLF}`;
    m += `Content-Disposition: attachment; filename="${pdf.filename}"${CRLF}${CRLF}`;
    m += `${b64chunked(pdf.content)}${CRLF}`;
  }
  m += `--${MIX}--${CRLF}`;
  return m;
}

async function main() {
  loadEnvLocal();
  const shouldSend = process.argv.includes("--send");
  const isDraft = process.argv.includes("--draft");
  const warm = process.argv.includes("--warm");
  const tu = process.argv.includes("--tu");
  const audience = resolveAudience();
  const cfg = AUDIENCES[audience];
  const Email = cfg.Email;

  // En test on ajoute un horodatage pour forcer un NOUVEAU fil Gmail (sinon
  // Gmail regroupe les tests au même objet et masque le contenu dupliqué → « ••• »).
  const testStamp = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const subject = warm
    ? cfg.subjectWarm
    : `${cfg.subjectBase} — test ${testStamp}`;

  console.log(`→ Audience : ${audience}`);
  console.log("→ Optimisation des images (logo + photo)...");
  const { logo, photo } = await buildImages();
  console.log(
    `   logo  : ${(logo.length / 1024).toFixed(1)} KB · photo : ${(photo.length / 1024).toFixed(1)} KB`,
  );

  if (!shouldSend && !isDraft) {
    // PREVIEW : images écrites en local, référencées en file:// pour le screenshot
    const logoPath = resolve(ROOT, "scripts/.email-logo.png");
    const photoPath = resolve(ROOT, "scripts/.email-photo.jpg");
    writeFileSync(logoPath, logo);
    writeFileSync(photoPath, photo);

    console.log("→ Rendu du template (preview)...");
    const html = await render(
      <Email
        logoSrc={pathToFileURL(logoPath).href}
        photoSrc={pathToFileURL(photoPath).href}
        warm={warm}
        tu={tu}
      />,
    );
    await screenshot(html, audience);
    console.log(
      "\nℹ️  Mode PREVIEW (pas d'envoi). Relancer avec --send pour envoyer le test.",
    );
    return;
  }

  // Rendu commun (envoi + brouillon) : images inline cid: + PDF en pièces jointes
  console.log("→ Rendu du template (images inline cid:)...");
  const html = await render(
    <Email logoSrc="cid:sw-logo" photoSrc="cid:amar-photo" warm={warm} tu={tu} />,
  );
  const plainText = warm ? cfg.plainTextWarm : cfg.plainText;

  const pdfAttachments = [PITCH_ATTACHMENT, cfg.deck, cfg.guide].map((a) => ({
    filename: a.filename,
    content: readFileSync(resolve(ROOT, a.path)),
  }));

  // Mode --draft : écrit un .eml RFC822 complet (HTML + images inline + PJ),
  // à sauvegarder ensuite dans les Brouillons via `himalaya message save`.
  if (isDraft) {
    const eml = buildEml({
      fromName: "Amar · StellarWave",
      fromEmail: "amar.mehdaoui@stellarwave.fr",
      to: TO,
      replyTo: REPLY_TO,
      subject,
      html,
      plain: plainText,
      logo,
      photo,
      pdfs: pdfAttachments,
    });
    const out = resolve(ROOT, "scripts/.draft.eml");
    writeFileSync(out, eml, "utf8");
    console.log(
      `✔  Brouillon .eml → ${out} | To: ${TO} | PJ: ${pdfAttachments
        .map((p) => p.filename)
        .join(", ")}`,
    );
    return;
  }

  // SEND via Resend
  if (!process.env.RESEND_API_KEY) {
    console.error("✖ RESEND_API_KEY manquante — envoi impossible.");
    process.exit(1);
  }

  const attachments = [
    ...pdfAttachments,
    { filename: "stellarwave-logo.png", content: logo, contentId: "sw-logo" },
    { filename: "amar-mehdaoui.jpg", content: photo, contentId: "amar-photo" },
  ];

  console.log(`→ Envoi via Resend : ${FROM} → ${TO}`);
  console.log(
    `→ Pièces jointes PDF : ${pdfAttachments
      .map((a) => `${a.filename} (${(a.content.length / 1024).toFixed(0)} KB)`)
      .join(", ")}`,
  );
  console.log("→ Images inline : logo + photo (cid:)");

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: REPLY_TO,
    subject,
    html,
    text: plainText,
    attachments,
  });

  if (error) {
    console.error("✖ Erreur Resend :", error);
    process.exit(1);
  }
  console.log(`✔  Email envoyé. id = ${data?.id}`);
}

main().catch((err) => {
  console.error("✖ Erreur :", err);
  process.exit(1);
});
