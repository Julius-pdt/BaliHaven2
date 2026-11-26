"use client";

import {
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Mail,
  Download,
  Home,
  CalendarCheck,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatIDR, formatDate } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BookingConfirmationPage() {
  const { confirmedBooking, navigate, user } = useAppStore();

  if (!confirmedBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">No booking to confirm</h2>
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

  const b = confirmedBooking;

  return (
    <div className="min-h-screen bg-cream/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4 animate-fade-up">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3 animate-fade-up">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground mb-2 animate-fade-up">
            Thank you, <strong className="text-foreground">{b.guestName}</strong>. Your
            luxury escape is booked.
          </p>
          <p className="text-sm text-muted-foreground animate-fade-up">
            A confirmation email has been sent to{" "}
            <strong className="text-foreground">{b.guestEmail}</strong>
          </p>
        </div>

        {/* Booking details card */}
        <div className="bg-card rounded-2xl shadow-premium border border-border/60 overflow-hidden">
          {/* Booking code banner */}
          <div className="bg-primary text-primary-foreground px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">Booking ID</div>
              <div className="font-mono text-xl font-bold">{b.bookingCode}</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-primary-foreground/15 backdrop-blur-sm">
                Status: {b.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-foreground/15 backdrop-blur-sm">
                Payment: {b.paymentStatus}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Villa info */}
            {b.villa && (
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={b.villa.images[0]?.url}
                    alt={b.villa.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold">{b.villa.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {b.villa.location}, Bali
                  </p>
                </div>
              </div>
            )}

            {/* Stay details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-cream/50 rounded-xl border border-border/40">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Check-in
                </div>
                <div className="font-semibold text-sm">{formatDate(b.checkIn)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Check-out
                </div>
                <div className="font-semibold text-sm">{formatDate(b.checkOut)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Users className="w-3 h-3" /> Guests
                </div>
                <div className="font-semibold text-sm">
                  {b.guests} {b.guests === 1 ? "Guest" : "Guests"} - {b.nights} {b.nights === 1 ? "Night" : "Nights"}
                </div>
              </div>
            </div>

            {/* Price summary */}
            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({b.nights} {b.nights === 1 ? "night" : "nights"})
                </span>
                <span>{formatIDR(b.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>{formatIDR(b.serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>{formatIDR(b.taxes)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                <span>Total Paid</span>
                <span className="text-primary">{formatIDR(b.totalAmount)}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">
                {b.paymentMethod === "BANK_TRANSFER" && "Bank Transfer"}
                {b.paymentMethod === "VIRTUAL_ACCOUNT" && "Virtual Account"}
                {b.paymentMethod === "QRIS" && "QRIS"}
                {b.paymentMethod === "CARD" && "Credit/Debit Card"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              toast.info("Booking invoice download started (demo).");
              window.print();
            }}
          >
            <Download className="w-4 h-4 mr-2" /> Download Invoice
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => navigate("home")}
          >
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <Button
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate(user ? "user-dashboard" : "explore")}
          >
            <CalendarCheck className="w-4 h-4 mr-2" /> View My Bookings
          </Button>
        </div>

        {/* What's next */}
        <div className="mt-8 p-6 rounded-2xl bg-sage-light/40 border border-sage/30">
          <h3 className="font-serif text-lg font-semibold mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>You&apos;ll receive a detailed confirmation email with check-in instructions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CalendarCheck className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Our concierge team will contact you 7 days before arrival to arrange airport transfer and any special requests.</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Villa address and contact details will be shared 48 hours before check-in.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
