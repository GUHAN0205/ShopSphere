# ShopSphere — Beyond Shopping 🌐✨

> **Next-generation, premium e-commerce frontend featuring spatial audio hardware, aerospace titanium horology, avant-garde technical apparel, and architectural living objects.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-EA4C89?style=flat&logo=framer&logoColor=white)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Vision & Creative Identity

**ShopSphere — Beyond Shopping** is designed as a luxury futuristic commerce experience. Moving beyond generic templates, ShopSphere combines editorial product photography, refined typography, smooth route transitions, and micro-interactions with fully working frontend commerce functionality.

### Core Design Philosophy:
- **Palette**: Deep midnight tones (`#070913`, `#0d1124`) paired with rich violet and electric cyan accents.
- **Surfaces**: Subtle frosted glassmorphic backdrops, ambient radial glow meshes, and balanced whitespace.
- **Themes**: Default dark mode with an integrated, persistent light mode.
- **Typography**: Display typography using *Outfit* with structural clarity from *Plus Jakarta Sans*.

---

## 🚀 Key Features

### 1. 🛍️ Immersive Landing & Discovery
- **Hero Showcase**: Spatial acoustic telemetry hero with floating ambient specifications and interactive CTA buttons.
- **Department Sectors**: Photographic category cards linking directly to *Electronics*, *Avant Fashion*, *Precision Accessories*, and *Living & Habitat*.
- **Trending Drops**: Real-time category-filtered trending showcase with immediate add-to-bag and wishlist toggling.
- **Interactive Promo Banner**: Live countdown timer simulation and one-click copyable coupon `BEYOND20`.
- **Private Dispatch Newsletter**: Real-time email validation and registration feedback.

### 2. 🔍 Advanced Product Catalog
- **Live Instant Search**: Filter across titles, categories, technical specs, and tags with zero latency.
- **Multi-Vector Filtering**: Dynamic price range slider ($50 to $2000), minimum rating filter (4.5★, 4.8★), sector selectors, and in-stock toggle.
- **Sorting Options**: Sort by Curated/Featured, Price (Low-High / High-Low), Rating, and New Arrivals.
- **Quick-View Modal**: Preview galleries, finishes, and order directly without navigating away.

### 3. 🔬 Deep Product Specifications
- **Multi-Angle Gallery**: High-resolution imagery with interactive thumbnail switcher and hover magnification.
- **Engineering Tolerances**: Deep specification tables detailing driver sizes, water resistance, materials, and battery life.
- **Interactive Customizer**: Color/finish selector, quantity selectors with real-time stock limits, and related companion rails.

### 4. ⚖️ Side-by-Side Product Comparison
- Compare up to 3 products simultaneously in a slide-up comparison drawer.
- Side-by-side spec sheets, customer ratings, pricing diffs, and direct cart actions.

### 5. 🤖 "Sphere Concierge" Assistant
- Floating personal shopping assistant powered by deterministic local logic (no external API keys required).
- Instant recommendation triggers: *"Audio Gear"*, *"Under $200"*, *"Titanium & EDC"*, *"Workspace Setup"*, and active promo discovery.

### 6. 🛒 Persistent Shopping Bag & Promo Engine
- Dynamic subtotal, shipping charge calculation ($12 standard or FREE on orders over $150), and estimated tax.
- Free shipping progress gauge with real-time feedback.
- Working promo code validation (`BEYOND20` for 20% off, `FREESHIP` for complimentary courier).
- Complete state persistence in `localStorage`.

### 7. 🔒 Express Checkout & Confetti Confirmation
- Multi-step customer delivery information form with inline validation and real-time field error feedback.
- Automatic address & contact prefill when signed into a client account.
- Simulated payment method switcher: Credit Card, Apple Pay / Biometrics, and Direct Wire / COD.
- Simulated order completion generating unique references (`SPHERE-2026-XXXXX`).
- Order confirmation view with celebratory confetti, delivery timeline tracking, invoice breakdown, and printable receipt.

### 8. 👤 Client Authentication & Account Portal (Demo Mode)
- **Dedicated Routes**: `/login` (Sign In), `/register` (Create Account), and `/forgot-password` (Password Recovery).
- **Interactive UI**: Split-screen cyberpunk showcase with ambient gradients, floating metric pills, and real-time input validation.
- **Security & UX Controls**: Interactive password visibility toggles (`Eye` / `EyeOff`), remember-me terminal selection, and terms acknowledgment.
- **One-Click Evaluator Profiles**: Quick-fill demo account shortcuts (`alex.vance@sphere.network` / `elena.rostova@sphere.network`) for instantaneous evaluator testing.
- **Navbar Account Integration**: Logged-in client avatar/initials badge, membership tier indicator (*"Visionary Member"*), quick links to saved bags/manifests, and working sign-out flow.

