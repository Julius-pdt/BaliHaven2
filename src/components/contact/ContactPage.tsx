"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@balihaven.com",
    href: "mailto:hello@balihaven.com",
    description: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+62 361 8888 999",
    href: "tel:+623618888999",
    description: "Mon-Sun, 8am - 10pm WITA",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+62 812 3456 7890",
    href: "https://wa.me/6281234567890",
    description: "Fastest response time",
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    // Simulate API
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="py-20 lg:py-24 bg-cream border-b border-border/40">
        <Reveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re planning your next escape, have a question about a villa,
            or need help with an existing booking - our team is here for you.
          </p>
        </Reveal>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact methods */}
          <div className="space-y-6">
            <Reveal>
              <h2 className="font-serif text-2xl font-bold mb-2">Contact Information</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Reach out through any of these channels. We&apos;re available 24/7 for
                urgent guest needs.
              </p>
            </Reveal>

            <div className="space-y-4">
              {CONTACT_METHODS.map((method, i) => (
                <Reveal key={method.label} delay={i * 80}>
                  <a
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <method.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {method.label}
                      </div>
                      <div className="font-semibold text-sm truncate">{method.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {method.description}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="p-4 rounded-xl bg-sage-light/40 border border-sage/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Office Hours</h3>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Customer Service</span>
                    <span>8:00 AM - 10:00 PM WITA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concierge (Urgent)</span>
                    <span>24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Office Visit</span>
                    <span>By appointment</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div>
                <h3 className="font-semibold text-sm mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      onClick={(e) => e.preventDefault()}
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-card rounded-2xl shadow-sm border border-border/60 p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and we&apos;ll respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      Message Sent Successfully
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Thank you for reaching out. Our team will respond to your inquiry
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="rounded-full"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="c-name" className="mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          id="c-name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="c-email" className="mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="c-email"
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="c-subject" className="mb-2 block">
                        Subject
                      </Label>
                      <Select
                        value={form.subject}
                        onValueChange={(v) => setForm({ ...form, subject: v })}
                      >
                        <SelectTrigger id="c-subject">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="booking">Booking Question</SelectItem>
                          <SelectItem value="villa">Villa Recommendation</SelectItem>
                          <SelectItem value="concierge">Concierge Service</SelectItem>
                          <SelectItem value="partnership">Partnership / Villa Owner</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="c-message" className="mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="c-message"
                        placeholder="Tell us how we can help..."
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Map */}
        <Reveal className="mt-12">
          <div className="rounded-2xl overflow-hidden border border-border/60 aspect-[16/7] bg-muted">
            <iframe
              title="Bali Haven office location"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=115.0801%2C-8.7200%2C115.2301%2C-8.6200&layer=mapnik&marker=-8.6700%2C115.1650"
            />
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Jl. Raya Seminyak No. 88, Badung, Bali 80361, Indonesia</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
