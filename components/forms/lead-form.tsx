"use client";

import { useState, useTransition } from "react";
import { submitLead, type LeadFormData } from "@/actions/submit-lead";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

interface LeadFormProps {
  serviceName?: string;
  country: string;
  locale: string;
}

export function LeadForm({ serviceName, country, locale }: LeadFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const isRTL = locale === "ar";

  const labels = {
    ar: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      company: "اسم الشركة (اختياري)",
      service: "الخدمة المطلوبة",
      message: "رسالتك",
      submit: "إرسال الطلب",
      sending: "جاري الإرسال...",
      selectService: "اختر الخدمة",
    },
    en: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company Name (Optional)",
      service: "Service Required",
      message: "Your Message",
      submit: "Send Request",
      sending: "Sending...",
      selectService: "Select Service",
    },
  };

  const t = labels[locale as keyof typeof labels];

  const services = [
    { value: "social-media-marketing", labelAr: "إدارة حسابات وسائل التواصل", labelEn: "Social Media Marketing" },
    { value: "google-ads", labelAr: "إعلانات جوجل", labelEn: "Google Ads" },
    { value: "meta-ads", labelAr: "إعلانات ميتا", labelEn: "Meta Ads" },
    { value: "content-marketing", labelAr: "تسويق المحتوى", labelEn: "Content Marketing" },
    { value: "seo-local", labelAr: "تحسين محركات البحث المحلي", labelEn: "Local SEO" },
    { value: "web-development", labelAr: "تطوير المواقع", labelEn: "Web Development" },
  ];

  async function handleSubmit(formData: FormData) {
    const data: LeadFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      country,
      locale,
    };

    startTransition(async () => {
      const result = await submitLead(data);
      
      if (result.success) {
        setStatus({ type: "success", message: result.message! });
        // Reset form
        (document.getElementById("lead-form") as HTMLFormElement)?.reset();
      } else {
        setStatus({ 
          type: "error", 
          message: result.message || "An error occurred" 
        });
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect p-8 rounded-xl max-w-2xl mx-auto"
    >
      <form id="lead-form" action={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-semibold mb-2 text-text-secondary"
          >
            {t.name} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-subtle focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all outline-none text-text-primary"
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>

        {/* Email */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-semibold mb-2 text-text-secondary"
          >
            {t.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-subtle focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all outline-none text-text-primary"
            dir="ltr"
          />
        </div>

        {/* Phone */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-sm font-semibold mb-2 text-text-secondary"
          >
            {t.phone} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-subtle focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all outline-none text-text-primary"
            dir="ltr"
          />
        </div>

        {/* Company */}
        <div>
          <label 
            htmlFor="company" 
            className="block text-sm font-semibold mb-2 text-text-secondary"
          >
            {t.company}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-subtle focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all outline-none text-text-primary"
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>

        {/* Service */}
        <div>
          <label 
            htmlFor="service" 
            className="block text-sm font-semibold mb-2 text-text-secondary"
          >
            {t.service} *
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue={serviceName || ""}
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-subtle focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all outline-none text-text-primary"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <option value="">{t.selectService}</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {locale === "ar" ? service.labelAr : service.labelEn}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-semibold mb-2 text-text-secondary"
          >
            {t.message} *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-subtle focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all outline-none text-text-primary resize-none"
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>

        {/* Status Message */}
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              status.type === "success"
                ? "bg-state-success/20 text-state-success border border-state-success/30"
                : "bg-state-error/20 text-state-error border border-state-error/30"
            }`}
          >
            {status.message}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-4 bg-accent-gold text-surface-primary font-bold text-lg rounded-lg hover:scale-105 transition-transform duration-300 shadow-glow-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <Send className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
