import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"], // Ensure this is an array
  weight: ["100", "200", "300", "400", "500", "600", "700"], // You can specify weights here if needed
});

export const metadata: Metadata = {
  title: "English Vip Course",
  description: "Seu novo jeito de aprender inglês!",
  robots: {
    index: true, // Ensures the page is indexed
    follow: true, // Ensures links on the page are followed
  },
  openGraph: {
    title: "English Vip Course",
    description: "Seu novo jeito de aprender inglês!",
    url: "https://www.englishcousevip.com", // Replace with your website URL
    siteName: "English Vip Course",
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
      <body
        className={poppins.className}
      >
        {children}
      </body>
    </html>
  );
}
