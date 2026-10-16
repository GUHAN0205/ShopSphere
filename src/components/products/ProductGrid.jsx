import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { PackageX, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

export function ProductGrid({
  products = [],
  isLoading = false,
  onResetFilters = null,
  emptyMessage = "No products found matching your criteria."
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl glass-card bg-slate-900/60 p-4 border border-white/5 space-y-4 animate-pulse">
            <div className="aspect-square bg-slate-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-1/3" />
              <div className="h-5 bg-slate-800 rounded w-4/5" />
              <div className="h-3 bg-slate-800 rounded w-full" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-slate-800 rounded w-1/4" />
              <div className="h-8 bg-slate-800 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 my-8"
      >
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Matching Products</h3>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          {emptyMessage} Try adjusting your filters, clearing search queries, or expanding the price range.
        </p>
        {onResetFilters && (
          <Button
            variant="secondary"
            icon={RotateCcw}
            onClick={onResetFilters}
          >
            Clear All Filters
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
}
