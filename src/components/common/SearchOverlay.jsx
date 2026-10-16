import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { formatPrice } from '../../utils/formatters';

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.tags?.some(t => t.toLowerCase().includes(q))
        );
      }).slice(0, 6);

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/products/${productId}`);
  };

  const handleCategorySelect = (categorySlug) => {
    onClose();
    navigate(`/categories/${categorySlug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl rounded-2xl bg-[#faf9f5] dark:bg-[#12141c] text-[#121316] dark:text-[#f2f4f8] border border-[#e7e2d9] dark:border-white/10 shadow-2xl shadow-black/15 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 py-4 border-b border-[#e7e2d9] dark:border-white/10 bg-white/70 dark:bg-white/[0.02]">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across 48+ curated products, categories, styles..."
                className="w-full bg-transparent px-3 text-base text-[#121316] dark:text-white placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-lg hover:bg-stone-200/50 dark:hover:bg-white/10 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-stone-500 dark:text-slate-400 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 px-2 py-1 rounded">
                ESC
              </kbd>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {query.trim() === '' ? (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Explore All 8 Categories</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10 text-xs font-medium text-stone-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                      >
                        <Tag className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Wireless Headphones', 'Mechanical Keyboard', 'Ceramic Pour-Over', 'Minimalist Chronograph', 'Weekend Duffle', 'Leather Chelsea'].map(item => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="text-xs text-stone-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2.5 rounded-lg bg-stone-100/60 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                        >
                          "{item}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Found {filteredProducts.length} Results
                  </div>
                  {filteredProducts.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="group flex items-center gap-3.5 p-2.5 rounded-xl bg-white dark:bg-white/[0.02] hover:bg-stone-100/80 dark:hover:bg-white/5 border border-[#e7e2d9]/60 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-white/10 cursor-pointer transition-all duration-150"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded-lg bg-stone-100 dark:bg-slate-800 shrink-0 border border-stone-200 dark:border-white/10 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {prod.name}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                            {prod.category}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-slate-400 truncate mt-0.5">
                          {prod.shortDesc}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-stone-900 dark:text-white">
                          {formatPrice(prod.price)}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all ml-auto mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-stone-500 dark:text-slate-400">
                  <p className="text-sm font-medium">No products found matching "{query}"</p>
                  <p className="text-xs text-stone-400 dark:text-slate-500 mt-1">Try searching for headphones, leather, sneakers, or watch</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-stone-100/60 dark:bg-white/[0.02] border-t border-[#e7e2d9] dark:border-white/10 flex items-center justify-between text-xs text-stone-500 dark:text-slate-500">
              <span>Quick Navigation</span>
              <button
                onClick={() => {
                  onClose();
                  navigate('/products');
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Browse All 48 Products</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
