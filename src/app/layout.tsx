import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XXXTENTACION — 1998–2018 | Homenagem",
  description:
    "Uma homenagem a Jahseh Dwayne Ricardo Onfroy (XXXTentacion): história, discografia e legado. Tributo de fã, sem fins comerciais.",
  openGraph: {
    title: "XXXTENTACION — 1998–2018",
    description:
      "História, discografia e legado de Jahseh Onfroy. Tributo de fã.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
