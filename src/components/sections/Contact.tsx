"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { brand } from "@/config/brand";
import { validateAntiSpam } from "@/lib/validators";
import "./Contact.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const useIso =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ProjectTypeKey = "site" | "ecom" | "app" | "brand" | "autre";
type BudgetKey = "<5k" | "5-15k" | "15-50k" | ">50k";

const projectTypes: { value: ProjectTypeKey; label: string }[] = [
  { value: "site", label: "Site vitrine" },
  { value: "ecom", label: "E-commerce" },
  { value: "app", label: "Application web / mobile" },
  { value: "brand", label: "Identité de marque" },
  { value: "autre", label: "Autre" },
];

const budgets: { value: BudgetKey; label: string }[] = [
  { value: "<5k", label: "< 5 000 €" },
  { value: "5-15k", label: "5 000 € – 15 000 €" },
  { value: "15-50k", label: "15 000 € – 50 000 €" },
  { value: ">50k", label: "> 50 000 €" },
];

// Map UI values → server schema enums
const projectTypeToServer: Record<
  ProjectTypeKey,
  "landing-page" | "website" | "web-app" | "mobile-app" | "cloud" | "other"
> = {
  site: "website",
  ecom: "website",
  app: "web-app",
  brand: "other",
  autre: "other",
};

const budgetToServer: Record<
  BudgetKey,
  "5k-10k" | "10k-25k" | "25k-50k" | "50k-100k" | "100k+" | "unknown"
> = {
  "<5k": "5k-10k",
  "5-15k": "10k-25k",
  "15-50k": "25k-50k",
  ">50k": "50k-100k",
};

type DropdownProps<T extends string> = {
  label: string;
  optional?: boolean;
  placeholder: string;
  value: T | "";
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  required?: boolean;
};

