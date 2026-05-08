import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONO_flowers | Квітковий декор подій",
  description:
    "Квіткова студія MONO_flowers: весілля, дні народження, фотозони, оформлення столів та декор подій під ключ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
