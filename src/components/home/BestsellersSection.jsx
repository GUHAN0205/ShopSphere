import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export function BestsellersSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Bestsellers' },
    { id: 'audio', label: 'Audio & Acoustics' },
    { id: 'watches', label: 'Horology' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'home-living', label: 'Living' },
    { id: 'electronics', label: 'Electronics' }
  ];

  // All products sorted by rating or bestseller badge
  const allBestsellers = PRODUCTS.filter(p => p.rating >= 4.7 || p.badge === 'Bestseller');

  const filteredItems = activeTab === 'all'
    ? allBestsellers.slice(0, 8)
    : allBestsellers.filter(p => p.category === activeTab).slice(0, 8);

  const displayList = filteredItems.length > 0 ? filteredItems : allBestsellers.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#e7e2d9] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Highest Rated & Most Ordered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight">
              Curated Bestsellers
            </h2>
          </div>

          <Link
            to="/products?filter=bestsellers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-3 md:mt-0 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Working Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] shadow-xs'
                  : 'bg-white dark:bg-white/5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-[#e7e2d9] dark:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8 Product Grid with smooth layout animation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
