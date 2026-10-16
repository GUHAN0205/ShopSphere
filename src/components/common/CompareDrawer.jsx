import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, Trash2, ShoppingBag, Star } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { Button } from './Button';

export function CompareDrawer() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  if (compareItems.length === 0) return null;

  return (
    <>
      {/* Floating Indicator Bar at Bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] border border-stone-800 dark:border-stone-200 shadow-2xl"
        >
          <div className="flex items-center gap-2 font-semibold text-xs md:text-sm">
            <Scale className="w-4 h-4 text-blue-400 dark:text-blue-600 animate-pulse" />
            <span>Comparing {compareItems.length} {compareItems.length === 1 ? 'Object' : 'Objects'}</span>
          </div>

          <div className="flex items-center -space-x-2 overflow-hidden">
            {compareItems.map(item => (
              <img
                key={item.id}
                src={item.images[0]}
                alt={item.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-[#121316] dark:border-white"
              />
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            Compare Specs
          </button>

          <button
            onClick={clearCompare}
            className="p-1 text-stone-400 hover:text-rose-400 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors cursor-pointer"
            title="Clear compare"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Expanded Comparison Modal / Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#faf9f5] dark:bg-[#12141c] text-[#121316] dark:text-[#f2f4f8] border border-[#e7e2d9] dark:border-white/15 shadow-2xl p-6 md:p-8 z-10"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#e7e2d9] dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white">
                      Side-by-Side Object Comparison
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Comparing verified local specifications, materials, and acoustic ratings
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={clearCompare}
                    className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {compareItems.map(item => (
                  <div
                    key={item.id}
                    className="relative rounded-2xl bg-white dark:bg-[#181a26] p-5 border border-[#e7e2d9] dark:border-white/10 shadow-xs flex flex-col justify-between"
                  >
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white bg-stone-100 dark:bg-black/40 hover:bg-stone-200 transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-4 border border-[#e7e2d9]/60 dark:border-white/10">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
                        {item.categoryName || item.category}
                      </span>
                      <h4 className="text-base font-bold font-editorial text-stone-900 dark:text-white mt-1 line-clamp-1">
                        {item.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-amber-500 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-semibold ml-1 text-stone-900 dark:text-white">{item.rating}</span>
                        </div>
                        <span className="text-xs text-stone-400">({item.reviewCount} reviews)</span>
                      </div>

                      <div className="text-xl font-extrabold text-stone-900 dark:text-white mt-3 font-editorial">
                        {formatPrice(item.price)}
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">
                        {item.shortDesc}
                      </p>

                      {/* Specs List */}
                      <div className="mt-4 pt-4 border-t border-[#e7e2d9] dark:border-white/10 space-y-2 text-xs">
                        {item.specifications && Object.entries(item.specifications).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1 border-b border-[#e7e2d9]/40 dark:border-white/5">
                            <span className="text-stone-500 dark:text-stone-400">{k}:</span>
                            <span className="font-medium text-stone-900 dark:text-white text-right ml-2 truncate max-w-[150px]">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#e7e2d9] dark:border-white/10">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        icon={ShoppingBag}
                        onClick={() => {
                          addToCart(item, 1);
                        }}
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
