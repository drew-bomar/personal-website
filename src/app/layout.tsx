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
        {/* Runs before first paint: a returning visitor must never see a frame
            of the entrance, and a first-time one must never see a frame of the
            settled scene before it starts. Flag is set immediately, so a reload
            part way through does not replay it. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=matchMedia('(prefers-reduced-motion: reduce)').matches;" +
              "if(m||localStorage.getItem('df-entered')==='1')" +
              "document.documentElement.classList.add('df-entered');" +
              "else localStorage.setItem('df-entered','1')}" +
              "catch(e){document.documentElement.classList.add('df-entered')}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
