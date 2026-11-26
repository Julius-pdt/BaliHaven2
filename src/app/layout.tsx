import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BALI HAVEN - Luxury Villa Booking | Private Paradise in Bali",
  description:
    "Experience unforgettable stays in handpicked luxury villas across the Island of Gods. Book your private paradise in Ubud, Canggu, Seminyak, Uluwatu, Nusa Dua, and Sanur.",
  keywords: [
    "Bali villas",
    "luxury villa booking",
    "Bali Haven",
    "private pool villa",
    "Ubud villa",
    "Canggu villa",
    "Seminyak villa",
    "Uluwatu villa",
    "luxury travel Bali",
  ],
  authors: [{ name: "Bali Haven" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "BALI HAVEN - Luxury Villa Booking",
    description:
      "Discover your private paradise in Bali. Handpicked luxury villas with private pools, tropical gardens, and stunning views.",
    siteName: "Bali Haven",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster richColors position="top-right" />
      </body>
    </html>
  );
}
