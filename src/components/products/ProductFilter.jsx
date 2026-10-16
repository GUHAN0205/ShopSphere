import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, Check, Star } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, spec, or tag..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-1 md:flex-none">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900/80 border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="featured">Featured & Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/5 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filter Panel (Desktop Always, Mobile Toggled) */}
      <div className={`p-4 rounded-2xl glass-panel bg-slate-900/60 border border-white/10 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                All Items
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span>Max Price</span>
              <span className="text-cyan-400 font-bold">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="25"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>$50</span>
              <span>$1000</span>
              <span>$2000+</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
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
                  className={`flex-1 py-1 rounded-lg text-xs font-medium transition-all ${
                    minRating === opt.value
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Toggle and Result Count */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 font-mono">
              {totalResults} {totalResults === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
