import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { PackageX, RotateCcw, ArrowDown } from 'lucide-react';
import { Button } from '../common/Button';

export function ProductGrid({
  products = [],
  isLoading = false,
  onResetFilters = null,
  emptyMessage = "No products found matching your current filter criteria."
}) {
  const [visibleCount, setVisibleCount] = useState(16);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-white dark:bg-[#12141c] p-4 border border-[#e7e2d9] dark:border-white/10 space-y-4 animate-pulse">
            <div className="aspect-square bg-stone-200 dark:bg-stone-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
              <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-4/5" />
              <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-full" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/4" />
              <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 my-8 shadow-xs"
      >
        <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-600 dark:text-stone-300 mb-4 shadow-xs">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white mb-2">No Matching Products</h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mb-6">
          {emptyMessage} Try adjusting your criteria, broadening the price slider, or resetting your category selections.
        </p>
        {onResetFilters && (
          <Button
            variant="secondary"
            icon={RotateCcw}
            onClick={onResetFilters}
          >
            Reset All Filters
          </Button>
        )}
      </motion.div>
    );
  }

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Pagination Bar */}
      {hasMore && (
        <div className="pt-6 border-t border-[#e7e2d9] dark:border-white/10 flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Showing {displayedProducts.length} of {products.length} products
          </p>
          <Button
            variant="secondary"
            icon={ArrowDown}
            onClick={() => setVisibleCount(c => c + 16)}
            className="px-8"
          >
            Load Next 16 Products
          </Button>
        </div>
      )}
    </div>
  );
}
