"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  PageView,
  Villa,
  User,
  Booking,
  SearchFilters,
  PaymentMethod,
} from "./types";

interface SearchFormState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface AuthModalState {
  open: boolean;
  mode: "login" | "register";
}

interface AppState {
  // Navigation
  view: PageView;
  selectedVillaId: string | null;
  selectedDestination: string | null;
  navigate: (view: PageView, options?: { villaId?: string; destination?: string }) => void;

  // Search
  searchForm: SearchFormState;
  setSearchForm: (form: Partial<SearchFormState>) => void;
  submitSearch: () => void;

  // Explore filters
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;

  // Booking draft (transient, not persisted)
  bookingDraft: {
    villaId: string | null;
    checkIn: string;
    checkOut: string;
    guests: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequest: string;
    paymentMethod: PaymentMethod | null;
  };
  setBookingDraft: (draft: Partial<AppState["bookingDraft"]>) => void;
  clearBookingDraft: () => void;

  // Confirmed booking (after payment)
  confirmedBooking: Booking | null;
  setConfirmedBooking: (b: Booking | null) => void;

  // Auth
  user: User | null;
  login: (user: User) => void;
  logout: () => void;

  // Auth modal
  authModal: AuthModalState;
  setAuthModal: (state: Partial<AuthModalState>) => void;
  openAuth: (mode?: "login" | "register") => void;
  closeAuth: () => void;

  // User bookings (persisted)
  userBookings: Booking[];
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
}

const defaultFilters: SearchFilters = {
  sortBy: "rating",
};

const defaultBookingDraft = {
  villaId: null,
  checkIn: "",
  checkOut: "",
  guests: 1,
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  specialRequest: "",
  paymentMethod: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      view: "home",
      selectedVillaId: null,
      selectedDestination: null,
      navigate: (view, options) => {
        set({
          view,
          selectedVillaId: options?.villaId ?? get().selectedVillaId,
          selectedDestination: options?.destination ?? null,
        });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      // Search
      searchForm: {
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
      },
      setSearchForm: (form) =>
        set((state) => ({ searchForm: { ...state.searchForm, ...form } })),
      submitSearch: () => {
        const { searchForm } = get();
        set({
          filters: {
            ...defaultFilters,
            destination: searchForm.destination || undefined,
            checkIn: searchForm.checkIn || undefined,
            checkOut: searchForm.checkOut || undefined,
            guests: searchForm.guests ? parseInt(searchForm.guests) : undefined,
          },
          view: "explore",
        });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      // Filters
      filters: defaultFilters,
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Booking draft
      bookingDraft: defaultBookingDraft,
      setBookingDraft: (draft) =>
        set((state) => ({ bookingDraft: { ...state.bookingDraft, ...draft } })),
      clearBookingDraft: () => set({ bookingDraft: defaultBookingDraft }),

      // Confirmed booking
      confirmedBooking: null,
      setConfirmedBooking: (b) => set({ confirmedBooking: b }),

      // Auth
      user: null,
      login: (user) => set({ user }),
      logout: () =>
        set({ user: null, view: "home" }),

      // Auth modal
      authModal: { open: false, mode: "login" },
      setAuthModal: (state) =>
        set((s) => ({ authModal: { ...s.authModal, ...state } })),
      openAuth: (mode = "login") =>
        set({ authModal: { open: true, mode } }),
      closeAuth: () => set({ authModal: { open: false, mode: "login" } }),

      // User bookings
      userBookings: [],
      addBooking: (b) =>
        set((s) => ({ userBookings: [b, ...s.userBookings] })),
      cancelBooking: (id) =>
        set((s) => ({
          userBookings: s.userBookings.map((b) =>
            b.id === id ? { ...b, status: "CANCELLED" } : b,
          ),
        })),
      updateBooking: (id, updates) =>
        set((s) => ({
          userBookings: s.userBookings.map((b) =>
            b.id === id ? { ...b, ...updates } : b,
          ),
        })),
    }),
    {
      name: "bali-haven-store",
      // Don't persist booking draft (transient)
      partialize: (state) => ({
        user: state.user,
        userBookings: state.userBookings,
        searchForm: state.searchForm,
      }),
    },
  ),
);
