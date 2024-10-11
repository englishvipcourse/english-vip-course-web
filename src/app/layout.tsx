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
