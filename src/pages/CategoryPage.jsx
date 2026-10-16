import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { Sparkles, ArrowLeft, SlidersHorizontal } from 'lucide-react';

export function CategoryPage() {
  const { category: categorySlug } = useParams();

  const currentCategory = CATEGORIES.find(c => c.slug === categorySlug);

  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];
    return PRODUCTS.filter(p => {
      if (p.category !== currentCategory.id) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [currentCategory, sortBy, inStockOnly]);

  if (!currentCategory) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-3">Sector Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
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

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Categories', href: '/products' },
          { label: currentCategory.name }
        ]}
      />

      {/* Hero Category Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card bg-slate-900 border border-white/10 my-6 p-8 sm:p-12 md:p-16 shadow-2xl">
        <img
          src={currentCategory.image}
          alt={currentCategory.name}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070913] via-[#070913]/90 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentCategory.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            {currentCategory.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {currentCategory.description}
          </p>

          <div className="pt-2 text-xs text-cyan-400 font-mono font-semibold">
            {categoryProducts.length} Available Releases in Sector
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl glass-panel bg-slate-900/60 border border-white/10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-white/10 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
          />
          <span>In-Stock Only</span>
        </label>
      </div>

      {/* Category Products */}
      <ProductGrid products={categoryProducts} />
    </div>
  );
}
