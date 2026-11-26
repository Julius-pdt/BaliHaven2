// BALI HAVEN - Shared types

export type Role = "CUSTOMER" | "ADMIN";

export type PageView =
  | "home"
  | "explore"
  | "villa-detail"
  | "booking"
  | "payment"
  | "booking-confirmation"
  | "destinations"
  | "destination-villas"
  | "about"
  | "contact"
  | "user-dashboard"
  | "admin-dashboard";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type PaymentMethod = "BANK_TRANSFER" | "VIRTUAL_ACCOUNT" | "QRIS" | "CARD";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface VillaImageType {
  id: string;
  url: string;
  caption?: string;
  order: number;
}

export interface Villa {
  id: string;
  slug: string;
  name: string;
  location: string;
  address?: string;
  description: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  latitude?: number;
  longitude?: number;
  featured: boolean;
  active: boolean;
  amenities: string[];
  images: VillaImageType[];
}

export interface Review {
  id: string;
  villaId: string;
  userId: string;
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  userId?: string;
  villaId: string;
  villa?: Villa;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  totalAmount: number;
  status: BookingStatus;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequest?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  createdAt: string;
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  villaCount: number;
}

export interface SearchFilters {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  sortBy?: "price-asc" | "price-desc" | "rating" | "name";
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  phone?: string;
  avatarUrl?: string;
}

export const ALL_AMENITIES = [
  "Private Swimming Pool",
  "Free Wi-Fi",
  "Air Conditioning",
  "Fully Equipped Kitchen",
  "Free Parking",
  "Daily Housekeeping",
  "Breakfast Available",
  "Ocean View",
  "Beach Access",
  "Jungle View",
  "Rice Field View",
  "Private Chef",
  "Spa Service",
  "Yoga Pavilion",
  "Sunset Terrace",
  "Outdoor Shower",
] as const;

export const DESTINATIONS: Destination[] = [
  {
    slug: "ubud",
    name: "Ubud",
    tagline: "Nature & Jungle Villas",
    description:
      "Surrounded by lush rainforests and terraced rice paddies, Ubud is Bali's cultural heart. Stay in secluded jungle villas where the sounds of nature become your morning soundtrack.",
    imageUrl:
      "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=1200&q=80",
    villaCount: 4,
  },
  {
    slug: "canggu",
    name: "Canggu",
    tagline: "Modern Tropical Villas",
    description:
      "A trendy coastal village blending surf culture with bohemian charm. Canggu offers modern villas with sleek designs, vibrant cafes, and world-class sunsets.",
    imageUrl:
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=1200&q=80",
    villaCount: 3,
  },
  {
    slug: "seminyak",
    name: "Seminyak",
    tagline: "Luxury & Lifestyle Villas",
    description:
      "Bali's upscale playground. Seminyak delivers chic beach clubs, fine dining, and elegant private villas perfect for those seeking refined luxury.",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    villaCount: 3,
  },
  {
    slug: "uluwatu",
    name: "Uluwatu",
    tagline: "Ocean View Villas",
    description:
      "Dramatic clifftop vistas meet world-renowned surf breaks. Uluwatu villas perch above the Indian Ocean, offering front-row seats to Bali's legendary sunsets.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    villaCount: 2,
  },
  {
    slug: "nusa-dua",
    name: "Nusa Dua",
    tagline: "Exclusive Resort Villas",
    description:
      "A gated enclave of pristine beaches and five-star resorts. Nusa Dua is the address for travelers who expect nothing short of perfection.",
    imageUrl:
      "https://images.unsplash.com/photo-1602002418082-a454f13f8ba4?w=1200&q=80",
    villaCount: 2,
  },
  {
    slug: "sanur",
    name: "Sanur",
    tagline: "Relaxing Beach Villas",
    description:
      "Bali's original beach resort town. Sanur's calm waters and laid-back pace make it ideal for families and travelers seeking serene beachfront villas.",
    imageUrl:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    villaCount: 2,
  },
];
