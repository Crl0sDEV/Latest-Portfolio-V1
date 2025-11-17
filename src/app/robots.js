export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: "https://carlos-miguel-sandrino-portfolio.vercel.app/sitemap.xml",
    };
  }
  