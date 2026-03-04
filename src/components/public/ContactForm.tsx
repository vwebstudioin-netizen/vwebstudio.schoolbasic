"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-primary">
            Full Name *
          </label>
          <Input
            id="name"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-primary">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text-primary">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          {...register("phone")}
        />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-text-primary">
          Subject *
        </label>
        <Input
          id="subject"
          placeholder="What is this regarding?"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-text-primary">
          Message *
        </label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Type your message here..."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
