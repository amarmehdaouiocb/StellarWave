// Custom completely distinct configuration for v4 redesign
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-v4-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const geistMono = Geist_Mono({
  variable: "--font-v4-geist-mono",
  subsets: ["latin"],
});

export const playfair = Playfair_Display({
  variable: "--font-v4-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
});
