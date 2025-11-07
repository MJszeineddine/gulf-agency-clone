import { ServiceCard } from "./service-card";

interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string;
  pricing: {
    starting: string;
    currency: string;
    period: string;
  };
  featured?: boolean;
}

interface ServiceGridProps {
  services: Service[];
  country: string;
  locale: string;
}

export function ServiceGrid({ services, country, locale }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard
          key={service.slug}
          title={service.title}
          description={service.description}
          icon={service.icon}
          slug={service.slug}
          pricing={service.pricing}
          featured={service.featured}
          country={country}
          locale={locale}
        />
      ))}
    </div>
  );
}
