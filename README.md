# ShopSphere 2.0 — Find Your Next Favorite 🌐✨

> **Editorial luxury meets contemporary retail. A distinctive, premium e-commerce storefront featuring 48 curated objects across 8 specialty disciplines, asymmetrical magazine layouts, tactile micro-animations, and complete frontend shopping functionality.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-EA4C89?style=flat&logo=framer&logoColor=white)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Visual Identity & Creative Direction

**ShopSphere 2.0** reimagines the storefront from the ground up as a bespoke digital department store:

- **Primary Light Palette**: Warm ivory (`#faf9f5`) and soft architectural neutrals (`#f4f2ec`, `#e7e2d9`) as the default visual foundation.
- **Deep Charcoal Typography**: High-contrast charcoal (`#121316`) delivering sharp legibility and editorial prestige.
- **Accent Tokens**: Curated cobalt blue (`#1d4ed8`), vibrant coral orange (`#ea580c`), and restrained olive/lime accents.
- **Distinctive Typography**: Editorial headlines set in *Playfair Display*, clean geometric body in *Plus Jakarta Sans*, and display accents in *Outfit*.
- **Alternative Midnight Dark Mode**: Complete dark mode (`#0c0d11`, `#12141c`) with adjusted borders, cards, and image treatments.
- **Magazine-Style Asymmetry**: Varied grid compositions, generous architectural whitespace, subtle borders, and smooth micro-interactions without generic dashboards or overused gradients.

---

## 🏛️ Complete Homepage Architecture (12 Sections)

1. **Announcement Strip**: Slim, dismissible promotional banner offering 20% savings with voucher `BEYOND20` and direct collection navigation.
2. **Main Navigation**: Sticky editorial header with brand monogram (`S.`), links to *New Arrivals*, *Shop All*, a mega-dropdown for all **8 categories**, *Featured Collections*, global search trigger (`Ctrl+K`), live wishlist counter, live shopping bag counter, user profile dropdown, and theme toggle.
3. **Immersive Editorial Hero**: Asymmetric magazine composition with oversized editorial headline (*"Find Your Next Favorite."*), curated lifestyle photography, floating product card, and dual CTAs (*Explore Collection* & *New Arrivals*).
4. **Shop by Category (8 Categories)**: Varied bento gallery featuring all 8 distinct retail disciplines with custom imagery, tags, and direct route links.
5. **New Arrivals**: Responsive 8-product discovery grid showcasing 2026 releases with quick add, wishlist toggle, and product detail routing.
6. **Featured Collections (4 Distinct Campaigns)**:
   - *The Everyday Tech Edit* (Precision acoustics & desk objects).
   - *Weekend Essentials* (Waxed canvas duffles & unstructured footwear).
   - *Objects for Better Living* (Sculptural lighting & ceramic homeware).
   - *The Streetwear Collection* (Architectural silhouettes & 3-layer technical outerwear).
7. **Curated Bestsellers**: 8 bestselling products with working category filter tabs (*All*, *Audio*, *Horology*, *Footwear*, *Living*, *Electronics*) and instant layout animations.
8. **Promotional Campaign Banner**: Full-width seasonal campaign card with live countdown clock, one-click voucher copy (`BEYOND20`), and direct catalog CTA.
9. **Shop by Lifestyle**: Persona-based discovery grouping objects into *Work & Studio*, *Travel & Movement*, *Motion & Active*, *Home & Sanctuary*, and *Leisure & Sound*.
10. **Trending Now**: High-velocity discovery section featuring an oversized #1 trending spotlight card alongside a ranked velocity stream.
11. **Brand Benefits & Newsletter**: Transparent store standards (complimentary tracked delivery on $150+, 30-day returns, curated provenance) and an email-validated editorial dispatch interface with clear demo status notice.
12. **Footer**: Comprehensive navigation with links to all 8 categories, customer service, simulated manifest tracking, legal policies, and brand socials.

