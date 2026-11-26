"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Shield,
  Landmark,
  Smartphone,
  QrCode,
  CreditCard,
  Check,
  Copy,
  Clock,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  getVillaById,
  formatIDR,
  formatDate,
  calculateNights,
  calculateBookingCost,
  generateBookingCode,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof Landmark;
}[] = [
  {
    id: "BANK_TRANSFER",
    label: "Bank Transfer",
    description: "Transfer to our BCA/Mandiri account (1-2 hours verification)",
    icon: Landmark,
  },
  {
    id: "VIRTUAL_ACCOUNT",
    label: "Virtual Account",
    description: "Get a unique VA number for instant verification",
    icon: Smartphone,
  },
  {
    id: "QRIS",
    label: "QRIS",
    description: "Scan with any Indonesian e-wallet (GoPay, OVO, Dana, ShopeePay)",
    icon: QrCode,
  },
  {
    id: "CARD",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, JCB (secure 3D-Secure verification)",
    icon: CreditCard,
  },
];

export function PaymentPage() {
  const {
    selectedVillaId,
    bookingDraft,
    setBookingDraft,
    navigate,
    user,
    addBooking,
    setConfirmedBooking,
  } = useAppStore();
  const villa = getVillaById(selectedVillaId || "");
  const [method, setMethod] = useState<PaymentMethod>("QRIS");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!villa || !bookingDraft.checkIn || !bookingDraft.checkOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">No booking in progress</h2>
          <p className="text-muted-foreground mb-6">
            Please start a booking from a villa detail page.
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

  const handlePay = async () => {
    if (method === "CARD") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
        toast.error("Please complete all card details.");
        return;
      }
      if (cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Invalid card number.");
        return;
      }
    }

    setProcessing(true);
    setBookingDraft({ paymentMethod: method });

    // Simulate payment processing (real integration would call payment gateway)
    await new Promise((r) => setTimeout(r, 1800));

    const bookingCode = generateBookingCode();
    const newBooking = {
      id: `bk-${Date.now()}`,
      bookingCode,
      userId: user?.id,
      villaId: villa.id,
      villa,
      checkIn: bookingDraft.checkIn,
      checkOut: bookingDraft.checkOut,
      nights,
      guests: bookingDraft.guests,
      pricePerNight: villa.pricePerNight,
      subtotal: costs.subtotal,
      taxes: costs.taxes,
      serviceFee: costs.serviceFee,
      totalAmount: costs.total,
      status: "CONFIRMED" as const,
      guestName: bookingDraft.guestName,
      guestEmail: bookingDraft.guestEmail,
      guestPhone: bookingDraft.guestPhone,
      specialRequest: bookingDraft.specialRequest,
      paymentMethod: method,
      paymentStatus: "PAID" as const,
      createdAt: new Date().toISOString(),
    };

    addBooking(newBooking);
    setConfirmedBooking(newBooking);
    setProcessing(false);
    toast.success("Payment successful! Your booking is confirmed.");
    navigate("booking-confirmation");
  };

  const vaNumber = "8800" + Math.random().toString().slice(2, 12);

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <div className="bg-background border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
          <button
            onClick={() => navigate("booking")}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to booking details
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Payment</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trust badge */}
            <div className="flex items-center gap-3 p-4 bg-sage-light/40 rounded-xl border border-sage/30">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Secured Payment Gateway</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted with 256-bit SSL and processed via
                  a PCI-DSS compliant gateway.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-sm border border-border/60 p-6 sm:p-8">
              <h2 className="font-serif text-xl font-bold mb-1">Choose payment method</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Select your preferred way to pay.
              </p>

              <RadioGroup
                value={method}
                onValueChange={(v) => setMethod(v as PaymentMethod)}
                className="space-y-3"
              >
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    htmlFor={m.id}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      method === m.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-muted/40",
                    )}
                  >
                    <RadioGroupItem value={m.id} id={m.id} className="mt-1" />
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{m.label}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              {/* Method-specific details */}
              <div className="mt-6">
                {method === "BANK_TRANSFER" && (
                  <div className="p-5 rounded-xl bg-cream/60 border border-border/40 space-y-3">
                    <h3 className="font-semibold text-sm">Bank Transfer Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Bank</span>
                        <span className="font-medium">Bank Central Asia (BCA)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Name</span>
                        <span className="font-medium">PT Bali Haven Luxury</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium font-mono">0123456789</span>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText("0123456789");
                              toast.success("Account number copied");
                            }}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-bold text-primary">{formatIDR(costs.total)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40">
                      <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>
                        Please complete transfer within 24 hours. Booking will be confirmed
                        after verification (typically 1-2 hours).
                      </span>
                    </div>
                  </div>
                )}

                {method === "VIRTUAL_ACCOUNT" && (
                  <div className="p-5 rounded-xl bg-cream/60 border border-border/40 space-y-3">
                    <h3 className="font-semibold text-sm">Your Virtual Account Number</h3>
                    <p className="text-xs text-muted-foreground">
                      Use this unique VA number to pay via any bank&apos;s ATM, mobile banking,
                      or internet banking. Payment is verified instantly.
                    </p>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <span className="font-mono text-lg font-bold tracking-wider">
                        {vaNumber}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(vaNumber);
                          toast.success("VA number copied");
                        }}
                        className="p-2 hover:bg-muted rounded"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-muted-foreground">Amount due</span>
                      <span className="font-bold text-primary">{formatIDR(costs.total)}</span>
                    </div>
                  </div>
                )}

                {method === "QRIS" && (
                  <div className="p-5 rounded-xl bg-cream/60 border border-border/40 space-y-4">
                    <h3 className="font-semibold text-sm">Scan QRIS Code</h3>
                    <p className="text-xs text-muted-foreground">
                      Open any Indonesian e-wallet (GoPay, OVO, Dana, ShopeePay) or mobile
                      banking app and scan this QR code.
                    </p>
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="w-48 h-48 bg-white p-3 rounded-xl border border-border">
                        {/* Simulated QR code */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect width="100" height="100" fill="white" />
                          {Array.from({ length: 12 }, (_, i) =>
                            Array.from({ length: 12 }, (_, j) => {
                              const seed = (i * 7 + j * 13 + 3) % 4;
                              const isCorner =
                                (i < 4 && j < 4) ||
                                (i < 4 && j > 7) ||
                                (i > 7 && j < 4);
                              if (isCorner) {
                                const isInner =
                                  (i === 1 || i === 2) && (j === 1 || j === 2) ||
                                  (i === 1 || i === 2) && (j === 9 || j === 10) ||
                                  (i === 9 || i === 10) && (j === 1 || j === 2);
                                return (
                                  <rect
                                    key={`${i}-${j}`}
                                    x={i * 8 + 2}
                                    y={j * 8 + 2}
                                    width="8"
                                    height="8"
                                    fill={isInner ? "white" : "black"}
                                  />
                                );
                              }
                              return seed === 0 ? (
                                <rect
                                  key={`${i}-${j}`}
                                  x={i * 8 + 2}
                                  y={j * 8 + 2}
                                  width="8"
                                  height="8"
                                  fill="black"
                                />
                              ) : null;
                            }),
                          )}
                        </svg>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Amount: <strong className="text-foreground">{formatIDR(costs.total)}</strong>
                      </p>
                    </div>
                  </div>
                )}

                {method === "CARD" && (
                  <div className="p-5 rounded-xl bg-cream/60 border border-border/40 space-y-4">
                    <h3 className="font-semibold text-sm">Card Details</h3>
                    <div>
                      <Label htmlFor="card-number" className="text-xs">
                        Card Number
                      </Label>
                      <Input
                        id="card-number"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        maxLength={19}
                        onChange={(e) => {
                          const v = e.target.value
                            .replace(/\s/g, "")
                            .replace(/(\d{4})/g, "$1 ")
                            .trim();
                          setCardNumber(v);
                        }}
                        className="mt-1 font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-name" className="text-xs">
                        Cardholder Name
                      </Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="card-expiry" className="text-xs">
                          Expiry (MM/YY)
                        </Label>
                        <Input
                          id="card-expiry"
                          placeholder="12/28"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, "");
                            if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                            setCardExpiry(v);
                          }}
                          className="mt-1 font-mono"
                        />
                      </div>
                      <div>
                        <Label htmlFor="card-cvc" className="text-xs">
                          CVC
                        </Label>
                        <Input
                          id="card-cvc"
                          placeholder="123"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                          className="mt-1 font-mono"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                      <Lock className="w-3 h-3" /> This is a demo. No real payment will be processed.
                    </p>
                  </div>
                )}
              </div>

              <Button
                onClick={handlePay}
                disabled={processing}
                className="w-full mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" /> Pay {formatIDR(costs.total)}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar: booking summary */}
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

              <div className="border-t border-border pt-4 space-y-2 text-sm">
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

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatIDR(villa.pricePerNight)} x {nights}
                  </span>
                  <span>{formatIDR(costs.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>{formatIDR(costs.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>{formatIDR(costs.taxes)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatIDR(costs.total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
