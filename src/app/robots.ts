import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: [
      "https://rrfoodproducts.com/sitemap.xml",
      "https://tajachanachur.in/sitemap.xml",
      "https://tajachanachur.com/sitemap.xml",
    ],
  };
}
