import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sneh Italiya — 3D Portfolio",
  description: "Full‑stack developer crafting delightful, performant experiences with React, Next.js, and 3D web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}> 
        {/* Global background layers */}
        <div className="fixed inset-0 -z-50">
          {/* Soft radial color wash */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.20),transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(236,72,153,0.16),transparent_60%)]" />
          {/* Subtle grid masked to center */}
          <div className="absolute inset-0 pointer-events-none bg-grid [mask-image:radial-gradient(ellipse_at_center,_black,_transparent_75%)] opacity-40" />
          {/* Vignette for edge contrast */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.6))]" />
        </div>

        {children}
      </body>
    </html>
  );
}
