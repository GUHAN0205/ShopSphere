import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function CategoryPage() {
  const { category: categorySlug } = useParams();

  const currentCategory = getCategoryBySlug(categorySlug);

  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];
    return PRODUCTS.filter(p => {
      const matchesCategory =
        p.category === currentCategory.id || p.category === currentCategory.slug;
      if (!matchesCategory) return false;
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
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
        <h2 className="text-3xl font-bold font-editorial text-stone-900 dark:text-white mb-3">
          Category Not Found
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested category "{categorySlug}" is not part of the active ShopSphere 2.0 catalog.
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
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
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

          <div className="pt-2 text-xs text-blue-400 font-mono font-semibold">
            {categoryProducts.length} Objects Available in Discipline
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
          <span className="font-semibold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#faf9f5] dark:bg-[#181a26] border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-stone-500 cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-stone-700 dark:text-stone-300">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-[#121316] dark:accent-white cursor-pointer"
            />
            <span>In Stock Only</span>
          </label>

          <span className="text-xs text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-stone-200 dark:border-white/10 font-mono font-bold">
            {categoryProducts.length} Products
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={categoryProducts} />
    </div>
  );
}
