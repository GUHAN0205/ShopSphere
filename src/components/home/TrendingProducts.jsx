import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { Button } from '../common/Button';

export function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Curations' },
    { id: 'electronics', label: 'Acoustics & Tech' },
    { id: 'fashion', label: 'Avant Fashion' },
    { id: 'accessories', label: 'EDC & Horology' },
    { id: 'home-living', label: 'Habitat & Living' }
  ];

  const filtered = activeTab === 'all'
    ? PRODUCTS.filter(p => p.isTrending || p.isFeatured).slice(0, 8)
    : PRODUCTS.filter(p => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>High Demand Real-Time</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Trending Drops
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="px-8"
            >
              Browse Complete 2026 Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
