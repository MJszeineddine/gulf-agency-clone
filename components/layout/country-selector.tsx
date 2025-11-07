"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { countries } from "@/i18n/routing";
import { useState } from "react";

interface CountrySelectorProps {
  country: string;
  locale: string;
  className?: string;
}

export function CountrySelector({ country, locale, className }: CountrySelectorProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function buildTarget(newCountry: string) {
    if (!pathname) return `/${newCountry}/${locale}`;
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 1) {
      parts[0] = newCountry; // replace country
      // Ensure locale stays intact
      if (parts.length < 2) parts.push(locale);
    }
    return "/" + parts.join("/");
  }

  return (
    <div className={className + " relative"}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-effect text-sm font-semibold hover:scale-[1.03] transition"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{countries.find((c) => c.code === country)?.flag}</span>
        <span className="font-bold">{countries.find((c) => c.code === country)?.nameEn}</span>
      </button>
      {open && (
        <ul
          className="absolute mt-2 w-48 z-30 bg-surface-secondary/90 backdrop-blur border border-white/10 rounded-xl shadow-elevate-lg p-2 space-y-1"
          role="listbox"
        >
          {countries.map((c) => (
            <li key={c.code}>
              <Link
                href={buildTarget(c.code)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition ${
                  c.code === country ? "bg-white/10" : ""
                }`}
                role="option"
                aria-selected={c.code === country}
              >
                <span>{c.flag}</span>
                <span className="font-medium">{locale === "ar" ? c.nameAr : c.nameEn}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
