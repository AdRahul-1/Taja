import type { MetadataRoute } from "next";

const BASE_URL = "https://rrfoodproducts.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about-us", "/contact-us"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
