import { notFound } from "next/navigation";
import { getServiceBySlug, getServiceSlugs, getAllServices } from "@/lib/services";
import { countries } from "@/i18n/routing";
import { LeadForm } from "@/components/forms/lead-form";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { generateHreflangTags, getHreflangMetadata } from "@/lib/seo/hreflang";
import { generateServiceSchema, generateBreadcrumbSchema, getJsonLdScript } from "@/lib/seo/jsonld";

interface ServicePageProps {
  params: Promise<{
    country: string;
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ["ar", "en"] as const;
  const params: { country: string; locale: string; slug: string }[] = [];

  countries.forEach((country) => {
    locales.forEach((locale) => {
      const slugs = getServiceSlugs(locale);
      slugs.forEach((slug) => {
        params.push({ country: country.code, locale, slug });
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug, country } = await params;
  const service = getServiceBySlug(slug, locale as "ar" | "en");
  if (!service) return { title: "Service Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pathname = `/services/${slug}`;
  const hreflang = getHreflangMetadata({ country, locale: locale as "ar" | "en", pathname });

  return {
    title: `${service.title} | Gulf Marketing Agency`,
    description: service.description.slice(0, 160),
    alternates: hreflang.alternates,
    openGraph: {
      title: service.title,
      description: service.description,
      url: hreflang.canonical,
      siteName: "Gulf Marketing Agency",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description.slice(0, 200),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { country, locale, slug } = await params;
  const service = getServiceBySlug(slug, locale as "ar" | "en");

  if (!service) {
    notFound();
  }

  const isRTL = locale === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gulfagency.com";

  // Generate JSON-LD structured data
  const serviceSchema = generateServiceSchema(
    {
      title: service.title,
      description: service.description,
      pricing: service.pricing,
    },
    locale as "ar" | "en"
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isRTL ? "الرئيسية" : "Home", url: `${baseUrl}/${country}/${locale}` },
    { name: isRTL ? "الخدمات" : "Services", url: `${baseUrl}/${country}/${locale}/services` },
    { name: service.title, url: `${baseUrl}/${country}/${locale}/services/${slug}` },
  ]);

  return (
    <main className="min-h-screen bg-surface-primary">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLdScript(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLdScript(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-arabian-night">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-stars.svg')] opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-accent-gold/20 flex items-center justify-center text-5xl">
              {service.icon}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-gold">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Pricing */}
            <div className={`flex items-baseline justify-center gap-3 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-lg text-text-secondary">
                {isRTL ? "يبدأ من" : "Starting from"}
              </span>
              <span className="text-5xl font-bold text-accent-gold">
                {service.pricing.starting}
              </span>
              <span className="text-xl text-text-secondary">
                {service.pricing.currency}
              </span>
              <span className="text-lg text-text-secondary">
                / {service.pricing.period}
              </span>
            </div>

            {/* CTA */}
            <a 
              href="#contact-form"
              className="inline-block px-10 py-5 bg-accent-gold text-surface-primary font-bold text-lg rounded-lg hover:scale-105 transition-transform duration-300 shadow-glow-gold"
            >
              {service.cta.text}
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-primary to-transparent" />
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-surface-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Features */}
            <div className="glass-effect p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-gradient-gold">
                {isRTL ? "ما نقدمه" : "What's Included"}
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className={`flex gap-3 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                    <Check className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
                    <span className="text-text-secondary leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="glass-effect p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-gradient-gold">
                {isRTL ? "الفوائد" : "Benefits"}
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className={`flex gap-3 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                    <Check className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1" />
                    <span className="text-text-secondary leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-surface-secondary">
        <div className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto prose prose-invert prose-lg ${isRTL ? "text-right" : ""}`}>
            <MDXRemote source={service.content} />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-surface-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
              {isRTL ? "ابدأ مشروعك اليوم" : "Start Your Project Today"}
            </h2>
            <p className="text-xl text-text-secondary">
              {isRTL 
                ? "املأ النموذج وسنتواصل معك خلال 24 ساعة"
                : "Fill the form and we'll contact you within 24 hours"}
            </p>
          </div>

          <LeadForm serviceName={slug} country={country} locale={locale} />
        </div>
      </section>
    </main>
  );
}
