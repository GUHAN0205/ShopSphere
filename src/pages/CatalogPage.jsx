import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductFilter } from '../components/products/ProductFilter';
import { ProductGrid } from '../components/products/ProductGrid';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('cat') || searchParams.get('category') || 'all'
  );
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(
    searchParams.get('filter') === 'bestsellers' ? 4.7 : 0
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get('filter') === 'new' ? 'newest' : 'featured'
  );
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync search params if present
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);

    const cat = searchParams.get('cat') || searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);

    const filter = searchParams.get('filter');
    if (filter === 'new') {
      setSortBy('newest');
    } else if (filter === 'bestsellers') {
      setMinRating(4.7);
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange(2000);
    setMinRating(0);
    setSortBy('featured');
    setInStockOnly(false);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Search query check
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesDesc = prod.shortDesc.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        const matchesTag = prod.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTag) {
          return false;
        }
      }

      // Category check
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Price check
      if (prod.price > priceRange) {
        return false;
      }

      // Rating check
      if (minRating > 0 && prod.rating < minRating) {
        return false;
      }

      // In stock check
      if (inStockOnly && !prod.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, priceRange, minRating, sortBy, inStockOnly]);

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs items={[{ label: 'Catalog Index' }]} />

      <div className="mt-4 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          The Complete Archive
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white mt-1 tracking-tight">
          Curated Catalog
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-2xl font-normal">
          Explore all 48 catalog objects organized across audio instruments, precision horology, technical apparel, ceramics, and daily essentials.
        </p>
      </div>

      <ProductFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      <ProductGrid
        products={filteredProducts}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
