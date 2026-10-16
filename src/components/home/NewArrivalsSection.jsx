import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export function NewArrivalsSection() {
  // Grab at least 8 new products
  const newArrivals = PRODUCTS.filter(p => p.isNew || p.badge === 'New Arrival' || p.badge === 'New').slice(0, 8);
  // Fallback to first 8 products if fewer than 8 have the flag
  const displayProducts = newArrivals.length >= 8 ? newArrivals : PRODUCTS.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-[#f6f4ee] dark:bg-[#0f1118] border-y border-[#e7e2d9] dark:border-white/10 text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Just Added to Vault</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/products?filter=new"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-3 sm:mt-0 group"
          >
            <span>Explore All 2026 Releases</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
