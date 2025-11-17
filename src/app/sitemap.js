export default function sitemap() {
    return [
      {
        url: "https://carlos-miguel-sandrino-portfolio.vercel.app",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1.0,
      },
      {
        url: "https://carlos-miguel-sandrino-portfolio.vercel.app/about",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://carlos-miguel-sandrino-portfolio.vercel.app/projects",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: "https://carlos-miguel-sandrino-portfolio.vercel.app/contact",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ];
  }
  