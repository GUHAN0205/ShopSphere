import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plane, Activity, Home, Headphones, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export function ShopByLifestyle() {
  const [selectedLifestyle, setSelectedLifestyle] = useState('work');

  const lifestyles = [
    {
      id: 'work',
      label: 'Work & Studio',
      icon: Briefcase,
      headline: 'Tools for Deep Focus & Creation',
      description: 'Precision desk ergonomics, silent tactile key switches, and acoustic isolation designed for relentless workflow.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop',
      filterTags: ['work', 'desk', 'electronics', 'audio']
    },
    {
      id: 'travel',
      label: 'Travel & Movement',
      icon: Plane,
      headline: 'Engineered for Cross-Continental Transit',
      description: 'Weather-resistant ballistic nylon, all-weather footwear, and modular carry gear that adapts to any timezone.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
      filterTags: ['travel', 'bags', 'footwear']
    },
    {
      id: 'active',
      label: 'Motion & Active',
      icon: Activity,
      headline: 'High-Output Performance & Recovery',
      description: 'Zero-gravity cushioned trainers, quick-dry technical weaves, and lightweight hydration vessels for daily training.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
      filterTags: ['active', 'fitness', 'footwear']
    },
    {
      id: 'home',
      label: 'Home & Sanctuary',
      icon: Home,
      headline: 'Atmospheric Rituals for Modern Living',
      description: 'Warm ambient lighting, artisan ceramics, and tactile organic textiles designed to ground and calm your space.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
      filterTags: ['home', 'living']
    },
    {
      id: 'leisure',
      label: 'Leisure & Sound',
      icon: Headphones,
      headline: 'Audiophile High-Fidelity Moments',
      description: 'Spatial dynamic soundstages, analog horology, and tactile everyday carry made for weekend appreciation.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      filterTags: ['audio', 'lifestyle', 'watches']
    }
  ];

  const currentLifestyle = lifestyles.find(l => l.id === selectedLifestyle) || lifestyles[0];

  // Pick matching products based on lifestyle tags
  const matchingProducts = PRODUCTS.filter(p =>
    p.lifestyle === selectedLifestyle ||
    p.lifestyleTag === selectedLifestyle ||
    p.tags?.some(tag => currentLifestyle.filterTags.includes(tag.toLowerCase())) ||
    currentLifestyle.filterTags.includes(p.category)
  ).slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-[#f4f2ec] dark:bg-[#10121a] border-y border-[#e7e2d9] dark:border-white/10 text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Contextual Discovery
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white mt-1 tracking-tight">
            Shop by Lifestyle
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-normal">
            Grouped by how you live, travel, create, and recharge throughout the week.
          </p>
        </div>

        {/* Lifestyle Selector Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {lifestyles.map((item) => {
            const Icon = item.icon;
            const isActive = selectedLifestyle === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedLifestyle(item.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] shadow-md scale-102'
                    : 'bg-white dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border border-[#e7e2d9] dark:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400 dark:text-blue-600' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Lifestyle Banner & Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lifestyle Editorial Poster (Col 4) */}
          <motion.div
            key={currentLifestyle.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-4 rounded-3xl overflow-hidden bg-white dark:bg-[#151722] border border-[#e7e2d9] dark:border-white/10 shadow-lg p-6 sm:p-8 flex flex-col justify-between min-h-[460px] relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-stone-200">
              <img
                src={currentLifestyle.image}
                alt={currentLifestyle.headline}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Persona Profile
              </span>
              <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white leading-tight">
                {currentLifestyle.headline}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                {currentLifestyle.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[#e7e2d9] dark:border-white/10">
              <Link
                to={`/products?lifestyle=${currentLifestyle.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Browse All {currentLifestyle.label} Objects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Matching Products Grid (Col 8) */}
          <div className="lg:col-span-8">
            <motion.div
              key={currentLifestyle.id + '-grid'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {matchingProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
