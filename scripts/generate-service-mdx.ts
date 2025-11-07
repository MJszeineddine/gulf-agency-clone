#!/usr/bin/env tsx
import fs from "fs";
import path from "path";

type Locale = "ar" | "en";

type ServiceDef = {
  slug: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  pricing: { starting: string; currency: string; period: string };
  features: { ar: string[]; en: string[] };
  benefits: { ar: string[]; en: string[] };
};

const services: ServiceDef[] = [
  {
    slug: "tiktok-ads",
    title: { ar: "إعلانات تيك توك", en: "TikTok Ads" },
    description: {
      ar: "نُنشئ حملات تيك توك مؤثرة تستهدف الجمهور الشاب بذكاء وإبداع.",
      en: "We craft high-impact TikTok campaigns that win Gen Z and Gen Alpha attention.",
    },
    pricing: { starting: "2999", currency: "AED", period: "month" },
    features: {
      ar: [
        "إستراتيجية محتوى قصيرة مخصصة",
        "إعلانات Spark وTopView",
        "التتبع والتحليلات المتقدمة",
      ],
      en: [
        "Custom short-form content strategy",
        "Spark Ads and TopView placements",
        "Advanced tracking and analytics",
      ],
    },
    benefits: {
      ar: ["نمو سريع للوعي", "تكلفة اكتساب أقل", "انتشار عضوي مدعوم بإعلانات"],
      en: ["Fast awareness growth", "Lower CAC", "Organic lift amplified by ads"],
    },
  },
  {
    slug: "linkedin-ads",
    title: { ar: "إعلانات لينكدإن", en: "LinkedIn Ads" },
    description: {
      ar: "نستهدف صناع القرار في الخليج بحملات B2B دقيقة على لينكدإن.",
      en: "We target Gulf decision-makers with precise B2B LinkedIn campaigns.",
    },
    pricing: { starting: "4500", currency: "AED", period: "month" },
    features: {
      ar: ["رسائل InMail", "Lead Gen Forms", "ABM"],
      en: ["InMail messaging", "Lead Gen Forms", "ABM"],
    },
    benefits: {
      ar: ["جودة عملاء محتملين أعلى", "مبيعات B2B أسرع", "تحسين سمعة العلامة"],
      en: ["Higher lead quality", "Faster B2B deals", "Brand authority"],
    },
  },
  {
    slug: "seo-technical",
    title: { ar: "تحسين محركات البحث التقني", en: "Technical SEO" },
    description: {
      ar: "نُحسّن مواقعكم من الناحية التقنية لتوفير فهرسة سريعة وتجربة ممتازة.",
      en: "We tune your site technically for fast indexing and stellar UX.",
    },
    pricing: { starting: "5500", currency: "AED", period: "project" },
    features: {
      ar: ["Core Web Vitals", "تحسين هيكلة البيانات", "أرشفة أسرع"],
      en: ["Core Web Vitals", "Structured data", "Faster crawl/index"],
    },
    benefits: {
      ar: ["ترتيب أفضل", "معدل تحويل أعلى", "تجربة تصفح أسرع"],
      en: ["Better rankings", "Higher conversions", "Faster experience"],
    },
  },
  {
    slug: "seo-ecommerce",
    title: { ar: "سيو المتاجر الإلكترونية", en: "E‑commerce SEO" },
    description: {
      ar: "نمو عضوي للمتاجر عبر تحسين الفئات والمنتجات والبحث الداخلي.",
      en: "Organic growth for shops by optimizing categories, PDPs, and on-site search.",
    },
    pricing: { starting: "6500", currency: "AED", period: "month" },
    features: {
      ar: ["مخططات المنتج", "تحسين الفلاتر", "SEO للبحث الداخلي"],
      en: ["Product schema", "Facet optimization", "On-site search SEO"],
    },
    benefits: {
      ar: ["زيارات مؤهلة", "زيادة المبيعات", "ARPU أعلى"],
      en: ["Qualified traffic", "More sales", "Higher ARPU"],
    },
  },
  {
    slug: "email-marketing",
    title: { ar: "التسويق عبر البريد", en: "Email Marketing" },
    description: {
      ar: "تدفقات آلية ورسائل دورية تزيد من CLV دون زيادة الإنفاق الإعلاني.",
      en: "Automations and newsletters that lift CLV without more ad spend.",
    },
    pricing: { starting: "2800", currency: "AED", period: "month" },
    features: {
      ar: ["سلاسل الترحيب", "سلة مهجورة", "تقسيم ذكي"],
      en: ["Welcome flows", "Abandoned cart", "Smart segmentation"],
    },
    benefits: {
      ar: ["زيادة CLV", "عوائد متكررة", "تخصيص أعمق"],
      en: ["Higher CLV", "Recurring revenue", "Deeper personalization"],
    },
  },
  {
    slug: "sms-marketing",
    title: { ar: "التسويق عبر الرسائل النصية", en: "SMS Marketing" },
    description: {
      ar: "رسائل قصيرة ذكية تحقق معدلات فتح ونقر فائقة.",
      en: "Smart SMS that drives exceptional open and click rates.",
    },
    pricing: { starting: "1800", currency: "AED", period: "month" },
    features: {
      ar: ["تنبيهات فورية", "عروض محدودة", "تقسيم حسب السلوك"],
      en: ["Instant alerts", "Limited-time offers", "Behavioral segments"],
    },
    benefits: {
      ar: ["استجابة سريعة", "مبيعات فورية", "تكلفة منخفضة"],
      en: ["Fast response", "Instant sales", "Low cost"],
    },
  },
  {
    slug: "whatsapp-marketing",
    title: { ar: "التسويق عبر واتساب", en: "WhatsApp Marketing" },
    description: {
      ar: "حملات واتساب معتمدة توازن بين الخدمة والمبيعات في الخليج.",
      en: "WhatsApp Business campaigns blending service and sales across the Gulf.",
    },
    pricing: { starting: "3200", currency: "AED", period: "month" },
    features: {
      ar: ["قوالب رسمية", "بوتات محادثة", "تكامل CRM"],
      en: ["Official templates", "Chatbots", "CRM integration"],
    },
    benefits: {
      ar: ["ولاء أقوى", "تحويل أسرع", "خدمة متميزة"],
      en: ["Stronger loyalty", "Faster conversion", "Premium service"],
    },
  },
  {
    slug: "mobile-app-marketing",
    title: { ar: "تسويق تطبيقات الموبايل", en: "Mobile App Marketing" },
    description: {
      ar: "استحواذ واحتفاظ لمشاريع التطبيقات في منطقة الخليج.",
      en: "Acquisition and retention for mobile apps across the GCC.",
    },
    pricing: { starting: "7000", currency: "AED", period: "month" },
    features: {
      ar: ["ASA وUAC", "Deep Linking", "Firebase"],
      en: ["ASA & UAC", "Deep linking", "Firebase"],
    },
    benefits: {
      ar: ["تثبيتات بجودة أعلى", "احتفاظ أفضل", "نمو صحي"],
      en: ["Higher quality installs", "Better retention", "Healthy growth"],
    },
  },
  {
    slug: "analytics-setup",
    title: { ar: "إعداد التحليلات", en: "Analytics Setup" },
    description: {
      ar: "قياس موحّد من GA4 إلى الإعلانات لضمان قرارات دقيقة.",
      en: "Unified measurement from GA4 to ads for accurate decisions.",
    },
    pricing: { starting: "4000", currency: "AED", period: "project" },
    features: {
      ar: ["GA4 + GTM", "Server-Side Tagging", "لوحات قيادة"],
      en: ["GA4 + GTM", "Server-side tagging", "Dashboards"],
    },
    benefits: {
      ar: ["بيانات موثوقة", "إسناد أدق", "رؤية شاملة"],
      en: ["Trusted data", "Better attribution", "Holistic visibility"],
    },
  },
  {
    slug: "cro-optimization",
    title: { ar: "تحسين معدل التحويل (CRO)", en: "CRO Optimization" },
    description: {
      ar: "اختبارات A/B وتجربة مشتري راقية لرفع التحويلات.",
      en: "A/B tests and premium buyer journeys to lift conversions.",
    },
    pricing: { starting: "6000", currency: "AED", period: "month" },
    features: {
      ar: ["خرائط الحرارة", "اختبارات متعددة", "تلخيص البحث"],
      en: ["Heatmaps", "Multivariate tests", "Research synthesis"],
    },
    benefits: {
      ar: ["عوائد أعلى", "احتكاك أقل", "UX أفضل"],
      en: ["More revenue", "Less friction", "Better UX"],
    },
  },
  {
    slug: "branding-strategy",
    title: { ar: "العلامة الاستراتيجية", en: "Brand Strategy" },
    description: {
      ar: "صياغة هوية ورسالة وعالم بصري فاخر يناسب الخليج.",
      en: "Craft a premium brand identity, voice, and visual world for the Gulf.",
    },
    pricing: { starting: "12000", currency: "AED", period: "project" },
    features: {
      ar: ["شخصية وصوت", "نظام بصري", "دليل العلامة"],
      en: ["Personality & voice", "Visual system", "Brand book"],
    },
    benefits: {
      ar: ["تمايز أقوى", "ولاء أعلى", "توسع أسهل"],
      en: ["Stronger differentiation", "Higher loyalty", "Easier expansion"],
    },
  },
  {
    slug: "logo-design",
    title: { ar: "تصميم الشعار", en: "Logo Design" },
    description: {
      ar: "شعارات عربية وإنجليزية فاخرة مع خطوط وتطبيقات مرنة.",
      en: "Premium Arabic and English logos with flexible systems.",
    },
    pricing: { starting: "9000", currency: "AED", period: "project" },
    features: {
      ar: ["متغيرات أفقية/عمودية", "أدلة استخدام", "ملفات إنتاج"],
      en: ["Horizontal/vertical variants", "Usage guides", "Production assets"],
    },
    benefits: {
      ar: ["هوية قوية", "مرونة تطبيق", "تناسب المنصات"],
      en: ["Strong identity", "Flexible application", "Platform fit"],
    },
  },
  {
    slug: "product-photography",
    title: { ar: "تصوير المنتجات", en: "Product Photography" },
    description: {
      ar: "صور منتجات فاخرة تلائم السوق الخليجي وثقافته.",
      en: "Luxury product shots tailored to Gulf tastes and culture.",
    },
    pricing: { starting: "5000", currency: "AED", period: "project" },
    features: {
      ar: ["استوديو وإضاءة", "تحرير متقدم", "مطابقة ألوان"],
      en: ["Studio & lighting", "Advanced retouching", "Color matching"],
    },
    benefits: {
      ar: ["جاذبية أعلى", "صور متسقة", "مبيعات أفضل"],
      en: ["Higher appeal", "Consistent imagery", "Better sales"],
    },
  },
  {
    slug: "video-production",
    title: { ar: "إنتاج الفيديو", en: "Video Production" },
    description: {
      ar: "إنتاج فيديو فاخر للإعلانات والحملات والمحتوى الاجتماعي.",
      en: "Premium video for ads, campaigns, and social content.",
    },
    pricing: { starting: "15000", currency: "AED", period: "project" },
    features: {
      ar: ["سيناريو وإخراج", "تصوير ومونتاج", "جرافيكس وصوت"],
      en: ["Script & direction", "Shooting & editing", "Motion & sound"],
    },
    benefits: {
      ar: ["تأثير بصري قوي", "قابلية مشاركة", "نتائج مدفوعة"],
      en: ["Visual impact", "Shareability", "Performance-driven"],
    },
  },
  {
    slug: "content-creation",
    title: { ar: "إنشاء المحتوى", en: "Content Creation" },
    description: {
      ar: "محتوى عربي/إنجليزي فاخر يعبر عن صوت العلامة ويبني الثقة.",
      en: "Lux Arabic/English content that expresses brand voice and drives trust.",
    },
    pricing: { starting: "3500", currency: "AED", period: "month" },
    features: {
      ar: ["مقالات ومدونات", "نصوص إعلانية", "أصول اجتماعية"],
      en: ["Articles & blogs", "Ad copy", "Social assets"],
    },
    benefits: {
      ar: ["سلطة أعلى", "قابلية ترتيب", "تفاعل أفضل"],
      en: ["More authority", "Rankability", "Better engagement"],
    },
  },
  {
    slug: "influencer-marketing",
    title: { ar: "التسويق عبر المؤثرين", en: "Influencer Marketing" },
    description: {
      ar: "شبكة مؤثرين خليجيين بعقود واضحة ونتائج قابلة للقياس.",
      en: "Gulf influencer network with clear contracts and measurable outcomes.",
    },
    pricing: { starting: "7000", currency: "AED", period: "campaign" },
    features: {
      ar: ["اختيار ومطابقة", "إدارة الإنتاج", "تتبع الأداء"],
      en: ["Scouting & match", "Production mgmt", "Performance tracking"],
    },
    benefits: {
      ar: ["وصول موثوق", "وعي سريع", "UGC غني"],
      en: ["Trusted reach", "Rapid awareness", "Rich UGC"],
    },
  },
  {
    slug: "pr-media",
    title: { ar: "العلاقات العامة والإعلام", en: "PR & Media" },
    description: {
      ar: "حضور إعلامي خليجي عبر بيانات صحفية وتغطيات رفيعة.",
      en: "Gulf media presence via high-tier PR and coverage.",
    },
    pricing: { starting: "9000", currency: "AED", period: "campaign" },
    features: {
      ar: ["بيانات صحفية", "رعاية فعاليات", "تغطيات صحفية"],
      en: ["Press releases", "Event sponsorships", "Media coverage"],
    },
    benefits: {
      ar: ["موثوقية أعلى", "وصول نخبة", "تأثير إقليمي"],
      en: ["More credibility", "Elite reach", "Regional influence"],
    },
  },
  {
    slug: "event-marketing",
    title: { ar: "تسويق الفعاليات", en: "Event Marketing" },
    description: {
      ar: "تجارب علامات فاخرة من الفكرة إلى التنفيذ والتغطية.",
      en: "Luxury brand experiences from concept to execution and coverage.",
    },
    pricing: { starting: "20000", currency: "AED", period: "project" },
    features: {
      ar: ["إبداع وتنفيذ", "إدارة الضيوف", "تغطية محتوى"],
      en: ["Creative & production", "Guest mgmt", "Content coverage"],
    },
    benefits: {
      ar: ["ذكريات لا تُنسى", "شبكات علاقات", "أثر طويل"],
      en: ["Memorable moments", "Networking", "Lasting impact"],
    },
  },
];

