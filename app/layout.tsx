import type { Metadata } from "next";
import "./globals.css";
import PresentationMode from "./components/PresentationMode";

export const metadata: Metadata = {
  title: "M2 Biostatistics",
  description: "Interactive M2 Biostatistics Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PresentationMode />
      </body>
    </html>
  );
}
