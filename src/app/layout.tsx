import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const poppins = Poppins({
  subsets: ["latin"], // Ensure this is an array
  weight: ["100", "200", "300", "400", "500", "600", "700"], // You can specify weights here if needed
});

export const metadata: Metadata = {
  title: "Aulas de Inglês Online Personalizadas para Viagens e Trabalho | Escola de Inglês VIP",
  description:
    "Descubra como nossas aulas de inglês online personalizadas podem acelerar sua fluência para viagens internacionais e o mercado de trabalho. Resultados rápidos com professores ao vivo!",
  robots: {
    index: true, // Ensures the page is indexed
    follow: true, // Ensures links on the page are followed
  },
  openGraph: {
    title: "Aulas de Inglês Online Personalizadas para Viagens e Trabalho | Escola de Inglês VIP",
    description:
      "Descubra como nossas aulas de inglês online personalizadas podem acelerar sua fluência para viagens internacionais e o mercado de trabalho. Resultados rápidos com professores ao vivo!",
    url: "englishvipcourse.com", // Replace with your website URL
    siteName: "Escola de Inglês VIP",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Aulas de Inglês Online Personalizadas para Viagens e Trabalho | Escola de Inglês VIP</title>
        <meta name="description" content="Descubra como nossas aulas de inglês online personalizadas podem acelerar sua fluência para viagens internacionais e o mercado de trabalho. Resultados rápidos com professores ao vivo!" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Aulas de Inglês Online Personalizadas para Viagens e Trabalho | Escola de Inglês VIP" />
        <meta property="og:description" content="Descubra como nossas aulas de inglês online personalizadas podem acelerar sua fluência para viagens internacionais e o mercado de trabalho. Resultados rápidos com professores ao vivo!" />
        <meta property="og:url" content="https://englishvipcourse.com" />
        <meta property="og:site_name" content="Escola de Inglês VIP" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
      </head>

      <Analytics/>
      <SpeedInsights />
      <body
        className={poppins.className}
      >
        {children}
      </body>
    </html>
  );
}
