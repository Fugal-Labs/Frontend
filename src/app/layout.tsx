import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fugal Labs - Dev-First Social Platform & Hackathons",
  description:
    "Join Fugal Labs, a dev-first social platform for college developers. Participate in high-impact hackathons, build amazing projects, and connect with a vibrant community of innovators.",
  keywords: [
    "hackathon",
    "developers",
    "college",
    "coding",
    "programming",
    "tech community",
    "Fugal Labs",
  ],
  authors: [{ name: "Fugal Labs" }],
  creator: "Fugal Labs",
  publisher: "Fugal Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fugallabs.com",
    siteName: "Fugal Labs",
    title: "Fugal Labs - Dev-First Social Platform & Hackathons",
    description:
      "Join Fugal Labs for high-impact hackathons and connect with college developers building the future.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fugal Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fugal Labs - Dev-First Social Platform & Hackathons",
    description:
      "Join Fugal Labs for high-impact hackathons and connect with college developers building the future.",
    images: ["/og-image.jpg"],
    creator: "@fugallabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
