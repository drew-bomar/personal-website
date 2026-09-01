import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Editorial display face for the hero name.
const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
});

// Clean sans for hero body copy.
const inter = Inter({
  variable: "--font-sans-ui",
  subsets: ["latin"],
});

const siteUrl = "https://drewbomar.com";
const description =
  "CS student at WashU working on backend systems, data pipelines, and ML. Previously SoFi and Home Depot.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s · ${profile.name}`,
  },
  description,
  openGraph: {
    title: `${profile.name} — Software Engineer`,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — Software Engineer`,
    description,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${instrumentSerif.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
