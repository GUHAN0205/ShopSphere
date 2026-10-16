import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { PromoBanner } from '../components/home/PromoBanner';
import { ShopByLifestyle } from '../components/home/ShopByLifestyle';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { TrustSection } from '../components/home/TrustSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Immersive Editorial Hero */}
      <HeroSection />

      {/* 2. Shop by Category (All 8 Categories) */}
      <FeaturedCategories />

      {/* 3. New Arrivals (8 Products Grid) */}
      <NewArrivalsSection />

      {/* 4. Featured Collections (4 Distinct Thematic Campaigns) */}
      <FeaturedCollections />

      {/* 5. Bestsellers (8 Products with Working Category Tabs) */}
      <BestsellersSection />

      {/* 6. Promotional Campaign Banner (Full-Width with Countdown & Code) */}
      <PromoBanner />

      {/* 7. Shop by Lifestyle (Work, Travel, Active, Home, Leisure) */}
      <ShopByLifestyle />

      {/* 8. Trending Now (Asymmetric Popularity Index & Velocity Stream) */}
      <TrendingProducts />

      {/* 9. Brand Benefits Standard */}
      <TrustSection />

      {/* 10. Validated Editorial Dispatch / Newsletter */}
      <NewsletterSection />
    </div>
  );
}
