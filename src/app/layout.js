import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    "Portfolio"
  ],
  authors: [{ name: "Carlos Miguel Sandrino" }],

  openGraph: {
    title: "Carlos Miguel Sandrino | Web Developer Portfolio",
    description:
      "Explore projects and skills of Carlos Miguel Sandrino, a modern web developer building responsive and optimized web applications.",
    url: "https://carlos-miguel-sandrino-portfolio.vercel.app",
    siteName: "Carlos Miguel Sandrino Portfolio",
    images: [
      {
        url: "/og-image.png", // optional — gumawa ka later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* GOOGLE SITE VERIFICATION */}
        <meta name="google-site-verification" content="XrhjcO-Xcvf0l4TVmWp7WdXGEOQ_Cs3v_BW7z3OYV6I" />
      </head>

      <body className="bg-black text-white font-montserrat">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
