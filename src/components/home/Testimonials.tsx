"use client";

import { Quote } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { RatingStars } from "@/components/shared/RatingStars";

const TESTIMONIALS = [
  {
    name: "Sarah & David Mitchell",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    villa: "Jungle Sanctuary Villa, Ubud",
    rating: 5,
    text: "Our stay exceeded every expectation. The villa was even more beautiful than the photos, and the staff anticipated our every need. We&apos;ve already booked our return trip. Bali Haven made everything seamless.",
  },
  {
    name: "Tanaka Family",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    villa: "Royal Seminyak Estate",
    rating: 5,
    text: "Traveling with three generations, we needed space and comfort. The estate was perfect - private pool for the kids, peaceful gardens for the grandparents, and walking distance to everything. Impeccable service.",
  },
  {
    name: "Marcus & Elena Lindberg",
    location: "Stockholm, Sweden",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    villa: "Uluwatu Cliffside Retreat",
    rating: 5,
    text: "The views are otherworldly. Waking up to the sound of the ocean and watching the sunset from our infinity pool was pure magic. Bali Haven&apos;s concierge arranged the most incredible private dinner.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Guest Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Loved by Travelers Worldwide
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto leading-relaxed">
            Over 15,000 guests have discovered their Bali paradise with us.
            Here&apos;s what some of them had to say.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="h-full bg-background/5 backdrop-blur-sm rounded-2xl p-6 border border-background/10 flex flex-col">
                <Quote className="w-8 h-8 text-gold mb-4 opacity-60" />
                <RatingStars rating={t.rating} size="sm" showValue={false} className="mb-3" />
                <p className="text-sm leading-relaxed opacity-90 flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-background/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs opacity-70">{t.location}</div>
                    <div className="text-xs text-gold mt-0.5">{t.villa}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
