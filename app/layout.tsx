import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "PRISMA Broadcast & Media",
  description: "Where sports, technology and media connect.",
  openGraph: {
    title: "PRISMA Broadcast & Media",
    description: "Where sports, technology and media connect.",
    images: [
      { url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "PRISMA Broadcast & Media" }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISMA Broadcast & Media",
    description: "Where sports, technology and media connect.",
    images: ["/images/og-cover.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
