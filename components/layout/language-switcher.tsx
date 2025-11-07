"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface LanguageSwitcherProps {
  country: string;
  locale: string;
  className?: string;
}

export function LanguageSwitcher({ country, locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const otherLocale = locale === "ar" ? "en" : "ar";

  // Attempt to swap locale segment while preserving rest of path
  let target = `/${country}/${otherLocale}`;
  if (pathname) {
    const parts = pathname.split("/").filter(Boolean);
    // Expected pattern: country/locale/...
    if (parts.length >= 2) {
      parts[1] = otherLocale; // replace locale segment
      target = "/" + parts.join("/");
    }
  }

  return (
    <div className={className}>
      <Link
        href={target}
        prefetch
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-effect text-sm font-semibold hover:scale-[1.03] transition"
        aria-label={locale === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
      >
        <span className="text-accent-gold font-bold">{otherLocale.toUpperCase()}</span>
      </Link>
    </div>
  );
}
