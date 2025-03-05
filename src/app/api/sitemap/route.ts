import { SitemapStream, streamToPromise } from "sitemap";
import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = new SitemapStream({ hostname: "https://www.drivex.lk" });

  // Add static pages
  const staticPages = ["/", "/about", "/services", "/contact", "/profile", "/booking"];
  staticPages.forEach((page) => sitemap.write({ url: page, changefreq: "daily", priority: 0.8 }));

  // Add dynamic pages (Example: Fetch from DB)
  // const services = await fetch("https://api.example.com/services").then(res => res.json());
  // services.forEach((service) => sitemap.write({ url: `/services/${service.slug}`, changefreq: "weekly", priority: 0.7 }));

  sitemap.end();
  const xml = await streamToPromise(sitemap);
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
