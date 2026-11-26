"use client";

import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { VILLAS } from "@/lib/data";
import { VillaCard } from "@/components/explore/VillaCard";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

export function FeaturedVillas() {
  const { navigate } = useAppStore();
  const featured = VILLAS.filter((v) => v.featured).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Handpicked for You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Featured Luxury Villas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our most sought-after villas, each offering a unique blend of
            Balinese charm and modern luxury. From clifftop retreats to jungle sanctuaries.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((villa, i) => (
            <Reveal key={villa.id} delay={i * 100}>
              <VillaCard villa={villa} />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center mt-12" delay={200}>
          <Button
            onClick={() => navigate("explore")}
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Explore All Villas
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
