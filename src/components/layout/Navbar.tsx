"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", view: "home" as const },
  { label: "Explore Villas", view: "explore" as const },
  { label: "Destinations", view: "destinations" as const },
  { label: "About Us", view: "about" as const },
  { label: "Contact", view: "contact" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { view, navigate, user, openAuth, logout } = useAppStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (v: typeof view) => {
    navigate(v);
    setMobileOpen(false);
  };

  const isHome = view === "home";
  const onHero = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          onHero
            ? "bg-transparent py-4"
            : "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-border/40",
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2 group"
              aria-label="Bali Haven Home"
            >
              <div
                className={cn(
                  "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  onHero
                    ? "bg-white/15 backdrop-blur-sm border border-white/30"
                    : "bg-primary",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={cn(
                    "w-6 h-6 transition-colors",
                    onHero ? "text-white" : "text-primary-foreground",
                  )}
                  fill="currentColor"
                >
                  <path d="M12 2C9 6 7 9 7 13a5 5 0 0 0 10 0c0-4-2-7-5-11z" opacity="0.85" />
                  <path d="M3 21c2-2 5-3 9-3s7 1 9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span
                  className={cn(
                    "font-serif text-lg font-bold tracking-wide transition-colors",
                    onHero ? "text-white" : "text-foreground",
                  )}
                >
                  BALI HAVEN
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.18em] mt-0.5 transition-colors",
                    onHero ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  Luxury Villa Booking
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    onHero
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted",
                    view === link.view && !onHero && "text-primary bg-muted",
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNav(user.role === "ADMIN" ? "admin-dashboard" : "user-dashboard")}
                    className={cn(
                      "gap-2 rounded-full",
                      onHero && "text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleNav("explore")}
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Book Your Stay
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => logout()}
                    className={cn(
                      "rounded-full",
                      onHero && "text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAuth("login")}
                    className={cn(
                      "rounded-full",
                      onHero && "text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    Login / Register
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleNav("explore")}
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  >
                    Book Your Stay
                  </Button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                onHero
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-muted",
              )}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg animate-fade-up">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors hover:bg-muted",
                    view === link.view && "text-primary bg-muted",
                  )}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              {user ? (
                <>
                  <button
                    onClick={() => handleNav(user.role === "ADMIN" ? "admin-dashboard" : "user-dashboard")}
                    className="px-4 py-3 text-left text-sm font-medium rounded-lg hover:bg-muted flex items-center gap-2"
                  >
                    <User className="w-4 h-4" /> My Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 text-left text-sm font-medium rounded-lg hover:bg-muted"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    openAuth("login");
                    setMobileOpen(false);
                  }}
                  className="px-4 py-3 text-left text-sm font-medium rounded-lg hover:bg-muted"
                >
                  Login / Register
                </button>
              )}
              <Button
                onClick={() => {
                  handleNav("explore");
                }}
                className="mt-2 bg-primary text-primary-foreground rounded-full"
              >
                <Calendar className="w-4 h-4 mr-2" /> Book Your Stay
              </Button>
            </div>
          </div>
        )}
      </header>
      {/* Spacer when navbar is not transparent */}
      {!onHero && <div className="h-[72px]" />}
    </>
  );
}
