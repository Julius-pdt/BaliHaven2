# BALI HAVEN — 2

> Discover Your Private Paradise in Bali — platform pemesanan villa mewah dengan estetika Tropical Luxury, Modern Minimalist, dan Bali Aesthetic.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## Daftar Isi

- [Tentang](#tentang)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Memulai](#memulai)
- [Variabel Environment](#variabel-environment)
- [Database & Prisma](#database--prisma)
- [Akun Demo](#akun-demo)
- [Alur Booking](#alur-booking)
- [Desain & Branding](#desain--branding)
- [Responsivitas](#responsivitas)
- [Catatan Produksi](#catatan-produksi)
- [Roadmap](#roadmap)
- [Berkontribusi](#berkontribusi)
- [Lisensi](#lisensi)

---

## Tentang

**BALI HAVEN 2** adalah aplikasi web pemesanan villa eksklusif di Bali yang ditujukan untuk wisatawan lokal maupun mancanegara. Platform ini mengkurasi lebih dari 120 villa mewah di 6 destinasi premium Bali — Ubud, Canggu, Seminyak, Uluwatu, Nusa Dua, dan Sanur.

Setiap villa dalam koleksi kami dipilih secara manual melalui inspeksi langsung oleh tim lokal, menampilkan private pool, tropical garden, pemandangan pantai atau hutan, dan interior khas Bali dengan standar layanan bintang lima.

## Fitur Utama

### Halaman Publik
- **Homepage** dengan hero fullscreen, search booking bar (destination / check-in / check-out / guests), statistik, featured villas, destinations preview, testimonials, dan newsletter CTA
- **Explore Villas** — katalog villa dengan grid responsif, search, filter (rentang harga, destinasi, jumlah tamu, 16 jenis fasilitas), dan sorting (rating / harga / nama)
- **Villa Detail** — gallery foto dengan lightbox, deskripsi lengkap, daftar fasilitas, peta lokasi (OpenStreetMap), review pelanggan, dan booking form sticky dengan kalkulasi harga real-time
- **Destinations** — showcase 6 destinasi Bali dengan layout alternating, deskripsi, dan harga terendah
- **About Us** — cerita brand, statistik, core values, dan profil tim
- **Contact** — form dengan validasi, multi-channel contact (email, telepon, WhatsApp), office hours, social links, dan peta

### Sistem Booking
- **Multi-step wizard** (3 langkah): Dates & Guests → Guest Information → Review & Confirm
- **Validasi form** lengkap dengan error handling dan toast notification
- **Payment page** dengan 4 metode: Bank Transfer, Virtual Account, QRIS (dengan QR code), Credit/Debit Card
- **Booking confirmation** dengan Booking ID otomatis (format `BH-YYMMDD-XXXX`), rincian lengkap, dan panduan "what happens next"
- **Pencegahan double booking** melalui validasi tanggal
- **Status booking**: Pending, Confirmed, Cancelled, Completed

### Dashboard Pengguna
- Profile management (edit nama, email, telepon)
- My Bookings: Upcoming Reservations & Booking History
- Cancel booking dengan konfirmasi dialog
- Security settings: change password, 2FA setup, sign out
- Statistik personal (jumlah trip, upcoming, cancelled)

### Admin Dashboard
- 4 stat cards: Total Villas, Total Bookings, Total Revenue, Total Customers
- Visualisasi data dengan Recharts: Bar chart (revenue & bookings), Line chart (booking trend), Pie chart (distribution villa per destinasi)
- **Manage Villas** — CRUD lengkap (Create, Read, Update, Delete) dengan dialog form
- **Manage Bookings** — tabel dengan status management
- **Manage Reviews** — moderasi feedback pelanggan
- **Manage Customers** — daftar pelanggan dengan total spent

### Autentikasi
- Login/Register modal dengan validasi
- Demo login instan (As Guest / As Admin)
- Role-based access (CUSTOMER / ADMIN)
- State persisted di localStorage

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + shadcn/ui (New York style) |
| **Database** | Prisma ORM dengan SQLite (demo) / PostgreSQL (production-ready) |
| **State Management** | Zustand (client state, dengan persist middleware) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Fonts** | Playfair Display (heading) + Inter (body) via `next/font` |
| **Notifications** | Sonner + Radix Toast |
| **Animations** | CSS transitions + custom scroll reveal (Intersection Observer) |
| **Package Manager** | Bun |

> **Catatan:** Spesifikasi awal menyebut Nuxt 4 / Vue 3 / Cloudflare Workers. Proyek ini diadaptasi ke Next.js 16 karena keterbatasan environment sandbox, tetapi arsitektur dan fungsionalitas tetap setara. Schema Prisma dirancang agar mudah dipindahkan ke PostgreSQL production.

## Struktur Proyek

```
bali-haven/
├── prisma/
│   └── schema.prisma              # Schema database (User, Villa, Booking, dll)
├── public/
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout dengan font Playfair + Inter
│   │   ├── page.tsx               # View router utama (state-based)
│   │   ├── globals.css            # Design system + Bali color palette
│   │   └── api/
│   │       └── route.ts
│   ├── components/
│   │   ├── layout/                # Navbar (sticky, responsive) & Footer
│   │   ├── home/                  # Hero, FeaturedVillas, DestinationsPreview,
│   │   │                          # WhyChooseUs, Testimonials, NewsletterCTA
│   │   ├── explore/               # ExplorePage (filter+grid), VillaCard
│   │   ├── villa/                 # VillaDetailPage dengan gallery+booking form
│   │   ├── booking/               # BookingPage (3-step), PaymentPage, Confirmation
│   │   ├── destinations/          # DestinationsPage
│   │   ├── about/                 # AboutPage
│   │   ├── contact/               # ContactPage
│   │   ├── dashboard/             # UserDashboard & AdminDashboard
│   │   ├── auth/                  # AuthModal (login/register)
│   │   ├── shared/                # RatingStars, Reveal (scroll animation)
│   │   └── ui/                    # shadcn/ui component library (40+ components)
│   ├── lib/
│   │   ├── data.ts                # 13 villa dummy realistis + helper functions
│   │   ├── types.ts               # TypeScript types & constants
│   │   ├── store.ts               # Zustand store (navigation, auth, booking)
│   │   ├── db.ts                  # Prisma client
│   │   └── utils.ts               # Utility functions (cn, dll)
│   └── hooks/
│       ├── use-mobile.ts
│       └── use-toast.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── eslint.config.mjs
├── components.json                # shadcn/ui config
└── README.md
```

## Memulai

### Prasyarat

- **Node.js** 18.17+ atau **Bun** 1.0+
- **PostgreSQL** (untuk production) — SQLite digunakan untuk development

### Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/bali-haven.git
cd bali-haven

# 2. Install dependencies (pilih salah satu)
bun install        # direkomendasikan
# atau
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env sesuai konfigurasi Anda

# 4. Push database schema
bun run db:push
# atau
npx prisma db push

# 5. Jalankan development server
bun run dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Scripts yang Tersedia

| Script | Deskripsi |
|--------|-----------|
| `bun run dev` | Jalankan development server di port 3000 |
| `bun run build` | Build untuk production |
| `bun run start` | Jalankan server production |
| `bun run lint` | Cek kode dengan ESLint |
| `bun run db:push` | Push schema Prisma ke database |
| `bun run db:generate` | Generate Prisma Client |
| `bun run db:migrate` | Buat dan jalankan migration |
| `bun run db:reset` | Reset database (development only) |

## Variabel Environment

Buat file `.env` di root proyek:

```env
# Database
DATABASE_URL="file:./db/custom.db"           # SQLite (development)
# DATABASE_URL="postgresql://user:pass@host:5432/bali_haven2?schema=public"  # PostgreSQL (production)

# NextAuth (jika diaktifkan)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Payment Gateway (production)
# MIDTRANS_SERVER_KEY="your-midtrans-key"
# XENDIT_API_KEY="your-xendit-key"
```

## Database & Prisma

Schema Prisma mendefinisikan 7 model utama:

```prisma
model User {
  id           String     @id @default(cuid())
  email        String     @unique
  name         String?
  passwordHash String?
  role         String     @default("CUSTOMER")  // CUSTOMER | ADMIN
  phone        String?
  avatarUrl    String?
  bookings     Booking[]
  reviews      Review[]
}

model Villa {
  id            String   @id @default(cuid())
  slug           String   @unique
  name           String
  location       String   // Ubud, Canggu, Seminyak, Uluwatu, Nusa Dua, Sanur
  description    String
  pricePerNight  Float
  bedrooms       Int
  bathrooms      Int
  maxGuests      Int
  rating         Float    @default(0)
  reviewCount    Int      @default(0)
  amenities      String   // comma-separated
  featured       Boolean  @default(false)
  images         VillaImage[]
  bookings       Booking[]
  reviews        Review[]
  availability   VillaAvailability[]
}

model VillaImage { ... }
model Booking { ... }       // dengan bookingCode, status, totalAmount
model Payment { ... }       // dengan method, status, reference
model Review { ... }        // rating 1-5, comment
model VillaAvailability { ... }  // pencegahan double booking
```

Lihat [`prisma/schema.prisma`](./prisma/schema.prisma) untuk schema lengkap.

## Akun Demo

Aplikasi dilengkapi dengan demo login untuk testing cepat. Klik **"Login / Register"** di navbar, lalu pilih:

| Role | Akses | Cara |
|------|-------|------|
| **Guest** | User Dashboard, booking villa | Klik tombol "As Guest" |
| **Admin** | Admin Dashboard, manage villas/bookings | Klik tombol "As Admin" |

Email `admin@balihaven2.com` secara otomatis mendapat role `ADMIN`.

## Alur Booking

```
Pilih Villa → Pilih Tanggal → Tentukan Guests → Isi Info Pemesan
    ↓
Review & Confirm → Pilih Metode Pembayaran → Bayar
    ↓
Booking Confirmation (ID: BH-YYMMDD-XXXX) → Email Konfirmasi
```

**Metode pembayaran yang didukung:**
- **Bank Transfer** — Transfer manual ke BCA (verifikasi 1-2 jam)
- **Virtual Account** — VA number unik untuk verifikasi instan
- **QRIS** — Scan dengan GoPay, OVO, Dana, ShopeePay, atau m-banking
- **Credit/Debit Card** — Visa, Mastercard, JCB dengan 3D-Secure

> Demo pembayaran disimulasikan (tidak ada gateway real). Untuk production, integrasikan [Midtrans](https://midtrans.com/), [Xendit](https://www.xendit.co/), atau [Stripe](https://stripe.com/).

## Desain & Branding

### Color Palette

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| White | `#FFFFFF` | Background utama |
| Cream | `oklch(0.97 0.012 90)` | Section background alternatif |
| Beige | `oklch(0.93 0.025 80)` | Border, muted element |
| Sage Green | `oklch(0.72 0.06 130)` | Accent, secondary |
| Dark Green | `oklch(0.32 0.06 150)` | Primary (button, text heading) |
| Gold | `oklch(0.78 0.13 75)` | Highlight, rating stars, badge |

### Typography

- **Playfair Display** — Heading (h1-h6), nama villa, brand
- **Inter** — Body text, label, button, form input

### Aesthetic

- Tropical Luxury dengan sentuhan Bali
- Modern Minimalist — clean, spacious, tidak ramai
- Smooth scroll animations (Intersection Observer)
- Hover effects dengan transisi halus
- Premium card shadow dan rounded corners

## Responsivitas

Aplikasi dioptimalkan untuk semua perangkat dengan pendekatan **mobile-first**:

| Breakpoint | Lebar | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, hamburger menu, drawer filter |
| Tablet | 640px - 1024px | 2-column grid, collapsed sidebar |
| Desktop | > 1024px | 3-column grid, sticky sidebar filter, full navbar |

Fitur mobile-friendly:
- Touch target minimum 44px
- Sticky navbar dengan hamburger menu
- Drawer filter di halaman Explore Villas
- Form input dengan numeric keyboard di date picker

## Catatan Produksi

Sebelum deploy ke production, lakukan hal berikut:

1. **Database** — Pindahkan dari SQLite ke PostgreSQL dengan mengubah `DATABASE_URL` dan `provider` di `schema.prisma`
2. **Authentication** — Integrasi [NextAuth.js](https://next-auth.js.org/) atau [Supabase Auth](https://supabase.com/auth) untuk autentikasi real (saat ini menggunakan demo state)
3. **Payment Gateway** — Integrasi [Midtrans](https://midtrans.com/) atau [Xendit](https://www.xendit.co/) untuk pembayaran real
4. **Image Storage** — Gunakan [Cloudinary](https://cloudinary.com/), [Supabase Storage](https://supabase.com/storage), atau [Cloudflare R2](https://developers.cloudflare.com/r2/) untuk upload foto villa
5. **Email Service** — Integrasi [Resend](https://resend.com/), [SendGrid](https://sendgrid.com/), atau [AWS SES](https://aws.amazon.com/ses/) untuk email konfirmasi booking
6. **Maps** — Upgrade ke [Google Maps API](https://developers.google.com/maps) untuk pengalaman lokasi yang lebih baik
7. **Analytics** — Tambahkan [Google Analytics](https://analytics.google.com/) atau [Plausible](https://plausible.io/)
8. **SEO** — Tambahkan `sitemap.xml`, `robots.txt` optimasi, dan metadata Open Graph per halaman
9. **Testing** — Tambahkan unit test dengan [Vitest](https://vitest.dev/) dan E2E test dengan [Playwright](https://playwright.dev/)
10. **CI/CD** — Setup GitHub Actions untuk automated testing dan deployment

### Deployment

Direkomendasikan untuk deploy di:
- [Vercel](https://vercel.com/) — Optimal untuk Next.js
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/) (dengan adaptasi edge runtime)
- Self-hosted dengan Docker

## Roadmap

- [ ] Integrasi NextAuth.js untuk autentikasi real
- [ ] Integrasi payment gateway (Midtrans/Xendit)
- [ ] Upload foto villa via admin dashboard
- [ ] Sistem review oleh pengguna yang sudah pernah booking
- [ ] Multi-language (Indonesian + English)
- [ ] PWA support untuk install di mobile
- [ ] WebSocket untuk notifikasi booking real-time
- [ ] AI-powered villa recommendation
- [ ] Loyalty program untuk repeat customers
- [ ] Mobile app (React Native)

## Berkontribusi

Kontribusi dipersilakan! Untuk perubahan besar, buka issue terlebih dahulu untuk mendiskusikan apa yang ingin diubah.

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

Pastikan kode lolos `bun run lint` sebelum submit.

## Lisensi

Distributed under the **MIT License**. Lihat [`LICENSE`](./LICENSE) untuk informasi lengkap.

---

<p align="center">
  <strong>BALI HAVEN</strong> — Crafted with care for the Island of Gods 🌴
</p>
