"use server";

import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  country: z.string(),
  locale: z.string(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export async function submitLead(data: LeadFormData) {
  try {
    // Validate data
    const validatedData = leadSchema.parse(data);

    // In production, this would go to CRM
    // For local-only, we log or send to mock-CRM
    const webhookUrl = process.env.CRM_WEBHOOK_URL || "http://localhost:8787/leads";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validatedData,
        timestamp: new Date().toISOString(),
        source: "website",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit lead");
    }

    return {
      success: true,
      message: data.locale === "ar" 
        ? "شكراً! سنتواصل معك قريباً" 
        : "Thank you! We'll contact you soon",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>),
      };
    }

    return {
      success: false,
      message: data.locale === "ar"
        ? "حدث خطأ، يرجى المحاولة لاحقاً"
        : "An error occurred, please try again later",
    };
  }
}
