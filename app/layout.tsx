import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { asset, profile } from "@/lib/data";

/* Display face for headlines — high-contrast transitional serif. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

/* Captions, dates, spec labels. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bernice511.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  keywords: [
    "Generative AI Engineer",
    "LLM",
    "RAG",
    "Agentic AI",
    "LangGraph",
    "Machine Learning",
    profile.name,
  ],
  icons: {
    icon: [
      { url: asset("/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-16.png"), sizes: "16x16", type: "image/png" },
      { url: asset("/icon.png"), sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: asset("/apple-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    url: basePath || "/",
    siteName: profile.name,
    images: [{ url: asset("/og-image.png"), width: 1200, height: 630, alt: profile.name }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    images: [asset("/og-image.png")],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Reveal() starts at opacity-0 and is un-hidden by IntersectionObserver.
            Without JS there is no observer, so force everything visible. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; }`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
