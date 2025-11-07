interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressRegion: string;
  };
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  areaServed: {
    "@type": "Country";
    name: string;
  }[];
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export function generateOrganizationSchema(locale: "ar" | "en"): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ar" ? "وكالة الخليج للتسويق" : "Gulf Marketing Agency",
    url: "https://gulfagency.com",
    logo: "https://gulfagency.com/logo.png",
    description:
      locale === "ar"
        ? "وكالة تسويق رقمي متكاملة في قلب الخليج العربي"
        : "Full-service digital marketing agency in the heart of the Arabian Gulf",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-50-123-4567",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://linkedin.com/company/gulf-agency",
      "https://twitter.com/gulf_agency",
      "https://instagram.com/gulf_agency",
    ],
  };
}

export function generateServiceSchema(
  service: {
    title: string;
    description: string;
    pricing: { starting: string; currency: string };
  },
  locale: "ar" | "en"
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: locale === "ar" ? "وكالة الخليج للتسويق" : "Gulf Marketing Agency",
      url: "https://gulfagency.com",
    },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Oman" },
    ],
    offers: {
      "@type": "Offer",
      price: service.pricing.starting,
      priceCurrency: service.pricing.currency,
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Use this to generate JSON-LD script content
export function getJsonLdScript(schema: object): string {
  return JSON.stringify(schema);
}