> [!NOTE]
> **Authentication & Security Disclaimer**:
> ShopSphere is currently a frontend-only portfolio demonstration. Client authentication is implemented via a lightweight, client-side demo state (`AuthContext.jsx`) stored safely in `localStorage`. It does **not** connect to a remote backend database, does **not** store plaintext passwords remotely, and does **not** dispatch live password recovery emails. This design is intentionally client-contained for frictionless portfolio and interview review.

---

## 📸 Screenshots

| Desktop Showcase | Mobile Experience |
|:---:|:---:|
| ![ShopSphere Desktop](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop) | ![ShopSphere Mobile](https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop) |
| *Hero Showcase & Acoustic Flagships* | *Responsive Precision Navigation* |

---

## 📂 Project Architecture

```
ShopSphere/
├── public/
│   └── favicon.svg                  # Brand SVG emblem
├── src/
│   ├── assets/                      # Static icons and imagery
│   ├── components/
│   │   ├── cart/                    # CartItem, CartSummary
│   │   ├── checkout/                # CheckoutForm with validation & user prefill
│   │   ├── common/                  # Button, Badge, Modal, SearchOverlay,
│   │   │                            # QuickView, CompareDrawer, Breadcrumbs,
│   │   │                            # BackToTop, ShoppingAssistant
│   │   ├── home/                    # HeroSection, FeaturedCategories,
│   │   │                            # TrendingProducts, PromoBanner,
│   │   │                            # CuratedCollection, TrustSection,
│   │   │                            # NewsletterSection
│   │   ├── layout/                  # Navbar (with user portal), Footer, AnnouncementBar
│   │   └── products/                # ProductCard, ProductGrid, ProductFilter
│   ├── context/
│   │   ├── AuthContext.jsx          # Client demo authentication & user profiles
│   │   ├── CartContext.jsx          # Shopping bag state & calculations
│   │   ├── WishlistContext.jsx      # Saved items state
│   │   ├── ThemeContext.jsx         # Dark / Light theme persistence
│   │   ├── ToastContext.jsx         # Accessible notification system
│   │   └── CompareContext.jsx       # Multi-product comparison state
│   ├── data/
│   │   ├── categories.js            # Curated sector definitions
│   │   └── products.js              # 20+ realistic products dataset
│   ├── hooks/
│   │   └── useRecentlyViewed.js     # User viewing history tracker
│   ├── pages/
│   │   ├── HomePage.jsx             # Main landing experience
│   │   ├── CatalogPage.jsx          # Filterable catalog (/products)
│   │   ├── ProductDetailPage.jsx    # Specification sheet (/products/:id)
│   │   ├── CategoryPage.jsx         # Sector route (/categories/:category)
│   │   ├── WishlistPage.jsx         # Saved items (/wishlist)
│   │   ├── CartPage.jsx             # Shopping bag (/cart)
│   │   ├── CheckoutPage.jsx         # Express checkout (/checkout)
│   │   ├── OrderSuccessPage.jsx     # Order confirmation (/order-success)
│   │   ├── LoginPage.jsx            # Sign In experience (/login)
│   │   ├── RegisterPage.jsx         # Create Account experience (/register)
│   │   ├── ForgotPasswordPage.jsx   # Password Recovery UI (/forgot-password)
│   │   └── NotFoundPage.jsx         # Custom 404 handler
│   ├── utils/
│   │   └── formatters.js            # Currency, IDs, discounts, dates
│   ├── App.jsx                      # Route definitions & layout wrappers
│   ├── main.jsx                     # React root mount
│   └── index.css                    # Design system tokens & utility classes
├── index.html                       # Entry HTML with SEO & font imports
├── vite.config.js                   # Vite config with @tailwindcss/vite
├── package.json                     # Scripts & dependencies
├── .env.example                     # Environment template
└── README.md                        # Documentation
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) |
| **Language** | Modern JavaScript (ES Modules, JSX) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS design tokens |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Motion & Animation** | [Framer Motion](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects** | [Canvas Confetti](https://github.com/catdad/canvas-confetti) |
| **State Persistence** | React Context API + LocalStorage |

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v24)
- **npm**: v9.0.0 or higher

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/GUHAN0205/ShopSphere.git
   cd ShopSphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🧪 Production Build & Verification

To verify that the code compiles cleanly and produces optimized production bundles:

```bash
npm run build
```

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 🚀 Deployment to Vercel

ShopSphere is pre-configured for instant zero-configuration deployment to **Vercel**:

### Option 1: Via Vercel Web Dashboard
1. Push this repository to your GitHub account (`GUHAN0205/ShopSphere`).
2. Log in to [Vercel](https://vercel.com/) with GitHub.
3. Click **"Add New..."** -> **"Project"**.
4. Import `GUHAN0205/ShopSphere`.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 👤 Author & GitHub Information

- **Developer**: GUHAN0205
- **GitHub**: [@GUHAN0205](https://github.com/GUHAN0205)
- **Repository**: [https://github.com/GUHAN0205/ShopSphere](https://github.com/GUHAN0205/ShopSphere)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
