import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Badge } from '../common/Badge';

export function TrendingProducts() {
  const { addToCart } = useCart();
  const trendingList = PRODUCTS.filter(p => p.isTrending || p.rating >= 4.8).slice(0, 5);
  const spotlight = trendingList[0] || PRODUCTS[0];
  const rankList = trendingList.slice(1, 5);

  const [activeItem, setActiveItem] = useState(spotlight);

  return (
    <section className="py-20 md:py-28 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#e7e2d9] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-2">
              <Flame className="w-3.5 h-3.5 fill-orange-600 dark:fill-orange-400" />
              <span>Real-Time Popularity Index</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight">
              Trending Now
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mt-2 md:mt-0 font-normal">
            Real-time engagement across collector wishlists, cart additions, and verified reviews.
          </p>
        </div>

        {/* Distinctive Asymmetric Discovery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Spotlight Hero Feature Card (Col 7) */}
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#151722] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="relative aspect-square w-full md:w-1/2 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 shrink-0">
              <img
                src={activeItem.images[0]}
                alt={activeItem.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-106"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white shadow-xs">
                  #1 Most Desired
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  {activeItem.categoryName || activeItem.category}
                </span>
                <div className="flex items-center text-amber-500 gap-1 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{activeItem.rating}</span>
                </div>
              </div>

              <Link to={`/products/${activeItem.id}`}>
                <h3 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white hover:text-blue-600 transition-colors">
                  {activeItem.name}
                </h3>
              </Link>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {activeItem.shortDesc}
              </p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 dark:text-white">
                  {formatPrice(activeItem.price)}
                </span>
                {activeItem.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(activeItem.originalPrice)}
                  </span>
                )}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => addToCart(activeItem, 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#121316] hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-[#121316] font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quick Add to Bag</span>
                </button>

                <Link
                  to={`/products/${activeItem.id}`}
                  className="p-2.5 rounded-xl border border-[#e7e2d9] dark:border-white/10 hover:border-stone-400 text-stone-700 dark:text-stone-300 text-xs transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Ranked List Stream (Col 5) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-1 mb-1">
              Top Ranked Velocity
            </div>

            {trendingList.map((item, index) => {
              const isSelected = activeItem.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#181a26] border-stone-400 dark:border-white/20 shadow-md scale-101'
                      : 'bg-white/60 dark:bg-white/[0.02] border-[#e7e2d9] dark:border-white/5 hover:bg-white dark:hover:bg-white/5'
                  }`}
                >
                  <div className="font-mono text-lg font-bold text-stone-400 dark:text-stone-600 w-7 text-center">
                    0{index + 1}
                  </div>

                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      {item.categoryName} • <span className="font-bold text-stone-900 dark:text-white">{formatPrice(item.price)}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-white/10 hover:bg-[#121316] hover:text-white dark:hover:bg-white dark:hover:text-[#121316] text-stone-700 dark:text-stone-300 transition-colors"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