---

## 📦 48 Curated Demonstration Products Across 8 Categories

Stored in a dedicated module (`src/data/products.js`), each object includes unique IDs, high-resolution photography, specifications, features, color finishes, stock counts, and ratings:

| Category | Slug | Pieces | Example Objects |
|:---|:---|:---:|:---|
| **1. Electronics** | `electronics` | 6 | 4K OLED Pro Canvas, CyberDeck Mechanical Keyboard, Magnetic Charging Pad |
| **2. Audio & Headphones** | `audio` | 6 | SpherePulse Pro ANC, Audiophile Planar Magnetic, Studio Monitor Desk Array |
| **3. Fashion & Apparel** | `fashion` | 6 | 3-Layer Storm Parka, Heavyweight Knit Hoodie, Tailored Pleated Trousers |
| **4. Footwear & Sneakers** | `footwear` | 6 | Aerated Chelsea Boots, Kinetic Mesh Runner, Italian Leather Low Sneaker |
| **5. Watches & Accessories** | `watches` | 6 | Titanium Chronograph Automatic, Minimalist Field Horology, Modular Key Wrap |
| **6. Home & Living** | `home-living` | 6 | Sculptural Cast Brass Lamp, Pour-Over Ceramic Ritual, Linen Woven Throw |
| **7. Bags & Travel** | `bags-travel` | 6 | Waxed Ballistic Duffle, Weatherproof Commuter Pack, Hard Shell Carry-On |
| **8. Lifestyle Essentials** | `lifestyle` | 6 | Double-Wall Thermal Vessel, Solid Brass Ballpoint, Travel Grooming Roll |

---

## ⚡ Technical Capabilities & Shopping Engine

### 🔍 Search & Filtering
- **Search Overlay (`Ctrl+K` / `Cmd+K`)**: Instant search across titles, descriptions, categories, and tags with quick keyword pills.
- **Multi-Vector Filtering**: Filter by category, price ceiling slider ($50–$2000), minimum rating (All, 4.5+★, 4.8+★), and in-stock toggle.
- **Sorting Modes**: Featured & Curated, Price (Low to High / High to Low), Customer Rating, and New Arrivals.
- **Pagination**: Responsive *Load More* pagination smoothly handling the 48-item catalog.

### 🔬 Product Details & Discovery
- **Multi-Angle Gallery**: High-res image display with thumbnail navigation and zoom-on-hover.
- **Specifications & Features**: Tabbed breakdown of technical specifications, materials, and care guides.
- **Quick-View Modal**: Accessible preview modal allowing finish selection and immediate cart additions from any card.
- **Live Comparison Drawer**: Real-time side-by-side spec comparison of selected products using verified local data.
- **Recently Viewed Rail**: Automatic tracking of recently examined pieces saved to `localStorage`.

### 🛒 Bag, Promo & Simulated Checkout
- **Real-Time Calculations**: Dynamic subtotal, progressive complimentary delivery threshold ($150), and tax (8%).
- **Voucher Engine**: Validated coupon codes (`BEYOND20` for 20% off, `FREESHIP` for complimentary courier).
- **Express Checkout**: Multi-step delivery form with accessible error validation and account address prefilling.
- **Order Success Manifest**: Simulated order references (`SPHERE-2026-XXXXX`), celebratory confetti, printable receipts, and delivery timelines.
- **Demo Authentication**: Pre-configured evaluator profiles (`alex.vance@sphere.network` / `elena.rostova@sphere.network`) for friction-free testing.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8.3](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + Custom CSS Design System
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Animations**: [Framer Motion 12](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Running Locally

```bash
# Clone the repository
git push / git clone https://github.com/GUHAN0205/ShopSphere.git
cd ShopSphere

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser to experience **ShopSphere 2.0**.

---

## 📄 License

MIT License © 2026 ShopSphere. All rights reserved.
