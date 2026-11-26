"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  User as UserIcon,
  Mail,
  Phone,
  MessageSquare,
  Lock,
  Info,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  getVillaById,
  formatIDR,
  formatDate,
  calculateNights,
  calculateBookingCost,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STEPS = ["Dates & Guests", "Guest Information", "Review & Confirm"] as const;

export function BookingPage() {
  const {
    selectedVillaId,
    bookingDraft,
    setBookingDraft,
    navigate,
    user,
    addBooking,
  } = useAppStore();
  const villa = getVillaById(selectedVillaId || "");
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">No villa selected</h2>
          <p className="text-muted-foreground mb-6">
            Please choose a villa to start booking.
          </p>
          <Button
            onClick={() => navigate("explore")}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Browse Villas
          </Button>
        </div>
      </div>
    );
  }

  const nights = calculateNights(bookingDraft.checkIn, bookingDraft.checkOut);
  const costs = calculateBookingCost(villa.pricePerNight, nights);

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!bookingDraft.checkIn) errs.checkIn = "Check-in date is required";
      if (!bookingDraft.checkOut) errs.checkOut = "Check-out date is required";
      if (bookingDraft.checkIn && bookingDraft.checkOut && nights <= 0)
        errs.checkOut = "Check-out must be after check-in";
      if (bookingDraft.guests > villa.maxGuests)
        errs.guests = `Maximum ${villa.maxGuests} guests for this villa`;
    }
    if (s === 1) {
      if (!bookingDraft.guestName.trim()) errs.guestName = "Full name is required";
      if (!bookingDraft.guestEmail.trim()) errs.guestEmail = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingDraft.guestEmail))
        errs.guestEmail = "Invalid email format";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = () => {
    if (!validateStep(1)) {
      toast.error("Please complete your information first.");
      return;
    }
    navigate("payment");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <div className="bg-background border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
          <button
            onClick={() => navigate("villa-detail", { villaId: villa.id })}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {villa.name}
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Complete Your Booking</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                    i < step && "bg-primary text-primary-foreground",
                    i === step && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    i > step && "bg-muted text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center max-w-[80px]",
                    i === step ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 -mt-6 transition-all",
                    i < step ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-sm border border-border/60 p-6 sm:p-8">
              {/* Step 0: Dates & Guests */}
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold mb-1">Choose your dates</h2>
                    <p className="text-sm text-muted-foreground">
                      Select check-in and check-out dates for your stay.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="b-checkin" className="flex items-center gap-1.5 mb-2">
                        <Calendar className="w-4 h-4" /> Check-in
                      </Label>
                      <Input
                        id="b-checkin"
                        type="date"
                        min={today}
                        value={bookingDraft.checkIn}
                        onChange={(e) => setBookingDraft({ checkIn: e.target.value })}
                      />
                      {errors.checkIn && (
                        <p className="text-xs text-destructive mt-1">{errors.checkIn}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="b-checkout" className="flex items-center gap-1.5 mb-2">
                        <Calendar className="w-4 h-4" /> Check-out
                      </Label>
                      <Input
                        id="b-checkout"
                        type="date"
                        min={bookingDraft.checkIn || today}
                        value={bookingDraft.checkOut}
                        onChange={(e) => setBookingDraft({ checkOut: e.target.value })}
                      />
                      {errors.checkOut && (
                        <p className="text-xs text-destructive mt-1">{errors.checkOut}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="b-guests" className="flex items-center gap-1.5 mb-2">
                      <Users className="w-4 h-4" /> Number of Guests
                    </Label>
                    <select
                      id="b-guests"
                      value={bookingDraft.guests}
                      onChange={(e) => setBookingDraft({ guests: parseInt(e.target.value) })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      {Array.from({ length: villa.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p className="text-xs text-destructive mt-1">{errors.guests}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      This villa can accommodate up to {villa.maxGuests} guests.
                    </p>
                  </div>

                  {nights > 0 && (
                    <div className="p-4 bg-sage-light/50 rounded-xl border border-sage/30">
                      <div className="flex items-center gap-2 text-sm">
                        <Info className="w-4 h-4 text-primary" />
                        <span>
                          Your stay:{" "}
                          <strong>{formatDate(bookingDraft.checkIn)}</strong> to{" "}
                          <strong>{formatDate(bookingDraft.checkOut)}</strong> ({nights}{" "}
                          {nights === 1 ? "night" : "nights"})
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 1: Guest Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold mb-1">Guest information</h2>
                    <p className="text-sm text-muted-foreground">
                      Provide the main guest&apos;s contact details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="g-name" className="flex items-center gap-1.5 mb-2">
                        <UserIcon className="w-4 h-4" /> Full Name *
                      </Label>
                      <Input
                        id="g-name"
                        placeholder="John Doe"
                        value={bookingDraft.guestName}
                        onChange={(e) => setBookingDraft({ guestName: e.target.value })}
                      />
                      {errors.guestName && (
                        <p className="text-xs text-destructive mt-1">{errors.guestName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="g-email" className="flex items-center gap-1.5 mb-2">
                        <Mail className="w-4 h-4" /> Email *
                      </Label>
                      <Input
                        id="g-email"
                        type="email"
                        placeholder="john@example.com"
                        value={bookingDraft.guestEmail}
                        onChange={(e) => setBookingDraft({ guestEmail: e.target.value })}
                      />
                      {errors.guestEmail && (
                        <p className="text-xs text-destructive mt-1">{errors.guestEmail}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="g-phone" className="flex items-center gap-1.5 mb-2">
                        <Phone className="w-4 h-4" /> Phone
                      </Label>
                      <Input
                        id="g-phone"
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        value={bookingDraft.guestPhone}
                        onChange={(e) => setBookingDraft({ guestPhone: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="g-req" className="flex items-center gap-1.5 mb-2">
                        <MessageSquare className="w-4 h-4" /> Special Requests
                      </Label>
                      <Textarea
                        id="g-req"
                        placeholder="Airport transfer, dietary preferences, celebration setup, etc."
                        value={bookingDraft.specialRequest}
                        onChange={(e) => setBookingDraft({ specialRequest: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  {user && (
                    <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                      Logged in as <strong>{user.email}</strong>. Your booking will be linked to your account.
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold mb-1">Review your booking</h2>
                    <p className="text-sm text-muted-foreground">
                      Please confirm all details before proceeding to payment.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-cream/50 border border-border/40">
                      <h3 className="font-semibold text-sm mb-3">Stay Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check-in</span>
                          <span className="font-medium">{formatDate(bookingDraft.checkIn)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check-out</span>
                          <span className="font-medium">{formatDate(bookingDraft.checkOut)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nights</span>
                          <span className="font-medium">{nights}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Guests</span>
                          <span className="font-medium">
                            {bookingDraft.guests} {bookingDraft.guests === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cream/50 border border-border/40">
                      <h3 className="font-semibold text-sm mb-3">Guest Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span className="font-medium">{bookingDraft.guestName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium">{bookingDraft.guestEmail}</span>
                        </div>
                        {bookingDraft.guestPhone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone</span>
                            <span className="font-medium">{bookingDraft.guestPhone}</span>
                          </div>
                        )}
                        {bookingDraft.specialRequest && (
                          <div className="pt-2 border-t border-border/40 mt-2">
                            <span className="text-muted-foreground">Special Request</span>
                            <p className="mt-1">{bookingDraft.specialRequest}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cream/50 border border-border/40">
                      <h3 className="font-semibold text-sm mb-3">Price Breakdown</h3>
                      <div className="space-y-2 text-sm">
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
                        <div className="flex justify-between font-semibold text-base pt-2 border-t border-border/60 mt-2">
                          <span>Total</span>
                          <span>{formatIDR(costs.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-4 bg-sage-light/40 rounded-xl text-xs text-foreground/80">
                    <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                      By proceeding to payment, you agree to Bali Haven&apos;s Terms of Service
                      and Cancellation Policy. Free cancellation up to 7 days before check-in.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="rounded-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleConfirm}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Proceed to Payment <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: villa summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl shadow-sm border border-border/60 p-5 space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={villa.images[0]?.url}
                  alt={villa.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold leading-snug">{villa.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{villa.location}, Bali</p>
              </div>
              {nights > 0 && (
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatIDR(costs.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fees & taxes</span>
                    <span>{formatIDR(costs.serviceFee + costs.taxes)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatIDR(costs.total)}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
