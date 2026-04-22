"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

/* ─────────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────────── */

const ArrowSvg = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

function CardIconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(180deg, rgba(90,130,255,0.18), rgba(50,80,200,0.08))",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(140,170,255,0.22)",
        color: "#9fbbff",
        boxShadow:
          "inset 0 0 12px rgba(80,120,255,0.15), 0 0 24px rgba(80,120,255,0.12)",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function CardArt({
  src,
  imgStyle,
  overlayStyle,
}: {
  src: string;
  imgStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ borderRadius: "inherit", zIndex: 0 }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={imgStyle}
      />
      <div
        className="absolute inset-0"
        style={
          overlayStyle ?? {
            background:
              "linear-gradient(90deg, rgba(6,10,24,0.88) 0%, rgba(6,10,24,0.55) 45%, rgba(6,10,24,0.15) 100%)",
          }
        }
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SPOTLIGHT CARD — mouse-tracking glow
───────────────────────────────────────────── */

function SpotlightCard({
  children,
  delay = 0,
  style,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--mx",
        ((e.clientX - r.left) / r.width) * 100 + "%"
      );
      el.style.setProperty(
        "--my",
        ((e.clientY - r.top) / r.height) * 100 + "%"
      );
    },
    []
  );

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={onPointerMove}
      className={`group/spot ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: easings.smooth }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 22,
        background:
          "linear-gradient(180deg, rgba(22,30,62,0.55) 0%, rgba(10,14,30,0.55) 100%)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(120,150,230,0.12)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
        ...style,
      }}
      whileHover={{
        y: -3,
        borderColor: "rgba(140,175,255,0.28)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 28px 80px -20px rgba(30,60,180,0.35)",
        transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
      }}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/spot:opacity-100"
        style={{
          borderRadius: "inherit",
          background:
            "radial-gradient(600px 300px at var(--mx, 30%) var(--my, 20%), rgba(90,130,255,0.10), transparent 60%)",
          transition: "opacity .4s ease",
          zIndex: 2,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STARFIELD — client-only (avoids hydration mismatch)
───────────────────────────────────────────── */

function Starfield() {
  const [stars, setStars] = useState<
    Array<{ x: number; y: number; s: number; d: number; del: number }>
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() < 0.25 ? 3 : Math.random() < 0.5 ? 2 : 1,
        d: +(Math.random() * 4 + 2).toFixed(1),
        del: +(Math.random() * 4).toFixed(1),
      }))
    );
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.s,
            height: star.s,
            borderRadius: "50%",
            background: "#9fb3ff",
            opacity: 0.5,
            boxShadow: "0 0 6px rgba(160,190,255,0.8)",
            animationName: "svc-twinkle",
            animationDuration: `${star.d}s`,
            animationDelay: `${star.del}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOTTOM-ROW FEATURES
───────────────────────────────────────────── */

const FEATURES = [
  {
    title: "Qualité & Fiabilité",
    desc: "Des standards élevés à chaque étape",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Livraison rapide",
    desc: "Itérations courtes et efficaces",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
      >
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
      </svg>
    ),
  },
  {
    title: "Sécurité by design",
    desc: "Bonnes pratiques & conformité",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    title: "Scalabilité",
    desc: "Des solutions pensées pour grandir",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-6" />
        <path d="M15 8h4v4" />
      </svg>
    ),
  },
] as const;

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-x-hidden"
      style={{
        background: "#030610",
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      {/* CSS keyframes injected inline — scoped name avoids collision */}
      <style>{`
        @keyframes svc-twinkle { 0%,100%{opacity:.25} 50%{opacity:.85} }
      `}</style>

      {/* Starfield */}
      <Starfield />

      {/* Night-blue gradient — layered depth atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(ellipse 900px 600px at 88% 8%,  rgba(28,65,230,0.22)  0%, transparent 55%),
            radial-gradient(ellipse 650px 550px at 4%  92%, rgba(40,12,130,0.13)  0%, transparent 50%),
            radial-gradient(ellipse 580px 380px at 42% 58%, rgba(6,15,70,0.28)    0%, transparent 65%),
            radial-gradient(ellipse 160%  20%  at 50% -2%,  rgba(32,72,200,0.10)  0%, transparent 100%),
            linear-gradient(168deg, #020610 0%, #04091c 28%, #030818 55%, #020510 78%, #010307 100%)
          `,
        }}
      />

      {/* ── PAGE CONTENT ── */}
      <div
        className="relative max-w-[1180px] mx-auto px-5 md:px-10"
        style={{ zIndex: 1 }}
      >
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easings.dramatic }}
          style={{ marginBottom: 46 }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-10"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(59,107,255,0.06)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(59,107,255,0.15)",
              color: "rgba(143,179,255,0.85)",
            }}
          >
            Nos expertises
          </motion.span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 6.4vw, 92px)",
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              color: "#9fb3d0",
              maxWidth: 820,
            }}
          >
            Des solutions{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 500,
                background:
                  "linear-gradient(90deg, #6a9cff 0%, #a48bff 55%, #6a9cff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              sur&nbsp;mesure
            </span>
          </h2>

          {/* Accent rule */}
          <div
            style={{
              width: 74,
              height: 2,
              marginTop: 28,
              marginBottom: 22,
              background: "linear-gradient(90deg, #5b8cff, rgba(91,140,255,0))",
              borderRadius: 2,
            }}
          />

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "#a6b0cf",
              maxWidth: 520,
            }}
          >
            Du{" "}
            <strong style={{ color: "#e7ecff", fontWeight: 500 }}>
              prototype au déploiement
            </strong>
            , nous couvrons l&apos;intégralité du cycle produit pour créer des
            expériences fiables, performantes et évolutives.
          </p>
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-[22px]">

          {/* FEATURED CARD — Product Design & Dev */}
          <SpotlightCard delay={0}>
            {/* Product Design illustration */}
            <CardArt
              src="/services/product-design.png"
              imgStyle={{
                objectPosition: "52% center",
              }}
            />

            <div
              className="relative"
              style={{
                padding: "40px 44px",
                minHeight: 520,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
                zIndex: 3,
              }}
            >
              {/* Top icon */}
              <div className="flex justify-between items-start">
                <CardIconBadge>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 3c4 0 7 3 7 7-1.5 0-3 .5-4 1.5L9.5 19l-3-3 7.5-7.5C15 7.5 15.5 6 15.5 4.5 14.5 3.5 14 3 14 3z" />
                    <path d="M9.5 13.5 6 17l1 3 3-1 3.5-3.5" />
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r="1.2"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </CardIconBadge>
              </div>

              {/* Body */}
              <div
                className="mt-10 grid gap-[18px]"
                style={{ alignContent: "start", maxWidth: "62%" }}
              >
                <span
                  style={{
                    color: "#8fb3ff",
                    fontSize: 13,
                    letterSpacing: ".08em",
                    fontWeight: 500,
                    opacity: 0.85,
                  }}
                >
                  01
                </span>
                <h3
                  style={{
                    fontSize: 40,
                    lineHeight: 1.08,
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    color: "#f5f7ff",
                  }}
                >
                  Product Design
                  <br />
                  &amp; Dev
                </h3>
                <div
                  style={{
                    width: 56,
                    height: 1,
                    background: "rgba(140,170,255,0.25)",
                  }}
                />
                <p
                  style={{
                    fontSize: 15,
                    color: "#a6b0cf",
                    lineHeight: 1.6,
                    maxWidth: "40ch",
                  }}
                >
                  Landing pages premium, sites web, applications SaaS. Du
                  prototype Figma au déploiement production.
                </p>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="group/cta mt-[30px] inline-flex items-center gap-4"
                style={{ color: "#e7ecff", fontSize: 15, fontWeight: 500 }}
              >
                <div
                  className="group-hover/cta:translate-x-1 transition-transform duration-300 grid place-items-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 30%, #6d98ff, #2f59e6 70%)",
                    boxShadow:
                      "0 0 0 1px rgba(140,170,255,0.4), 0 10px 30px -6px rgba(60,100,230,0.6)",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </div>
                <span>Découvrir le service</span>
              </a>
            </div>
          </SpotlightCard>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-[22px]">
            {/* Apps & Mobile */}
            <SpotlightCard delay={0.15} style={{ flex: 1 }}>
              <CardArt
                src="/services/phone.png"
                overlayStyle={{
                  background:
                    "linear-gradient(90deg, rgba(6,10,24,0.95) 0%, rgba(6,10,24,0.75) 45%, rgba(6,10,24,0.15) 100%)",
                }}
              />
              <div
                className="relative grid gap-[10px]"
                style={{
                  padding: "28px 30px",
                  minHeight: 200,
                  alignContent: "start",
                  zIndex: 3,
                }}
              >
                <CardIconBadge>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3 3 8l9 5 9-5-9-5z" />
                    <path d="M3 13l9 5 9-5" />
                    <path d="M3 18l9 5 9-5" />
                  </svg>
                </CardIconBadge>
                <span
                  style={{
                    color: "#8fb3ff",
                    fontSize: 13,
                    letterSpacing: ".08em",
                    fontWeight: 500,
                    opacity: 0.85,
                    marginTop: 6,
                  }}
                >
                  02
                </span>
                <h3
                  style={{
                    fontSize: 24,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#f2f5ff",
                    fontWeight: 600,
                  }}
                >
                  Apps &amp; Mobile
                </h3>
                <p
                  style={{ fontSize: 14, color: "#a6b0cf", lineHeight: 1.6 }}
                >
                  Applications React Native et web apps temps réel,
                  architecturées pour la scalabilité.
                </p>
                <a
                  href="#contact"
                  className="w-fit inline-flex items-center gap-2 text-[#7aa3ff] hover:text-[#a7c2ff] transition-colors duration-200"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  Découvrir le service <ArrowSvg size={14} />
                </a>
              </div>
            </SpotlightCard>

            {/* Cloud & Infra */}
            <SpotlightCard delay={0.3} style={{ flex: 1 }}>
              <CardArt
                src="/services/cloud.png"
                imgStyle={{ objectPosition: "center center" }}
                overlayStyle={{
                  background:
                    "linear-gradient(90deg, rgba(6,10,24,0.95) 0%, rgba(6,10,24,0.75) 45%, rgba(6,10,24,0.15) 100%)",
                }}
              />
              <div
                className="relative grid gap-[10px]"
                style={{
                  padding: "28px 30px",
                  minHeight: 200,
                  alignContent: "start",
                  zIndex: 3,
                }}
              >
                <CardIconBadge>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6 10a4 4 0 0 0 1 8z" />
                  </svg>
                </CardIconBadge>
                <span
                  style={{
                    color: "#8fb3ff",
                    fontSize: 13,
                    letterSpacing: ".08em",
                    fontWeight: 500,
                    opacity: 0.85,
                    marginTop: 6,
                  }}
                >
                  03
                </span>
                <h3
                  style={{
                    fontSize: 24,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#f2f5ff",
                    fontWeight: 600,
                  }}
                >
                  Cloud &amp; Infra
                </h3>
                <p
                  style={{ fontSize: 14, color: "#a6b0cf", lineHeight: 1.6 }}
                >
                  Architecture serverless, FinOps, sécurité. AWS, GCP, Azure.
                </p>
                <a
                  href="#contact"
                  className="w-fit inline-flex items-center gap-2 text-[#7aa3ff] hover:text-[#a7c2ff] transition-colors duration-200"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  Découvrir le service <ArrowSvg size={14} />
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-6 mt-[38px] items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: easings.smooth }}
        >
          {FEATURES.map((feat, i) => (
            <div key={i} className="flex gap-[14px] items-start">
              <span
                style={{
                  width: 30,
                  height: 30,
                  flex: "0 0 30px",
                  marginTop: 2,
                  display: "grid",
                  placeItems: "center",
                  color: "#8aa8ff",
                }}
              >
                {feat.icon}
              </span>
              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#eef2ff",
                    marginBottom: 3,
                    letterSpacing: ".1px",
                  }}
                >
                  {feat.title}
                </strong>
                <span
                  style={{
                    display: "block",
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    color: "#6b7599",
                  }}
                >
                  {feat.desc}
                </span>
              </div>
            </div>
          ))}

          {/* CTA — full-width on mobile, auto on desktop */}
          <motion.a
            href="#contact"
            className="col-span-full lg:col-auto justify-self-start inline-flex items-center gap-[14px]"
            style={{
              padding: "18px 30px",
              borderRadius: 999,
              background: "linear-gradient(90deg, #3865ff 0%, #5b8cff 100%)",
              color: "#fff",
              fontSize: 14.5,
              fontWeight: 600,
              letterSpacing: ".1px",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(160,185,255,0.35)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.3), 0 12px 30px -8px rgba(60,100,230,0.55), 0 0 0 6px rgba(80,120,255,0.06)",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
            whileHover={{
              y: -1,
              filter: "brightness(1.05)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.3), 0 18px 40px -10px rgba(60,100,230,0.7), 0 0 0 6px rgba(80,120,255,0.10)",
              transition: { duration: 0.25 },
            }}
          >
            Lancer un projet
            <ArrowSvg />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
