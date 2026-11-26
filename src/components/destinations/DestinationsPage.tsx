"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS } from "@/lib/types";
import { VILLAS } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

export function DestinationsPage() {
  const { navigate } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative py-20 lg:py-28 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=2400&q=80"
            alt="Bali landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 to-foreground" />
        <Reveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Discover Bali
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5">
            Six Destinations, Infinite Possibilities
          </h1>
          <p className="text-base sm:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">
            Each region of Bali offers its own unique magic. From the cultural heart of Ubud
            to the dramatic cliffs of Uluwatu, find your perfect corner of paradise.
          </p>
        </Reveal>
      </div>

      {/* Destination cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 lg:py-20">
        <div className="space-y-8">
          {DESTINATIONS.map((dest, i) => {
            const villasInDest = VILLAS.filter(
              (v) => v.location.toLowerCase() === dest.name.toLowerCase() && v.active,
            );
            const minPrice = villasInDest.length
              ? Math.min(...villasInDest.map((v) => v.pricePerNight))
              : 0;
            const isReversed = i % 2 === 1;

            return (
              <Reveal key={dest.slug}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-sm font-semibold">
                      {villasInDest.length} villas available
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-4 ${isReversed ? "lg:order-1" : ""}`}>
                    <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                      {dest.tagline}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold">{dest.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {dest.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          Starting from
                        </div>
                        <div className="font-serif text-xl font-bold text-primary">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(minPrice)}
                          <span className="text-xs font-normal text-muted-foreground ml-1">
                            /night
                          </span>
                        </div>
                      </div>
                      <div className="h-10 w-px bg-border" />
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        Bali, Indonesia
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        navigate("destination-villas", { destination: dest.slug })
                      }
                      className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                    >
                      Explore {dest.name} Villas
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