function Dropdown<T extends string>({
  label,
  optional,
  placeholder,
  value,
  options,
  onChange,
  required,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="sw-field">
      <label className="sw-label">
        {label}
        {optional && <span className="sw-opt"> (optionnel)</span>}
      </label>
      <div className={`sw-dropdown${open ? " is-open" : ""}`} ref={ref}>
        <button
          type="button"
          className={`sw-dropdown-trigger${selected ? " has-value" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          data-required={required ? "true" : undefined}
        >
          <span>{selected ? selected.label : placeholder}</span>
          <svg
            className="sw-dropdown-chevron"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="sw-dropdown-menu" role="listbox" aria-label={label}>
          {options.map((opt, idx) => {
            const isSel = opt.value === value;
            return (
              <button
                type="button"
                key={opt.value}
                role="option"
                aria-selected={isSel}
                className={`sw-dropdown-option${isSel ? " is-selected" : ""}`}
                style={{ ["--i" as string]: idx }}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                <svg
                  className="sw-check"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* RollingText — effet hover Lando sur tiktok/instagram, version state
   of the art via GSAP SplitText (officiel, gratuit depuis avril 2025).
   - mask: "chars"  → wrappers overflow:clip auto par char
   - autoSplit      → re-split au chargement des fonts + au resize (no jitter)
   - smartWrap      → mots non cassés sur 2 lignes
   - aria-label parent + aria-hidden chars → accessibilité native */
function RollingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const origRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);

  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const orig = origRef.current;
    const copy = copyRef.current;
    if (!wrap || !orig || !copy || reduce) return;

    let splitOrig: SplitText | null = null;
    let splitCopy: SplitText | null = null;
    let cleanup: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // Deux SplitText synchronisés : orig (visible au repos) + copy
      // (positionnée en bas via top:100%, visible au hover quand
      // toute la composition glisse vers le haut de -100%).
      // aria: false → SplitText ne pose PAS d'aria-label sur le wrapper
      // (axe-core flag les "prohibited ARIA on span"). On gère
      // l'accessibilité via un <span class="sr-only"> dans le JSX.
      splitOrig = SplitText.create(orig, {
        type: "chars,words",
        smartWrap: true,
        autoSplit: true,
        charsClass: "rt-char",
        aria: "none",
      });
      splitCopy = SplitText.create(copy, {
        type: "chars,words",
        smartWrap: true,
        autoSplit: true,
        charsClass: "rt-char",
        aria: "none",
      });

      const trigger = wrap.closest<HTMLElement>(".sw-h1") ?? wrap;

      const onEnter = () => {
        if (!splitOrig?.chars || !splitCopy?.chars) return;
        const opts = {
          yPercent: -100,
          duration: 0.6,
          ease: "expo.out" as const,
          stagger: { each: 0.025, from: "start" as const },
          overwrite: "auto" as const,
        };
        gsap.to(splitOrig.chars, opts);
        gsap.to(splitCopy.chars, opts);
      };

      const onLeave = () => {
        if (!splitOrig?.chars || !splitCopy?.chars) return;
        const opts = {
          yPercent: 0,
          duration: 0.7,
          ease: "expo.out" as const,
          stagger: { each: 0.022, from: "start" as const },
          overwrite: "auto" as const,
        };
        gsap.to(splitOrig.chars, opts);
        gsap.to(splitCopy.chars, opts);
      };

      trigger.addEventListener("mouseenter", onEnter);
      trigger.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        trigger.removeEventListener("mouseenter", onEnter);
        trigger.removeEventListener("mouseleave", onLeave);
      };
    }, wrapRef);

    return () => {
      cleanup?.();
      splitOrig?.revert();
      splitCopy?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <span ref={wrapRef} className={`rt ${className ?? ""}`}>
      {/* Texte lisible par les screen readers (string complète, pas char
          par char). Les spans split par GSAP sont aria-hidden. */}
      <span className="sr-only">{text}</span>
      <span ref={origRef} className="rt-orig" aria-hidden="true">
        {text}
      </span>
      <span ref={copyRef} className="rt-copy" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

// Limites pièce jointe — alignées avec l'UI ("PDF, doc, images... 10 Mo max")
const MAX_FILE_BYTES = 10 * 1024 * 1024;

export function Contact() {
  const [formTimestamp] = useState(() => Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [type, setType] = useState<ProjectTypeKey | "">("");
  const [budget, setBudget] = useState<BudgetKey | "">("");
  const [msg, setMsg] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formCardRef = useRef<HTMLDivElement>(null);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        file: "Pièce jointe trop volumineuse (10 Mo max).",
      }));
      setFile(null);
      e.target.value = "";
      return;
    }
    setErrors((prev) => {
      const { file: _omit, ...rest } = prev;
      void _omit;
      return rest;
    });
    setFile(f);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 3) next.name = "Nom requis";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Email invalide";
    if (!type) next.type = "Sélectionnez un type de projet";
    if (!msg.trim() || msg.trim().length < 20)
      next.msg = "Décrivez votre projet (20 caractères min.)";
    if (!consent)
      next.consent =
        "Vous devez accepter notre politique de confidentialité.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    if (!validate()) return;

    const { isBot } = validateAntiSpam({
      website,
      _timestamp: formTimestamp,
    });
    if (isBot) {
      setDone(true);
      return;
    }

    setSubmitting(true);

    // Map "Nom complet" → firstName / lastName for the existing API
    const trimmed = name.trim().replace(/\s+/g, " ");
    const parts = trimmed.split(" ");
    const firstName = parts[0] || trimmed;
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "—";

    // FormData (multipart) — permet d'envoyer le fichier en attachment.
    // Côté API, route.ts détecte le content-type et parse FormData.
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email.trim());
    if (tel.trim()) formData.append("phone", tel.trim());
    formData.append("projectType", projectTypeToServer[type as ProjectTypeKey]);
    formData.append(
      "budget",
      budget ? budgetToServer[budget as BudgetKey] : "unknown",
    );
    formData.append("timeline", "flexible");
    formData.append("description", msg.trim());
    formData.append("consent", "true"); // déjà validé côté client
    formData.append("website", website);
    formData.append("_timestamp", String(formTimestamp));
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        // Tenter de récupérer le message d'erreur côté API.
        let serverMessage: string | null = null;
        try {
          const json = (await res.json()) as { error?: string };
          serverMessage = json.error ?? null;
        } catch {
          // Réponse non-JSON → message générique.
        }
        setSubmitError(
          serverMessage ??
            "Une erreur est survenue. Réessayez ou écrivez-nous directement à contact@stellarwave.fr.",
        );
        setSubmitting(false);
        return;
      }
    } catch (err) {
      console.error("[Contact] submit error", err);
      setSubmitError(
        "Connexion impossible. Vérifiez votre réseau ou écrivez-nous directement à contact@stellarwave.fr.",
      );
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setDone(true);
  };

  return (
    <section
      id="contact"
      className="sw-contact"
      data-screen-label="Contact"
    >
      {/* Hero */}
      <div className="sw-hero">
        <h1 className="sw-h1">
          <RollingText text="Parlons de" className="sw-h1-thin" />
          <RollingText text="votre projet" className="sw-h1-serif" />
        </h1>
      </div>

      {/* Form wrap with floating devices */}
      <div className="sw-form-wrap">
        {/* Devices flanking the form */}
        <div className="sw-device sw-device-mac" aria-hidden>
          <Image
            src="/contact/macbook.webp"
            alt=""
            width={1760}
            height={1100}
            sizes="(max-width: 1200px) 520px, (max-width: 1400px) 680px, 880px"
            priority={false}
          />
        </div>
        <div className="sw-device sw-device-iphone" aria-hidden>
          <Image
            src="/contact/iphone.webp"
            alt=""
            width={1020}
            height={2200}
            sizes="(max-width: 1200px) 580px, (max-width: 1400px) 720px, 900px"
            priority={false}
          />
        </div>

        <motion.div
          ref={formCardRef}
          className="sw-form-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <aside className="sw-aside">
            <div className="sw-aside-title">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Dites-nous tout
            </div>
            <p className="sw-aside-desc">
              Décrivez votre projet en quelques mots et nous vous recontacterons
              rapidement.
            </p>
            <div className="sw-aside-list">
              <div className="sw-aside-item">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Réponse sous 24h
              </div>
              <div className="sw-aside-item">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Premier appel gratuit
              </div>
              <div className="sw-aside-item">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
                Sans engagement
              </div>
            </div>
          </aside>

          {done ? (
            <div className="sw-form sw-success">
              <div className="sw-success-badge">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="sw-success-title">Demande envoyée !</h3>
              <p className="sw-success-text">
                Merci, nous revenons vers vous sous 24h à l&apos;adresse{" "}
                <strong>{email}</strong>.
              </p>
              <a
                className="sw-success-cta"
                href={brand.calendlyUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Réserver un appel maintenant
                <svg viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ) : (
            <form className="sw-form" onSubmit={handleSubmit} noValidate>
              <div className="sw-row sw-row-3">
                <div className="sw-field">
                  <label className="sw-label" htmlFor="sw-name">
                    Nom complet
                  </label>
                  <input
                    id="sw-name"
                    className={`sw-input${errors.name ? " has-error" : ""}`}
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                  {errors.name && <span className="sw-error">{errors.name}</span>}
                </div>
                <div className="sw-field">
                  <label className="sw-label" htmlFor="sw-email">
                    Email professionnel
                  </label>
                  <input
                    id="sw-email"
                    className={`sw-input${errors.email ? " has-error" : ""}`}
                    type="email"
                    placeholder="vous@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  {errors.email && <span className="sw-error">{errors.email}</span>}
                </div>
                <div className="sw-field">
                  <label className="sw-label" htmlFor="sw-tel">
                    Téléphone <span className="sw-opt">(optionnel)</span>
                  </label>
                  <input
                    id="sw-tel"
                    className="sw-input"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="sw-row sw-row-2">
                <Dropdown
                  label="Type de projet"
                  required
                  placeholder="Sélectionnez le type de projet"
                  value={type}
                  options={projectTypes}
                  onChange={(v) => setType(v)}
                />
                <Dropdown
                  label="Budget estimatif"
                  optional
                  placeholder="Sélectionnez une fourchette"
                  value={budget}
                  options={budgets}
                  onChange={(v) => setBudget(v)}
                />
              </div>
              {errors.type && (
                <span className="sw-error sw-error-row">{errors.type}</span>
              )}

              <div className="sw-field">
                <label className="sw-label" htmlFor="sw-msg">
                  Parlez-nous de votre projet
                </label>
                <textarea
                  id="sw-msg"
                  className={`sw-textarea${errors.msg ? " has-error" : ""}`}
                  placeholder="Décrivez vos objectifs, vos idées, vos contraintes..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                />
                {errors.msg && <span className="sw-error">{errors.msg}</span>}
              </div>

              <div className="sw-footer-row">
                <label className="sw-file-drop" htmlFor="sw-file">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sw-file-text">
                    <span className="sw-file-title">
                      {file ? (
                        file.name
                      ) : (
                        <>
                          Ajouter un fichier{" "}
                          <span className="sw-opt">(optionnel)</span>
                        </>
                      )}
                    </span>
                    <span className="sw-file-sub">
                      {file
                        ? `${(file.size / 1024 / 1024).toFixed(2)} Mo`
                        : "PDF, doc, images... 10 Mo max"}
                    </span>
                  </span>
                </label>
                <input
                  id="sw-file"
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={onFile}
                  style={{ display: "none" }}
                />

                <button
                  className="sw-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Envoi..." : "Envoyer ma demande"}
                  {!submitting && (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.file && (
                <span className="sw-error sw-error-row">{errors.file}</span>
              )}

              {/* Consent RGPD — opt-in explicite obligatoire */}
              <label
                className={`sw-consent${errors.consent ? " has-error" : ""}`}
                htmlFor="sw-consent"
              >
                <input
                  id="sw-consent"
                  type="checkbox"
                  className="sw-consent-checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (e.target.checked && errors.consent) {
                      setErrors((prev) => {
                        const { consent: _omit, ...rest } = prev;
                        void _omit;
                        return rest;
                      });
                    }
                  }}
                  required
                />
                <span className="sw-consent-text">
                  J&rsquo;accepte que mes données soient utilisées pour
                  recontacter mon projet, conformément à la{" "}
                  <a
                    href="/politique-de-confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {errors.consent && (
                <span className="sw-error">{errors.consent}</span>
              )}

              {/* Banner d'erreur — affiché si l'API renvoie une erreur */}
              {submitError && (
                <div className="sw-submit-error" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}

              {/* Honeypot */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="sw-honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
