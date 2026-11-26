"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
  Bed,
  Bath,
  Users,
  Star,
} from "lucide-react";
import { VILLAS, formatIDR } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { ALL_AMENITIES, DESTINATIONS } from "@/lib/types";
import { VillaCard } from "@/components/explore/VillaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MAX_PRICE = 10000000;

export function ExplorePage() {
  const { filters, setFilters, resetFilters, navigate, selectedDestination } = useAppStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync destination from navigation
  const activeDestination = selectedDestination
    ? DESTINATIONS.find((d) => d.slug === selectedDestination)?.name
    : filters.destination;

  const filteredVillas = useMemo(() => {
    let result = [...VILLAS].filter((v) => v.active);

    if (activeDestination) {
      result = result.filter(
        (v) => v.location.toLowerCase() === activeDestination.toLowerCase(),
      );
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q),
      );
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((v) => v.pricePerNight >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((v) => v.pricePerNight <= filters.maxPrice!);
    }
    if (filters.guests) {
      result = result.filter((v) => v.maxGuests >= filters.guests!);
    }
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter((v) =>
        filters.amenities!.every((a) => v.amenities.includes(a)),
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [filters, activeDestination]);

  const priceRange: [number, number] = [
    filters.minPrice ?? 0,
    filters.maxPrice ?? MAX_PRICE,
  ];

  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities ?? [];
    if (current.includes(amenity)) {
      setFilters({ amenities: current.filter((a) => a !== amenity) });
    } else {
      setFilters({ amenities: [...current, amenity] });
    }
  };

  const activeFilterCount = [
    filters.destination,
    filters.minPrice !== undefined && filters.minPrice > 0 ? "price" : null,
    filters.maxPrice !== undefined && filters.maxPrice < MAX_PRICE ? "price" : null,
    filters.guests ? "guests" : null,
    filters.amenities && filters.amenities.length > 0 ? "amenities" : null,
    filters.query,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-cream border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              {activeDestination ? `${activeDestination} Collection` : "All Villas"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              {activeDestination
                ? `Villas in ${activeDestination}`
                : "Explore Our Villa Collection"}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {activeDestination
                ? DESTINATIONS.find((d) => d.name === activeDestination)?.description
                : "Discover handpicked luxury villas across Bali's most coveted destinations. Filter by price, amenities, and guest capacity to find your perfect stay."}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Search & sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search villa by name or location..."
              value={filters.query ?? ""}
              onChange={(e) => setFilters({ query: e.target.value })}
              className="pl-10 rounded-full"
            />
          </div>
          <Select
            value={filters.sortBy ?? "rating"}
            onValueChange={(v) =>
              setFilters({ sortBy: v as typeof filters.sortBy })
            }
          >
            <SelectTrigger className="w-full sm:w-[200px] rounded-full">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="rounded-full lg:hidden"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop filters sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                priceRange={priceRange}
                toggleAmenity={toggleAmenity}
                activeDestination={activeDestination}
                onClearDestination={() => navigate("explore", {})}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredVillas.length}
                </span>{" "}
                {filteredVillas.length === 1 ? "villa" : "villas"} found
              </p>
            </div>

            {filteredVillas.length === 0 ? (
              <div className="text-center py-20 bg-cream/50 rounded-2xl">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  No villas match your filters
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your search criteria or clearing filters.
                </p>
                <Button
                  onClick={() => {
                    resetFilters();
                    navigate("explore", {});
                  }}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVillas.map((villa) => (
                  <VillaCard key={villa.id} villa={villa} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background overflow-y-auto animate-fade-up">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                priceRange={priceRange}
                toggleAmenity={toggleAmenity}
                activeDestination={activeDestination}
                onClearDestination={() => navigate("explore", {})}
              />
            </div>
            <div className="sticky bottom-0 bg-background border-t border-border p-4">
              <Button
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setShowMobileFilters(false)}
              >
                Show {filteredVillas.length} Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FiltersPanelProps {
  filters: ReturnType<typeof useAppStore.getState>["filters"];
  setFilters: ReturnType<typeof useAppStore.getState>["setFilters"];
  resetFilters: ReturnType<typeof useAppStore.getState>["resetFilters"];
  priceRange: [number, number];
  toggleAmenity: (a: string) => void;
  activeDestination?: string;
  onClearDestination: () => void;
}

function FiltersPanel({
  filters,
  setFilters,
  resetFilters,
  priceRange,
  toggleAmenity,
  activeDestination,
  onClearDestination,
}: FiltersPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold">Filters</h3>
        <button
          onClick={() => {
            resetFilters();
            if (activeDestination) onClearDestination();
          }}
          className="text-xs text-primary hover:underline font-medium"
        >
          Reset all
        </button>
      </div>

      {/* Destination */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Destination
        </Label>
        <Select
          value={filters.destination ?? activeDestination ?? ""}
          onValueChange={(v) => setFilters({ destination: v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All destinations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All destinations</SelectItem>
            {DESTINATIONS.map((d) => (
              <SelectItem key={d.slug} value={d.name}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            Price Range
          </Label>
          <span className="text-xs text-muted-foreground">
            per night
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(v) =>
              setFilters({
                minPrice: v[0] === 0 ? undefined : v[0],
                maxPrice: v[1] === MAX_PRICE ? undefined : v[1],
              })
            }
            min={0}
            max={MAX_PRICE}
            step={500000}
            className="my-4"
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">
            {formatIDR(priceRange[0])}
          </span>
          <span className="font-medium">
            {priceRange[1] === MAX_PRICE ? `${formatIDR(MAX_PRICE)}+` : formatIDR(priceRange[1])}
          </span>
        </div>
      </div>

      {/* Guests */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Guests
        </Label>
        <Select
          value={filters.guests?.toString() ?? "any"}
          onValueChange={(v) =>
            setFilters({ guests: v === "any" ? undefined : parseInt(v) })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}+ {n === 1 ? "guest" : "guests"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Amenities
        </Label>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((a) => (
            <div key={a} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${a}`}
                checked={filters.amenities?.includes(a) ?? false}
                onCheckedChange={() => toggleAmenity(a)}
              />
              <label
                htmlFor={`amenity-${a}`}
                className="text-sm cursor-pointer leading-tight"
              >
                {a}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
