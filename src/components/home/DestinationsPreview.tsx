"use client";

import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS } from "@/lib/types";
import { Reveal } from "@/components/shared/Reveal";

export function DestinationsPreview() {
  const { navigate } = useAppStore();

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Discover Bali
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Explore by Destination
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each corner of Bali offers a distinct character. From the spiritual heart of Ubud
            to the dramatic cliffs of Uluwatu, find your perfect escape.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((dest, i) => (
            <Reveal key={dest.slug} delay={i * 80}>
              <button
                onClick={() => navigate("destination-villas", { destination: dest.slug })}
                className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden text-left shadow-sm hover:shadow-premium-hover transition-all duration-500"
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-1.5">
                    {dest.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-sm text-white/85 line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-20">
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">
                      {dest.villaCount} villas available
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
