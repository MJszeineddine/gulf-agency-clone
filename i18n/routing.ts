import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  
  pathnames: {
    "/": "/",
    "/services": {
      ar: "/خدمات",
      en: "/services"
    },
    "/work": {
      ar: "/أعمالنا",
      en: "/work"
    },
    "/contact": {
      ar: "/اتصل-بنا",
      en: "/contact"
    }
  }
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export const countries = [
  { code: "ae", nameAr: "الإمارات", nameEn: "UAE", flag: "🇦🇪" },
  { code: "sa", nameAr: "السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦" },
  { code: "qa", nameAr: "قطر", nameEn: "Qatar", flag: "🇶🇦" },
  { code: "kw", nameAr: "الكويت", nameEn: "Kuwait", flag: "🇰🇼" },
  { code: "bh", nameAr: "البحرين", nameEn: "Bahrain", flag: "🇧🇭" },
  { code: "om", nameAr: "عمان", nameEn: "Oman", flag: "🇴🇲" },
] as const;
