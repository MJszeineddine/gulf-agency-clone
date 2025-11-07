import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { countries } from "@/i18n/routing";

export function generateStaticParams() {
  const locales = ["ar", "en"] as const;
  const params: { country: string; locale: string }[] = [];

  countries.forEach((country) => {
    locales.forEach((locale) => {
      params.push({ country: country.code, locale });
    });
  });

  return params;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;

  // Validate country
  const validCountry = countries.find((c) => c.code === country);
  if (!validCountry) {
    notFound();
  }

  // Validate locale
  if (locale !== "ar" && locale !== "en") {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
