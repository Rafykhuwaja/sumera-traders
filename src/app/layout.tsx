import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sumera Traders - Premium Crystals & Artisanal Salts",
  description: "Discover the finest collection of premium crystals and artisanal salts. Experience natural beauty and wellness with our curated products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
      <div className="min-h-screen bg-gradient-to-br from-[#e87b51]/20 via-black to-[#a7d8de]/45 text-white">

        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      </body>
    </html>
  );
}