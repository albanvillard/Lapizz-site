import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Oro di Napoliii | Pizzeria Haute Couture",
  description: "Découvrez une expérience culinaire d'exception au cœur de Paris. Pizzas gastronomiques napolitaines façonnées avec art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f7] font-sans">
        {children}
      </body>
    </html>
  );
}
