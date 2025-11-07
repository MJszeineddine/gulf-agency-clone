"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  className?: string;
  locale: string;
  country: string;
  overrides?: { label: string; href: string }[]; // manual injection if needed
}

export function Breadcrumbs({ className, locale, country, overrides }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];

  // Expected: [country, locale, ...rest]
  const crumbs: { label: string; href: string }[] = [];
  crumbs.push({ label: locale === "ar" ? "الرئيسية" : "Home", href: `/${country}/${locale}` });

  if (segments.length > 2) {
    // Build progressively
    let acc = `/${country}/${locale}`;
    for (let i = 2; i < segments.length; i++) {
      acc += `/${segments[i]}`;
      const raw = segments[i];
      const map: Record<string, { ar: string; en: string }> = {
        services: { ar: "الخدمات", en: "Services" },
        work: { ar: "أعمالنا", en: "Work" },
        contact: { ar: "اتصل بنا", en: "Contact" },
        pricing: { ar: "الأسعار", en: "Pricing" },
        blog: { ar: "مدونة", en: "Blog" },
      };
      const label = map[raw]?.[locale as "ar" | "en"] || raw.replace(/[-]/g, " ");
      crumbs.push({ label, href: acc });
    }
  }

  if (overrides && overrides.length > 0) {
    // Append or replace last crumb label
    overrides.forEach((o) => crumbs.push(o));
  }

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 && <span className="opacity-40">/</span>}
            <Link
              href={c.href}
              className={`hover:text-accent-gold transition ${i === crumbs.length - 1 ? "font-semibold" : ""}`}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
