"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { HomePage } from "@/components/home/HomePage";
import { ExplorePage } from "@/components/explore/ExplorePage";
import { VillaDetailPage } from "@/components/villa/VillaDetailPage";
import { BookingPage } from "@/components/booking/BookingPage";
import { PaymentPage } from "@/components/booking/PaymentPage";
import { BookingConfirmationPage } from "@/components/booking/BookingConfirmationPage";
import { DestinationsPage } from "@/components/destinations/DestinationsPage";
import { AboutPage } from "@/components/about/AboutPage";
import { ContactPage } from "@/components/contact/ContactPage";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export default function Home() {
  const { view } = useAppStore();

  // Scroll to top on view change (except for home which has hero)
  useEffect(() => {
    if (view !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [view]);

  const renderView = () => {
    switch (view) {
      case "home":
        return <HomePage />;
      case "explore":
      case "destination-villas":
        return <ExplorePage />;
      case "villa-detail":
        return <VillaDetailPage />;
      case "booking":
        return <BookingPage />;
      case "payment":
        return <PaymentPage />;
      case "booking-confirmation":
        return <BookingConfirmationPage />;
      case "destinations":
        return <DestinationsPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "user-dashboard":
        return <UserDashboard />;
      case "admin-dashboard":
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  // Pages that should hide footer for cleaner immersive experience
  const hideFooter = view === "booking" || view === "payment" || view === "booking-confirmation";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{renderView()}</main>
      {!hideFooter && <Footer />}
      <AuthModal />
    </div>
  );
}
