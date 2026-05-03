"use client";

import dynamic from "next/dynamic";

// Wrappers Client pour lazy-loader les sections below-the-fold avec
// ssr:false (interdit dans un Server Component depuis Next.js 16).
// Allège le bundle JS initial : Framer Motion / GSAP / SplitText ne
// sont chargés qu'après hydration de la page (post-LCP).

export const LazyHorizontalGallery = dynamic(
  () =>
    import("@/components/sections/HorizontalGallery").then(
      (m) => m.HorizontalGallery,
    ),
  { ssr: false },
);

export const LazyContact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { ssr: false },
);

export const LazyFooter = dynamic(
  () => import("@/components/layout/Footer").then((m) => m.Footer),
  { ssr: false },
);
