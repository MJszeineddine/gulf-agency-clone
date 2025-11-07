import { getAllServices } from "@/lib/services";
import { countries } from "@/i18n/routing";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  alternates?: {
    hreflang: string;
    href: string;
  }[];
}

const lastmod = new Date().toISOString().split("T")[0];

export function generateSitemap(baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"): string {
  const urls: SitemapUrl[] = [];

  // Homepage for each country/locale
  countries.forEach((country) => {
    ["ar", "en"].forEach((locale) => {
      urls.push({
        loc: `${baseUrl}/${country.code}/${locale}`,
        lastmod,
        changefreq: "weekly",
        priority: 1.0,
      });
    });
  });

  // Service pages
  const locales = ["ar", "en"] as const;
  locales.forEach((locale) => {
    const services = getAllServices(locale);
    
    services.forEach((service) => {
      countries.forEach((country) => {
        urls.push({
          loc: `${baseUrl}/${country.code}/${locale}/services/${service.slug}`,
          lastmod,
          changefreq: "monthly",
          priority: 0.8,
        });
      });
    });
  });

  // Contact pages
  countries.forEach((country) => {
    ["ar", "en"].forEach((locale) => {
      urls.push({
        loc: `${baseUrl}/${country.code}/${locale}/contact`,
        lastmod,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  return generateSitemapXML(urls);
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const urlElements = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}
