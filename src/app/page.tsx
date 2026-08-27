import React from "react";
import HomeClient from "@/components/home/HomeClient";
import { PRODUCTS_CATALOG } from "@/constants/bilingualCopy";

// Server Component: Renders full structured data schema and semantic markup into the initial SSR HTML
export default function HomePage() {
  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Taja Chanachur Full Product Line",
    description:
      "Handcrafted Bengali chanachur, roasted peanuts, and traditional tea-time snacks by R.R. Food Products in Raniganj, West Bengal since 2009. FSSAI Lic. No. 12821013000000.",
    numberOfItems: PRODUCTS_CATALOG.length,
    itemListElement: PRODUCTS_CATALOG.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `https://tajachanachur.com/#${product.id}`,
        name: `Taja Chanachur - ${product.title} (${product.flavor})`,
        description: product.description,
        image: `https://tajachanachur.com${product.image}`,
        category: "Snacks > Chanachur",
        brand: {
          "@type": "Brand",
          name: "Taja Chanachur",
        },
        manufacturer: {
          "@type": "Organization",
          name: "R.R. Food Products",
          url: "https://tajachanachur.com",
        },
        offers: {
          "@type": "Offer",
          price: product.price.replace("₹", "").split("/")[0].trim(),
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://tajachanachur.com/#shelf",
        },
      },
    })),
  };

  return (
    <>
      {/* 100% Crawlable Server-Rendered JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      {/* Semantic crawlable H1 & H2 tags in SSR HTML */}
      <div className="sr-only" aria-hidden="true">
        <h1>Taja Chanachur — Authentic Bengali Tea-Time Snacks Since 2009</h1>
        <h2>Hand-blended in small brass kadai batches in Raniganj by R.R. Food Products</h2>
      </div>
      <HomeClient />
    </>
  );
}
