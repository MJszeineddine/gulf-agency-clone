import fs from "fs";
import path from "path";
import matter from "gray-matter";

const servicesDir = path.join(process.cwd(), "content/services");

export interface ServiceMetadata {
  title: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  featured?: boolean;
  pricing: {
    starting: string;
    currency: string;
    period: string;
  };
  features: string[];
  benefits: string[];
  cta: {
    text: string;
    link: string;
  };
}

export interface Service extends ServiceMetadata {
  content: string;
}

export function getAllServices(locale: "ar" | "en"): ServiceMetadata[] {
  const localeDir = path.join(servicesDir, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"));

  const services = files.map((filename) => {
    const filePath = path.join(localeDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      ...data,
      slug: data.slug || filename.replace(/\.mdx$/, ""),
    } as ServiceMetadata;
  });

  return services;
}

export function getServiceBySlug(slug: string, locale: "ar" | "en"): Service | null {
  try {
    const filePath = path.join(servicesDir, locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      slug: data.slug || slug,
      content,
    } as Service;
  } catch (error) {
    return null;
  }
}

export function getServiceSlugs(locale: "ar" | "en"): string[] {
  const localeDir = path.join(servicesDir, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
