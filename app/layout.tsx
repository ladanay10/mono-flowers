import type { Metadata } from "next";
import { Cormorant_Infant, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Infant({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  variable: "--cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MONO flowers | Квітковий декор подій",
  description:
    "Квіткова студія MONO flowers: весілля, дні народження, фотозони, оформлення столів та декор подій під ключ. Самбір, Україна.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
