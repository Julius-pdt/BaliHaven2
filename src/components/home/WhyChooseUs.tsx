"use client";

import { ShieldCheck, Sparkles, HeartHandshake, MapPinned } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified & Trusted",
    description:
      "Every villa is personally inspected by our team. What you see is exactly what you get - guaranteed.",
  },
  {
    icon: Sparkles,
    title: "Handpicked Selection",
    description:
      "We curate only the finest villas that meet our exacting standards of luxury, design, and service.",
  },
  {
    icon: HeartHandshake,
    title: "24/7 Concierge",
    description:
      "From airport transfers to private chefs, our local concierge team is available around the clock.",
  },
  {
    icon: MapPinned,
    title: "Local Expertise",
    description:
      "Born and raised in Bali, our team knows every hidden gem, best restaurant, and secret beach.",
  },
];

export function WhyChooseUs() {
  const { navigate } = useAppStore();

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <Reveal className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80"
                alt="Bali villa interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-10 w-40 h-40 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-background hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=600&q=80"
                alt="Bali pool"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 lg:-left-10 bg-primary text-primary-foreground rounded-2xl p-5 shadow-xl">
              <div className="font-serif text-3xl font-bold">12+</div>
              <div className="text-xs uppercase tracking-wider opacity-80">Years in Bali</div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div className="space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                Why Bali Haven
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
                The Bali Haven Difference
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re not just another booking platform. We&apos;re your trusted partner
                in crafting the perfect Balinese escape. Every villa in our collection is
                chosen with care, every guest treated like family.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="space-y-3 p-5 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-sm transition-all bg-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <Button
                onClick={() => navigate("about")}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Learn More About Us
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
