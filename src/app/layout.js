import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIWidget from "../components/AIWidget";
import { ThemeProvider } from "../components/ThemeProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Carlos Miguel Sandrino | Web Developer Portfolio",
  description:
    "Portfolio of Carlos Miguel Sandrino – a web developer specializing in Next.js, Tailwind CSS, React, and Supabase.",

  keywords: [
    "Carlos Miguel Sandrino",
    "Carlos Miguel I. Sandrino",
    "Web Developer Philippines",
    "Next.js Developer",
    "Full-stack Developer",
    "React Developer",
    "Portfolio",
  ],

  authors: [{ name: "Carlos Miguel Sandrino" }],

  metadataBase: new URL("https://carlos-miguel-sandrino-portfolio.vercel.app"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Carlos Miguel Sandrino | Web Developer Portfolio",
    description:
      "Explore projects and skills of Carlos Miguel Sandrino, a modern web developer building responsive and optimized web applications.",
    url: "https://carlos-miguel-sandrino-portfolio.vercel.app",
    siteName: "Carlos Miguel Sandrino Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Carlos Miguel Sandrino | Web Developer Portfolio",
    description:
      "Modern portfolio showcasing the projects and skills of Carlos Miguel Sandrino.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning >
      <head>
        <meta
          name="google-site-verification"
          content="XrhjcO-Xcvf0l4TVmWp7WdXGEOQ_Cs3v_BW7z3OYV6I"
        />
        <meta name="theme-color" content="#f4f5f7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#18191a" media="(prefers-color-scheme: dark)" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className={`${inter.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
          <AIWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
