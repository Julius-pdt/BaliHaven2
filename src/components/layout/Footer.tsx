"use client";

import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS } from "@/lib/types";

export function Footer() {
  const { navigate } = useAppStore();

  return (
    <footer className="mt-auto bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                  <path d="M12 2C9 6 7 9 7 13a5 5 0 0 0 10 0c0-4-2-7-5-11z" opacity="0.85" />
                  <path d="M3 21c2-2 5-3 9-3s7 1 9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-lg font-bold tracking-wide">BALI HAVEN</div>
                <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">Luxury Villa Booking</div>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Bali&apos;s premier platform for handpicked luxury villas. We curate unforgettable stays across the Island of Gods, blending authentic Balinese hospitality with modern comfort.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li>
                <button onClick={() => navigate("home")} className="hover:text-primary transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("explore")} className="hover:text-primary transition-colors text-left">
                  All Villas
                </button>
              </li>
              <li>
                <button onClick={() => navigate("destinations")} className="hover:text-primary transition-colors text-left">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => navigate("about")} className="hover:text-primary transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("contact")} className="hover:text-primary transition-colors text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4">Top Destinations</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {DESTINATIONS.slice(0, 5).map((d) => (
                <li key={d.slug}>
                  <button
                    onClick={() => navigate("destination-villas", { destination: d.slug })}
                    className="hover:text-primary transition-colors text-left"
                  >
                    {d.name} - {d.tagline}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Jl. Raya Seminyak No. 88, Badung, Bali 80361, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="tel:+6281234567890" className="hover:text-primary transition-colors">+62 812 3456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="mailto:hello@balihaven.com" className="hover:text-primary transition-colors">hello@balihaven.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Send className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">WhatsApp Chat</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-70">
          <p>&copy; {new Date().getFullYear()} Bali Haven. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
