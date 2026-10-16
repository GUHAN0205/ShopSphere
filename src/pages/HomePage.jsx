import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { PromoBanner } from '../components/home/PromoBanner';
import { CuratedCollection } from '../components/home/CuratedCollection';
import { TrustSection } from '../components/home/TrustSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export function HomePage() {
  return (
    <div className="space-y-6">
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <PromoBanner />
      <CuratedCollection />
      <TrustSection />
      <NewsletterSection />
    </div>
  );
}
