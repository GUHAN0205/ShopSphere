import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { getCategoryProductCount } from '../../data/products';
import { handleImageError } from '../../utils/imageFallback';

export function FeaturedCategories() {
  // Let's create an editorial bento composition for the 8 categories:
  // Cat 0: Large feature (col-span-1 md:col-span-2 row-span-2)
  // Cat 1: Tall feature (col-span-1 md:col-span-1 row-span-2)
  // Cat 2-7: Varied editorial cards with unique badges and typography

  return (
    <section className="py-16 md:py-24 relative bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#e7e2d9] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Departments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mt-3 md:mt-0 font-normal">
            Eight dedicated disciplines spanning precision electronics, spatial acoustics, avant-garde silhouettes, and everyday essentials.
          </p>
        </div>

        {/* Varied Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[280px]">
          {CATEGORIES.map((category, idx) => {
            // Give varied span patterns to avoid 8 identical cards
            const isLarge = idx === 0; // First one wide & tall
            const isTall = idx === 1;  // Second one tall
            const isWide = idx === 5;  // 6th one wide

            let gridClasses = 'col-span-1 row-span-1';
            if (isLarge) gridClasses = 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2';
            else if (isTall) gridClasses = 'col-span-1 sm:col-span-1 sm:row-span-2';
            else if (isWide) gridClasses = 'col-span-1 sm:col-span-2 row-span-1';

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className={gridClasses}
              >
                <Link
                  to={`/categories/${category.slug}`}
                  className="group relative block w-full h-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-[#e7e2d9] dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Image with Cinematic Zoom */}
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md text-stone-900 dark:text-white border border-white/20 shadow-xs">
                      {category.badge || `Hub 0${idx + 1}`}
                    </span>
                  </div>

                  {/* Arrow Action */}
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-stone-950 group-hover:rotate-45 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Content at Bottom */}
                  <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-blue-300">
                      {getCategoryProductCount(category.id)} Curated Pieces
                    </div>
                    <h3 className={`font-bold font-editorial text-white mt-1 group-hover:translate-x-1 transition-transform ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-1 mt-1 opacity-90">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
