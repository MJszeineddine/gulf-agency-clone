import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getHreflangMetadata } from "@/lib/seo/hreflang";
import { getAllServices } from "@/lib/services";
import { ServiceGrid } from "@/components/services/service-grid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const t = useTranslations();
  const services = getAllServices(locale as "ar" | "en");

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-arabian-night">
        <div className="absolute inset-0 bg-[url('/patterns/islamic-stars.svg')] opacity-5" />
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-7xl md:text-8xl font-bold mb-8 text-gradient-gold animate-fade-in">
              {t("hero.headline")}
            </h1>
            
            <p className="text-2xl md:text-3xl text-text-secondary mb-12 animate-slide-up">
              {t("hero.subheadline")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
              <button className="px-10 py-5 bg-accent-gold text-surface-primary font-bold text-lg rounded-lg hover:scale-105 transition-transform duration-300 shadow-glow-gold">
                {t("hero.cta")}
              </button>
              
              <button className="px-10 py-5 glass-effect text-white font-bold text-lg rounded-lg hover:scale-105 transition-transform duration-300">
                {t("common.learnMore")}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-primary to-transparent" />
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-surface-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-gold">
              {t("services.headline")}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t("services.subheadline")}
            </p>
          </div>

          {/* Service Cards Grid */}
          <ServiceGrid services={services} country={country} locale={locale} />
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-desert-sunset">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Transform Your Brand?
          </h2>
          <button className="px-12 py-6 bg-surface-primary text-accent-gold font-bold text-xl rounded-lg hover:scale-105 transition-transform duration-300 shadow-elevate-lg">
            {t("common.getStarted")}
          </button>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  const pathname = ""; // homepage
  const hreflang = getHreflangMetadata({ country, locale: locale as "ar" | "en", pathname });
  return {
    title: locale === "ar" ? "وكالة الخليج للتسويق" : "Gulf Marketing Agency",
    description:
      locale === "ar"
        ? "وكالة تسويق رقمي فاخرة في الخليج تقدم نتائج قابلة للقياس"
        : "Luxury Gulf digital marketing agency delivering measurable growth",
    alternates: hreflang.alternates,
  };
}
