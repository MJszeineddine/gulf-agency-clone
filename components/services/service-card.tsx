"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
  pricing: {
    starting: string;
    currency: string;
    period: string;
  };
  featured?: boolean;
  country: string;
  locale: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  slug,
  pricing,
  featured = false,
  country,
  locale,
}: ServiceCardProps) {
  const isRTL = locale === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/${country}/${locale}/services/${slug}`}>
        <div className={`
          group relative h-full p-8 rounded-xl
          glass-effect hover:scale-105 
          transition-all duration-300 cursor-pointer
          border-2 border-transparent hover:border-accent-gold/30
          ${featured ? "bg-gradient-to-br from-accent-gold/10 to-transparent" : ""}
        `}>
          {/* Featured Badge */}
          {featured && (
            <div className={`
              absolute ${isRTL ? "left-4" : "right-4"} top-4 
              px-3 py-1 rounded-full 
              bg-accent-gold text-surface-primary 
              text-xs font-bold
            `}>
              {isRTL ? "مميز" : "Featured"}
            </div>
          )}

          {/* Icon */}
          <div className="w-20 h-20 mb-6 rounded-lg bg-accent-gold/20 flex items-center justify-center text-4xl">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 text-gradient-gold group-hover:scale-105 transition-transform">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary mb-6 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Pricing */}
          <div className="mb-6 pt-4 border-t border-border-subtle">
            <div className={`flex items-baseline gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-sm text-text-secondary">
                {isRTL ? "يبدأ من" : "Starting from"}
              </span>
              <span className="text-3xl font-bold text-accent-gold">
                {pricing.starting}
              </span>
              <span className="text-sm text-text-secondary">
                {pricing.currency}
              </span>
              <span className="text-sm text-text-secondary">
                / {pricing.period}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className={`
            flex items-center gap-2 text-accent-gold 
            font-semibold group-hover:gap-4 transition-all
            ${isRTL ? "flex-row-reverse" : ""}
          `}>
            <span>{isRTL ? "اعرف المزيد" : "Learn More"}</span>
            <ArrowRight 
              className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
            />
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-gold/0 to-accent-gold/0 group-hover:from-accent-gold/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
