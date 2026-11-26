"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users, ChevronRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Hero() {
  const { searchForm, setSearchForm, submitSearch } = useAppStore();
  const [focused, setFocused] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    submitSearch();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=2400&q=80"
          alt="Luxury Bali villa with private swimming pool"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase">
              Curated Luxury Villas in Bali
            </span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            Discover Your Private
            <br />
            <span className="text-gold italic">Paradise</span> in Bali
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            Experience unforgettable stays in handpicked luxury villas across the Island of Gods.
            Private pools, tropical gardens, and impeccable service await.
          </p>
        </div>

        {/* Search Booking Bar */}
        <div
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 max-w-5xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Destination */}
            <div
              className={cn(
                "relative rounded-xl px-4 py-3 transition-all cursor-pointer group",
                focused === "destination"
                  ? "bg-muted ring-2 ring-primary/30"
                  : "hover:bg-muted/60",
              )}
              onClick={() => setFocused("destination")}
              onBlur={() => setFocused(null)}
            >
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3" /> Destination
              </label>
              <select
                value={searchForm.destination}
                onChange={(e) => setSearchForm({ destination: e.target.value })}
                className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
              >
                <option value="">All destinations</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-in */}
            <div
              className={cn(
                "relative rounded-xl px-4 py-3 transition-all cursor-pointer group",
                focused === "checkIn"
                  ? "bg-muted ring-2 ring-primary/30"
                  : "hover:bg-muted/60",
              )}
              onClick={() => setFocused("checkIn")}
              onBlur={() => setFocused(null)}
            >
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3" /> Check-in
              </label>
              <input
                type="date"
                min={today}
                value={searchForm.checkIn}
                onChange={(e) => setSearchForm({ checkIn: e.target.value })}
                className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div
              className={cn(
                "relative rounded-xl px-4 py-3 transition-all cursor-pointer group",
                focused === "checkOut"
                  ? "bg-muted ring-2 ring-primary/30"
                  : "hover:bg-muted/60",
              )}
              onClick={() => setFocused("checkOut")}
              onBlur={() => setFocused(null)}
            >
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3" /> Check-out
              </label>
              <input
                type="date"
                min={searchForm.checkIn || today}
                value={searchForm.checkOut}
                onChange={(e) => setSearchForm({ checkOut: e.target.value })}
                className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div
              className={cn(
                "relative rounded-xl px-4 py-3 transition-all cursor-pointer group",
                focused === "guests"
                  ? "bg-muted ring-2 ring-primary/30"
                  : "hover:bg-muted/60",
              )}
              onClick={() => setFocused("guests")}
              onBlur={() => setFocused(null)}
            >
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <Users className="w-3 h-3" /> Guests
              </label>
              <select
                value={searchForm.guests}
                onChange={(e) => setSearchForm({ guests: e.target.value })}
                className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n.toString()}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
                <option value="13">13+ Guests</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mt-3 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Search Villas
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12 text-center text-white animate-fade-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          {[
            { value: "120+", label: "Luxury Villas" },
            { value: "6", label: "Premier Destinations" },
            { value: "15K+", label: "Happy Guests" },
          ].map((stat, i) => (
            <div key={i} className="px-2">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/70 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-white/80 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
