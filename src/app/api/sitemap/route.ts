import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.drivex.lk";

  // Manually add important static pages
  const staticPages = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/booking",
  ];

  // Fetch dynamic pages (e.g., blog posts, doctors, etc.)
  const dynamicPages = await fetchDynamicPages(); // Fetch from DB/API

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
        .map((page: string) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${page === "/" ? 1.0 : 0.7}</priority>
        </url>`)
      
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

// Example function to get dynamic routes (fetch from DB or API)
async function fetchDynamicPages() {
  const res = await fetch("https://www.drivex.lk/api/pages"); // Adjust your API
  const pages = await res.json();
  return pages.map((page: { slug: any; }) => `/page/${page.slug}`);
}
