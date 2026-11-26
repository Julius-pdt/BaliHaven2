"use client";

import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("Welcome to Bali Haven! Check your inbox for exclusive offers.");
    setEmail("");
  };

  return (
    <section className="py-20 lg:py-24 bg-sage-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sage blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cream blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Exclusive Offers
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get Inspired for Your Next Bali Escape
          </h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe to receive exclusive villa deals, insider travel tips, and
            early access to our newest properties. No spam, just Bali inspiration.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-full bg-background border-border h-12"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-xs text-foreground/60 mt-4">
            By subscribing, you agree to receive marketing emails from Bali Haven.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
