// ──────────────────────────────────────────────────────────────
// CONTACT PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays a contact form and contact information.
// ──────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion-wrapper"; // ← NEW

// ──────────────────────────────────────────────────────────
// Form Validation Schema
// ──────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ──────────────────────────────────────────────────────────
// Contact Page Component
// ──────────────────────────────────────────────────────────

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // ──────────────────────────────────────────────────────────
  // Handle form submission
  // ──────────────────────────────────────────────────────────

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await apiClient.post("/contact", data);
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <MotionWrapper>
          {" "}
          {/* ← WRAP CONTENT */}
          {/* ────────────────────────────────────────── */}
          {/* Section Header */}
          {/* ────────────────────────────────────────── */}
          <div className="mb-12">
            <p className="text-sm font-medium text-indigo-600">Let's Connect</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Have an opportunity, project, or question? Let's talk.
            </h1>
          </div>
          {/* ────────────────────────────────────────── */}
          {/* Contact Grid */}
          {/* ────────────────────────────────────────── */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* ────────────────────────────────────────── */}
            {/* Contact Information (Left) */}
            {/* ────────────────────────────────────────── */}

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium">📧 Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    dancankalerwa@gmail.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium">💼 LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/dancan-kalerwa-7a3741297/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Dancan Kalerwa
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium">💻 GitHub</p>
                  <a
                    href="https://github.com/Dancan1907"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Dancan1907
                  </a>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  🟢 Available for Internships
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Usually responds within 24–48 hours.
                </p>
              </div>

              <div className="mt-4">
                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  📄 Download Resume
                </a>
              </div>
            </div>

            {/* ────────────────────────────────────────── */}
            {/* Contact Form (Right) */}
            {/* ────────────────────────────────────────── */}

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project, opportunity, or question..."
                    rows={5}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </MotionWrapper>
      </main>
    </>
  );
}