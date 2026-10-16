import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, Trash2, ShoppingBag, ChevronUp, ChevronDown, Check, Star } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { Button } from './Button';

export function CompareDrawer() {
  const { compareItems, isDrawerOpen, setIsDrawerOpen, removeFromCompare, clearCompare } = useCompare();
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
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel bg-[#0d1124]/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs md:text-sm">
            <Scale className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Comparing {compareItems.length} {compareItems.length === 1 ? 'item' : 'items'}</span>
          </div>

          <div className="flex items-center -space-x-2 overflow-hidden">
            {compareItems.map(item => (
              <img
                key={item.id}
                src={item.images[0]}
                alt={item.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-[#0d1124]"
              />
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-medium px-3 py-1.5 rounded-xl border border-cyan-500/30 transition-colors"
          >
            Compare Specs
          </button>

          <button
            onClick={clearCompare}
            className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors"
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel bg-[#0d1124] border border-cyan-500/30 shadow-2xl p-6 md:p-8 z-10"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Side-by-Side Product Comparison</h3>
                    <p className="text-xs text-slate-400">Comparing specifications, acoustic and hardware metrics</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={clearCompare}
                    className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
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
                    className="relative rounded-2xl glass-card bg-slate-900/60 p-5 border border-white/10 flex flex-col justify-between"
                  >
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white bg-black/40 hover:bg-black/60 transition-colors"
                      title="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 mb-4 border border-white/10">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                        {item.categoryName}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1 line-clamp-1">
                        {item.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-amber-400 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-semibold ml-1">{item.rating}</span>
                        </div>
                        <span className="text-xs text-slate-500">({item.reviewCount} reviews)</span>
                      </div>

                      <div className="text-xl font-extrabold text-white mt-3">
                        {formatPrice(item.price)}
                      </div>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {item.shortDesc}
                      </p>

                      {/* Specs List */}
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
                        {item.specifications && Object.entries(item.specifications).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400">{k}:</span>
                            <span className="font-medium text-white text-right ml-2 truncate max-w-[150px]">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        icon={ShoppingBag}
                        onClick={() => {
                          addToCart(item, 1);
                        }}
                      >
                        Add to Cart
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
