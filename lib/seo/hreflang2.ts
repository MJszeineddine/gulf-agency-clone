import { countries } from "@/i18n/routing";

type Locale = "ar" | "en";

export type HreflangTag = { hreflang: string; href: string };

// Unified hreflang tag generator (service slug or pathname)
export function generateHreflangTags(
  slugOrPathname?: string,
  baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
): HreflangTag[] {
  const locales: Locale[] = ["ar", "en"];
  const suffix = slugOrPathname
    ? slugOrPathname.startsWith("/")
      ? slugOrPathname
      : `/services/${slugOrPathname}`
    : "";

  return countries.flatMap((c) =>
    locales.map((loc) => ({
      hreflang: `${loc}-${c.code.toUpperCase()}`,
      href: `${baseUrl}/${c.code}/${loc}${suffix}`,
    }))
  );
}

// Build canonical + alternates for Next.js Metadata API
export function getHreflangMetadata(params: {
  country: string;
  locale: Locale;
  pathname?: string;
  baseUrl?: string;
}) {
  const {
    country,
    locale,
    pathname = "",
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  } = params;
  const locales: Locale[] = ["ar", "en"];

  const languages: Record<string, string> = {};
  countries.forEach((c) => {
    locales.forEach((loc) => {
      const langKey = `${loc}-${c.code.toUpperCase()}`;
      const url = `${baseUrl}/${c.code}/${loc}${pathname}`;
      languages[langKey] = url;
    });
  });

  return {
    canonical: `${baseUrl}/${country}/${locale}${pathname}`,
    alternates: {
      languages,
      xDefault: `${baseUrl}/ae/ar${pathname}`,
    },
  } as const;
}
