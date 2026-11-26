"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  Bed,
  Bath,
  Users,
  Check,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  getVillaById,
  getReviewsByVilla,
  formatIDR,
  formatDate,
  calculateNights,
  calculateBookingCost,
} from "@/lib/data";
import { RatingStars } from "@/components/shared/RatingStars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function VillaDetailPage() {
  const { selectedVillaId, navigate, bookingDraft, setBookingDraft, user } = useAppStore();
  const villa = getVillaById(selectedVillaId || "");
  const [activeImage, setActiveImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Villa not found</h2>
          <p className="text-muted-foreground mb-6">
            The villa you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => navigate("explore")}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const reviews = getReviewsByVilla(villa.id);
  const today = new Date().toISOString().split("T")[0];

  // Booking form state - initialize from draft
  const checkIn = bookingDraft.checkIn || "";
  const checkOut = bookingDraft.checkOut || "";
  const guests = bookingDraft.guests || 1;

  const nights = calculateNights(checkIn, checkOut);
  const costs = calculateBookingCost(villa.pricePerNight, nights);

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    if (nights <= 0) {
      toast.error("Check-out date must be after check-in date.");
      return;
    }
    if (guests > villa.maxGuests) {
      toast.error(`This villa accommodates up to ${villa.maxGuests} guests.`);
      return;
    }
    setBookingDraft({
      villaId: villa.id,
      checkIn,
      checkOut,
      guests,
      guestName: user?.name || "",
      guestEmail: user?.email || "",
    });
    navigate("booking");
  };

  const shareVilla = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: villa.name, text: villa.description, url: window.location.href })
        .catch(() => {});
    } else {
      toast.success("Villa details copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40 bg-cream/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => navigate("home")} className="hover:text-primary">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate("explore")} className="hover:text-primary">
              Villas
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">{villa.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{villa.location}, Bali, Indonesia</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              {villa.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <RatingStars rating={villa.rating} reviewCount={villa.reviewCount} size="md" />
              {villa.featured && (
                <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
                  Featured Villa
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareVilla}
              className="rounded-full"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Heart className="w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-8 rounded-2xl overflow-hidden">
          {/* Main image */}
          <button
            onClick={() => setShowGallery(true)}
            className="lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto relative overflow-hidden group"
          >
            <img
              src={villa.images[0]?.url}
              alt={villa.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
          {/* Thumbnails */}
          {villa.images.slice(1, 5).map((img, i) => (
            <button
              key={img.id}
              onClick={() => {
                setActiveImage(i + 1);
                setShowGallery(true);
              }}
              className="aspect-[4/3] relative overflow-hidden group hidden sm:block"
            >
              <img
                src={img.url}
                alt={img.caption || villa.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {i === 3 && villa.images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                  +{villa.images.length - 5} photos
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-cream rounded-2xl border border-border/40">
              {[
                { icon: Users, label: "Max Guests", value: villa.maxGuests },
                { icon: Bed, label: "Bedrooms", value: villa.bedrooms },
                { icon: Bath, label: "Bathrooms", value: villa.bathrooms },
                { icon: Star, label: "Rating", value: villa.rating.toFixed(1) },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">
                About this villa
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                {villa.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">
                What this villa offers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {villa.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/40"
                  >
                    <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">
                Where you&apos;ll be
              </h2>
              <div className="rounded-2xl overflow-hidden border border-border/40 aspect-[16/9] relative bg-muted">
                <iframe
                  title="Villa location"
                  width="100%"
                  height="100%"
                  className="border-0"
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${(villa.longitude ?? 115.18) - 0.02}%2C${(villa.latitude ?? -8.65) - 0.02}%2C${(villa.longitude ?? 115.18) + 0.02}%2C${(villa.latitude ?? -8.65) + 0.02}&layer=mapnik&marker=${villa.latitude ?? -8.65}%2C${villa.longitude ?? 115.18}`}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {villa.address || `${villa.location}, Bali, Indonesia`}
              </p>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-bold">
                  Guest Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-current" />
                  <span className="font-semibold">{villa.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">
                    ({villa.reviewCount} reviews)
                  </span>
                </div>
              </div>
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="p-5 rounded-xl border border-border/40 bg-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-semibold text-primary">
                            {r.authorName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{r.authorName}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(r.createdAt)}
                            </div>
                          </div>
                        </div>
                        <RatingStars rating={r.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}
            </section>
          </div>

          {/* Right: Booking form */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl shadow-premium border border-border/60 p-6 space-y-5">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl font-bold">
                    {formatIDR(villa.pricePerNight)}
                  </span>
                  <span className="text-sm text-muted-foreground">/ night</span>
                </div>
                <RatingStars
                  rating={villa.rating}
                  reviewCount={villa.reviewCount}
                  size="sm"
                />
              </div>

              <div className="border-t border-border pt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="check-in" className="text-xs uppercase tracking-wider font-semibold">
                      Check-in
                    </Label>
                    <Input
                      id="check-in"
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setBookingDraft({ checkIn: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-out" className="text-xs uppercase tracking-wider font-semibold">
                      Check-out
                    </Label>
                    <Input
                      id="check-out"
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setBookingDraft({ checkOut: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="text-xs uppercase tracking-wider font-semibold">
                    Guests
                  </Label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setBookingDraft({ guests: parseInt(e.target.value) })}
                    className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {Array.from({ length: villa.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {nights > 0 ? (
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {formatIDR(villa.pricePerNight)} x {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <span>{formatIDR(costs.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee (5%)</span>
                    <span>{formatIDR(costs.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes (11%)</span>
                    <span>{formatIDR(costs.taxes)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatIDR(costs.total)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-2 border-t border-border">
                  Select dates to see pricing
                </p>
              )}

              <Button
                onClick={handleReserve}
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
              >
                Reserve Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You won&apos;t be charged yet. Free cancellation up to 7 days before check-in.
              </p>
            </div>
          </aside>
        </div>

        {/* Back button */}
        <div className="mt-12">
          <Button
            variant="ghost"
            onClick={() => navigate("explore")}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all villas
          </Button>
        </div>
      </div>

      {/* Lightbox gallery */}
      {showGallery && (
        <div className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((i) => (i - 1 + villa.images.length) % villa.images.length);
            }}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full">
            <img
              src={villa.images[activeImage]?.url}
              alt={villa.images[activeImage]?.caption || villa.name}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
            />
            <p className="text-center text-white/80 text-sm mt-4">
              {villa.images[activeImage]?.caption} ({activeImage + 1} / {villa.images.length})
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((i) => (i + 1) % villa.images.length);
            }}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
