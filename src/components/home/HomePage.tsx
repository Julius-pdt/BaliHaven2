"use client";

import { Hero } from "./Hero";
import { FeaturedVillas } from "./FeaturedVillas";
import { DestinationsPreview } from "./DestinationsPreview";
import { WhyChooseUs } from "./WhyChooseUs";
import { Testimonials } from "./Testimonials";
import { NewsletterCTA } from "./NewsletterCTA";

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedVillas />
      <DestinationsPreview />
      <WhyChooseUs />
      <Testimonials />
      <NewsletterCTA />
    </div>
  );
}