function mdxTemplate(s: ServiceDef, locale: Locale) {
  const fm = [
    `title: "${s.title[locale].replace(/"/g, '\\"')}"`,
    `slug: ${s.slug}`,
    `description: "${s.description[locale].replace(/"/g, '\\"')}"`,
    `pricing:`,
    `  starting: "${s.pricing.starting}"`,
    `  currency: ${s.pricing.currency}`,
    `  period: ${s.pricing.period}`,
    `features:`,
    ...s.features[locale].map((f) => `  - "${f.replace(/"/g, '\\"')}"`),
    `benefits:`,
    ...s.benefits[locale].map((b) => `  - "${b.replace(/"/g, '\\"')}"`),
    `cta:`,
    `  text: "${locale === "ar" ? "اطلب عرض أسعار" : "Get a Quote"}"`,
  ].join("\n");

  const intro =
    locale === "ar"
      ? `\n## نظرة عامة\n\n${s.description.ar}\n\n`
      : `\n## Overview\n\n${s.description.en}\n\n`;

  const sections =
    locale === "ar"
      ? `### لمن هذه الخدمة؟\n\n- شركات تبحث عن نمو سريع\n- علامات فاخرة تستهدف الخليج\n\n### كيف نعمل؟\n\n1. اكتشاف \n2. إطلاق \n3. تحسين مستمر\n\n`
      : `### Who is it for?\n\n- Brands seeking fast growth\n- Luxury labels targeting the Gulf\n\n### How we work\n\n1. Discovery \n2. Launch \n3. Continuous optimization\n\n`;

  return `---\n${fm}\n---\n${intro}${sections}`;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeIfMissing(filePath: string, content: string) {
  if (fs.existsSync(filePath)) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function run() {
  const root = process.cwd();
  const base = path.join(root, "content", "services");
  const dirAr = path.join(base, "ar");
  const dirEn = path.join(base, "en");
  ensureDir(dirAr);
  ensureDir(dirEn);

  let created = 0;
  services.forEach((s) => {
    const arPath = path.join(dirAr, `${s.slug}.mdx`);
    const enPath = path.join(dirEn, `${s.slug}.mdx`);
    created += writeIfMissing(arPath, mdxTemplate(s, "ar")) ? 1 : 0;
    created += writeIfMissing(enPath, mdxTemplate(s, "en")) ? 1 : 0;
  });

  console.log(`Generated ${created} MDX files (skipped existing).`);
}

run();
