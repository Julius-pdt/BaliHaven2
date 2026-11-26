"use client";

import {
  ShieldCheck,
  Heart,
  Leaf,
  Users,
  Award,
  Globe,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "Every villa is verified by our local team. Honest photos, accurate descriptions, no surprises.",
  },
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description:
      "We treat every guest like family. Our concierge team goes above and beyond to make your stay unforgettable.",
  },
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    description:
      "We partner with villas that respect Bali's environment and support local communities.",
  },
  {
    icon: Award,
    title: "Curated Excellence",
    description:
      "Only 5% of villas we inspect make it into our collection. We maintain the highest standards.",
  },
];

const STATS = [
  { value: "12+", label: "Years of Experience" },
  { value: "120+", label: "Luxury Villas" },
  { value: "15K+", label: "Happy Guests" },
  { value: "98%", label: "Would Book Again" },
];

const TEAM = [
  {
    name: "Made Wirawan",
    role: "Founder & CEO",
    bio: "Born and raised in Ubud, Made founded Bali Haven in 2012 after a decade in luxury hospitality.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Putri Saraswati",
    role: "Head of Curation",
    bio: "Putri personally inspects every villa in our collection. Her eye for design is unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Ketut Arimbawa",
    role: "Concierge Director",
    bio: "With 15 years in hospitality, Ketut leads our 24/7 concierge team with Balinese warmth.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

export function AboutPage() {
  const { navigate } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative py-24 lg:py-32 overflow-hidden bg-cream">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sage blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 leading-tight">
              Crafting Unforgettable
              <br />
              <span className="italic text-primary">Bali Experiences</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bali Haven was born from a simple belief: that every traveler deserves to
              experience the magic of Bali in genuine luxury, with the warmth of true Balinese
              hospitality.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=1200&q=80"
                  alt="Bali villa pool"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-5 shadow-xl">
                <div className="font-serif text-3xl font-bold text-primary">2012</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Since
                </div>
              </div>
            </Reveal>

            <Reveal className="space-y-5">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                Our Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                From a Family Dream to Bali&apos;s Premier Villa Collection
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Bali Haven began as a small family business in Ubud. Our founder, Made
                  Wirawan, grew up watching his parents welcome travelers to their humble
                  homestay. He learned that true hospitality isn&apos;t about luxury - it&apos;s
                  about making people feel at home.
                </p>
                <p>
                  After years working in international luxury hotels, Made returned to Bali
                  with a vision: to create a platform that connects discerning travelers with
                  the island&apos;s most exceptional villas, while preserving the authentic
                  warmth of Balinese hospitality.
                </p>
                <p>
                  Today, Bali Haven curates over 120 handpicked villas across six destinations,
                  serving travelers from over 60 countries. But our mission remains unchanged:
                  to craft unforgettable Bali experiences, one guest at a time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider opacity-80 mt-2">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24 bg-cream/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Our Core Values
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="flex gap-5 p-6 bg-card rounded-2xl border border-border/60 hover:shadow-premium-hover transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Meet the Team
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              The People Behind Bali Haven
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-cream">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <Reveal>
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
              Ready to Discover Your Bali Paradise?
            </h2>
            <p className="text-muted-foreground mb-6">
              Browse our collection of handpicked luxury villas and start planning your
              unforgettable escape.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => navigate("explore")}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Explore Villas
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("contact")}
                className="rounded-full"
              >
                Contact Our Team
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
