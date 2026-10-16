import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Star,
  CheckCircle2,
  PackageOpen
} from 'lucide-react';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { PRODUCTS, getProductsByCategory } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { formatPrice } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

export function CategoryPage() {
  const { category: categorySlug } = useParams();

  const currentCategory = getCategoryBySlug(categorySlug);

  // Filter & Search states
  const [selectedSubcat, setSelectedSubcat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceMax, setPriceMax] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Pagination state: 8 per page
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset filters when route/category changes
  useEffect(() => {
    setSelectedSubcat('all');
    setSearchQuery('');
    setPriceMax(2500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setVisibleCount(PAGE_SIZE);
  }, [categorySlug]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedSubcat, searchQuery, priceMax, minRating, inStockOnly, sortBy]);

  const hasActiveFilters =
    selectedSubcat !== 'all' ||
    searchQuery.trim() !== '' ||
    priceMax < 2500 ||
    minRating > 0 ||
    inStockOnly ||
    sortBy !== 'featured';

  const handleResetFilters = () => {
    setSelectedSubcat('all');
    setSearchQuery('');
    setPriceMax(2500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setVisibleCount(PAGE_SIZE);
  };

  // Base list of all products in this category
  const rawCategoryProducts = useMemo(() => {
    if (!currentCategory) return [];
    return getProductsByCategory(currentCategory.id);
  }, [currentCategory]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return rawCategoryProducts.filter(p => {
      // Subcategory check
      if (selectedSubcat !== 'all') {
        const pSub = p.subcategoryId || '';
        if (pSub !== selectedSubcat) return false;
      }

      // Search query check
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.shortDesc || '').toLowerCase().includes(q);
        const matchesSub = (p.subcategory || '').toLowerCase().includes(q);
        const matchesTag = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSub && !matchesTag) {
          return false;
        }
      }

      // Price ceiling check
      if (p.price > priceMax) return false;

      // Rating check
      if (minRating > 0 && p.rating < minRating) return false;

      // In stock check
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [rawCategoryProducts, selectedSubcat, searchQuery, priceMax, minRating, inStockOnly, sortBy]);

  const pagedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  if (!currentCategory) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
        <h2 className="text-3xl font-bold font-editorial text-stone-900 dark:text-white mb-3">
          Category Not Found
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested category "{categorySlug}" is not part of the active ShopSphere catalog.
        </p>
        <Link to="/products">
          <Button variant="primary" icon={ArrowLeft}>
            Return to All Products
          </Button>
        </Link>
      </div>
    );
  }

  const subcategories = currentCategory.subcategories || [{ id: 'all', name: 'All Objects' }];

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs
        items={[
          { label: 'Catalog', href: '/products' },
          { label: currentCategory.name }
        ]}
      />

      {/* Hero Category Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#121316] text-white my-6 p-8 sm:p-12 md:p-14 shadow-xl">
        <img
          src={currentCategory.image}
          alt={currentCategory.name}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/85 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentCategory.badge || 'Curated Department'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            {currentCategory.name}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            {currentCategory.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-mono font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-400/20">
              {rawCategoryProducts.length} Objects in Discipline
            </span>
            <span className="text-stone-400">
              Free insured express delivery on orders over $150
            </span>
          </div>
        </div>
      </div>

      {/* Subcategory Filter Pills */}
      {subcategories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {subcategories.map(sub => {
            const isSelected = selectedSubcat === sub.id;
            const subCount = sub.id === 'all'
              ? rawCategoryProducts.length
              : rawCategoryProducts.filter(p => p.subcategoryId === sub.id).length;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcat(sub.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] shadow-sm'
                    : 'bg-white dark:bg-white/5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-[#e7e2d9] dark:border-white/10'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white dark:bg-stone-900/20 dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-white/10 text-stone-500 dark:text-stone-400'
                }`}>
                  {subCount}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Controls Bar: In-Category Search, Filters, Sort */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 shadow-xs mb-8 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* In-Category Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${currentCategory.name}...`}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#faf9f5] dark:bg-[#181a26] border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white placeholder-stone-400 text-xs font-medium focus:outline-none focus:border-stone-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2.5 justify-end">
            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-[#faf9f5] dark:bg-[#181a26] border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-stone-500 cursor-pointer"
            >
              <option value="0">All Ratings</option>
              <option value="4.7">★ 4.7 & Above</option>
              <option value="4.8">★ 4.8 & Above</option>
              <option value="4.9">★ 4.9 & Above</option>
            </select>

            {/* In Stock Toggle */}
            <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#faf9f5] dark:bg-[#181a26] border border-[#e7e2d9] dark:border-white/10 cursor-pointer select-none text-xs font-semibold text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-[#121316] dark:accent-white cursor-pointer"
              />
              <span>In Stock</span>
            </label>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#faf9f5] dark:bg-[#181a26] border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-stone-500 cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                isFilterDrawerOpen || priceMax < 2500
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                  : 'bg-[#faf9f5] dark:bg-[#181a26] border-[#e7e2d9] dark:border-white/10 text-stone-700 dark:text-stone-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Price Filter</span>
              {priceMax < 2500 && (
                <span className="text-[10px] font-bold text-blue-600">(${priceMax})</span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Price Range Filter Drawer */}
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-3 border-t border-[#e7e2d9] dark:border-white/10 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-1 max-w-md">
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 whitespace-nowrap">
                    Max Price: <strong>${priceMax}</strong>
                  </span>
                  <input
                    type="range"
                    min="30"
                    max="2500"
                    step="10"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#121316] dark:accent-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPriceMax(2500)}
                    className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white underline cursor-pointer"
                  >
                    Reset Price
                  </button>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-300"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-[#e7e2d9] dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-stone-500 dark:text-stone-400 font-medium">Active:</span>

              {selectedSubcat !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-[11px]">
                  Subcategory: {subcategories.find(s => s.id === selectedSubcat)?.name || selectedSubcat}
                  <button onClick={() => setSelectedSubcat('all')} className="hover:text-rose-600">×</button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-[11px]">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-rose-600">×</button>
                </span>
              )}

              {priceMax < 2500 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-[11px]">
                  ≤ ${priceMax}
                  <button onClick={() => setPriceMax(2500)} className="hover:text-rose-600">×</button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-[11px]">
                  ★ {minRating}+
                  <button onClick={() => setMinRating(0)} className="hover:text-rose-600">×</button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-[11px]">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} className="hover:text-rose-600">×</button>
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#e7e2d9] dark:border-white/10">
        <div className="text-xs text-stone-600 dark:text-stone-400 font-semibold">
          Showing <strong className="text-stone-900 dark:text-white font-mono">{pagedProducts.length}</strong> of{' '}
          <strong className="text-stone-900 dark:text-white font-mono">{filteredProducts.length}</strong> products
          {filteredProducts.length !== rawCategoryProducts.length && (
            <span className="ml-1 text-stone-400">({rawCategoryProducts.length} total in {currentCategory.name})</span>
          )}
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto px-4 bg-white dark:bg-[#12141c] rounded-3xl border border-[#e7e2d9] dark:border-white/10 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 mx-auto flex items-center justify-center text-stone-400 mb-4">
            <PackageOpen className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white mb-2">
            No Matching Objects Found
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
            We couldn’t find any items in <strong className="text-stone-800 dark:text-stone-200">{currentCategory.name}</strong> matching your active search or filter combinations.
          </p>
          <Button variant="primary" icon={RotateCcw} onClick={handleResetFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pagedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Pagination */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                className="px-8 py-3 rounded-2xl bg-white dark:bg-[#151722] hover:bg-stone-50 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/15 text-xs font-bold text-stone-900 dark:text-white shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Load More Objects ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
