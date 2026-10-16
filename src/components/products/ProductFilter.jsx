import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';

export function ProductFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  onResetFilters,
  totalResults
}) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    priceRange < 2000 ||
    minRating > 0 ||
    inStockOnly ||
    sortBy !== 'featured';

  return (
    <div className="space-y-4 mb-8">
      {/* Search and Quick Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search across all ${PRODUCTS.length} products, tags, specs...`}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:border-stone-500 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 text-xs font-semibold text-stone-800 dark:text-stone-200 shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 flex-1 md:flex-none">
            <span className="hidden sm:inline font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-500 cursor-pointer shadow-xs"
            >
              <option value="featured">Featured & Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals First</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filter Panel */}
      <div className={`p-5 rounded-2xl bg-[#faf9f5] dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 shadow-xs ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          
          {/* Category Filter */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              Browse by Category (8)
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] shadow-xs'
                    : 'bg-white dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10'
                }`}
              >
                All ({PRODUCTS.length})
              </button>
              {CATEGORIES.map(cat => {
                const count = PRODUCTS.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] shadow-xs'
                        : 'bg-white dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10'
                    }`}
                  >
                    {cat.shortName || cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              <span>Price Ceiling</span>
              <span className="text-stone-900 dark:text-white font-mono font-extrabold">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="25"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#121316] dark:accent-white cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>$50</span>
              <span>$1000</span>
              <span>$2000</span>
            </div>
          </div>

          {/* Minimum Rating & Stock Toggle */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-1.5">
                {[
                  { label: 'All', value: 0 },
                  { label: '4.5+ ★', value: 4.5 },
                  { label: '4.8+ ★', value: 4.8 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setMinRating(opt.value)}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      minRating === opt.value
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold'
                        : 'bg-white dark:bg-white/5 text-stone-600 dark:text-stone-400 border border-[#e7e2d9] dark:border-white/10 hover:bg-stone-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#121316] dark:accent-white cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>

              <span className="text-xs text-stone-600 dark:text-stone-300 bg-white dark:bg-white/5 px-2.5 py-1 rounded-md border border-[#e7e2d9] dark:border-white/10 font-mono font-bold">
                {totalResults} {totalResults === 1 ? 'Piece' : 'Pieces'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
