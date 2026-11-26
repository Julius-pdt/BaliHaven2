"use client";

import {
  Bed,
  Bath,
  Users,
  MapPin,
  Star,
  Waves,
  ArrowRight,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Villa } from "@/lib/types";
import { formatIDR } from "@/lib/data";
import { RatingStars } from "@/components/shared/RatingStars";
import { cn } from "@/lib/utils";

interface VillaCardProps {
  villa: Villa;
  className?: string;
}

export function VillaCard({ villa, className }: VillaCardProps) {
  const { navigate } = useAppStore();

  const handleViewDetails = () => {
    navigate("villa-detail", { villaId: villa.id });
  };

  return (
    <article
      onClick={handleViewDetails}
      className={cn(
        "group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/60 transition-all duration-300 cursor-pointer hover:shadow-premium-hover hover:-translate-y-1",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={villa.images[0]?.url}
          alt={villa.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Featured badge */}
        {villa.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/95 text-background text-xs font-semibold backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-md">
          <div className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider">
            from
          </div>
          <div className="text-sm font-bold text-foreground leading-tight mt-0.5">
            {formatIDR(villa.pricePerNight)}
            <span className="text-[10px] font-normal text-muted-foreground ml-1">
              /night
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>{villa.location}, Bali</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {villa.name}
          </h3>
          <RatingStars rating={villa.rating} reviewCount={villa.reviewCount} size="sm" />
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-y border-border/40 py-3">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-sage" />
            <span>{villa.maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-sage" />
            <span>{villa.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-sage" />
            <span>{villa.bathrooms} baths</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {villa.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="px-2 py-0.5 text-[10px] rounded-md bg-secondary/70 text-secondary-foreground font-medium"
            >
              {a}
            </span>
          ))}
          {villa.amenities.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] rounded-md bg-muted text-muted-foreground font-medium">
              +{villa.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            {villa.amenities.includes("Private Swimming Pool") && (
              <span className="flex items-center gap-1 text-primary font-medium">
                <Waves className="w-3.5 h-3.5" /> Private Pool
              </span>
            )}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
