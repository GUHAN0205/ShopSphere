import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Heart,
  Scale,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  ChevronRight,
  Clock
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatPrice, calculateDiscount } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/products/ProductCard';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'features' | 'shipping'

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const { toastInfo } = useToast();
  const { recentlyViewed, recordView } = useRecentlyViewed();

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setActiveImage(0);
      setSelectedColor(product.colors ? product.colors[0] : 'Standard');
      setQuantity(1);
      recordView(product);
    }
  }, [product, id, recordView]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
        <h2 className="text-3xl font-bold font-editorial text-stone-900 dark:text-white mb-3">Product Not Found</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested object does not exist or may have been retired from the active roster.
        </p>
        <Link to="/products">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare ? isInCompare(product.id) : false;

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const recentOthers = (recentlyViewed || [])
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toastInfo('Link Copied', 'Product link copied to clipboard.');
    }
  };

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs
        items={[
          { label: 'Catalog', href: '/products' },
          { label: product.categoryName || product.category, href: `/categories/${product.category}` },
          { label: product.name }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 my-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display */}
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 group shadow-md">
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.badge && (
                <Badge variant="cobalt" size="sm">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="coral" size="sm">
                  Save {discount}%
                </Badge>
              )}
            </div>

            {/* Share action */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 backdrop-blur-md text-stone-700 dark:text-stone-300 hover:text-stone-900 border border-[#e7e2d9] dark:border-white/10 transition-colors z-10 cursor-pointer shadow-xs"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === idx
                      ? 'border-blue-600 dark:border-blue-400 scale-102 shadow-xs'
                      : 'border-[#e7e2d9] dark:border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Pricing, Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Link
                to={`/categories/${product.category}`}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
              >
                {product.categoryName || product.category}
              </Link>
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-semibold gap-1">
                <Check className="w-4 h-4" />
                <span>{product.inStock ? `In Stock (${product.stockCount} available)` : 'Sold Out'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-500 mr-1" />
                <span className="text-sm font-bold text-stone-900 dark:text-white">{product.rating}</span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                ({product.reviewCount} customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#151722] border border-[#e7e2d9] dark:border-white/10 flex items-baseline gap-3 shadow-xs">
            <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-editorial">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-500/20">
                  {discount}% Discount
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Color Finish Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2.5">
                Finish Selection: <span className="text-stone-900 dark:text-white font-semibold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300'
                        : 'border-[#e7e2d9] dark:border-white/10 bg-white dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Cart Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#e7e2d9] dark:border-white/15 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 text-sm font-bold text-stone-900 dark:text-white min-w-10 text-center font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stockCount || 99, q + 1))}
                  className="px-3.5 py-3 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <Button
                variant="primary"
                size="lg"
                className="flex-1 shadow-md"
                icon={ShoppingBag}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Bag • {formatPrice(product.price * quantity)}
              </Button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-orange-50 border-orange-300 text-orange-600 dark:bg-orange-500/20 dark:border-orange-500'
                    : 'bg-white dark:bg-white/5 border-[#e7e2d9] dark:border-white/10 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-orange-600' : ''}`} />
              </button>

              {/* Compare Toggle */}
              <button
                onClick={() => toggleCompare(product)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isCompared
                    ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500'
                    : 'bg-white dark:bg-white/5 border-[#e7e2d9] dark:border-white/10 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Toggle compare"
              >
                <Scale className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Service Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#e7e2d9] dark:border-white/10 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Complimentary Delivery on $150+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>2-Year Manufacturer Assurance</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>30-Day Hassle-Free Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Curated Provenance Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Features Tabs */}
      <div className="my-16 rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-10 shadow-xs">
        <div className="flex border-b border-[#e7e2d9] dark:border-white/10 gap-6">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'features', label: 'Engineered Features' },
            { id: 'shipping', label: 'Logistics & Care' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {activeTab === 'specs' && product.specifications && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2.5 px-3.5 rounded-xl bg-stone-50 dark:bg-white/[0.02] border border-[#e7e2d9]/60 dark:border-white/5 text-sm">
                  <span className="text-stone-500 dark:text-stone-400">{key}</span>
                  <span className="font-semibold text-stone-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && product.features && (
            <ul className="space-y-3">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                All orders are dispatched from our fulfillment center within 24 business hours. Delicate optics and acoustic equipment receive specialized custom foam stabilization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/5">
                  <div className="font-bold text-stone-900 dark:text-white mb-1">Standard Courier</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">3–5 business days ($12 or Free over $150)</div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/5">
                  <div className="font-bold text-stone-900 dark:text-white mb-1">Express Priority</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">1–2 business days tracked delivery</div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/5">
                  <div className="font-bold text-stone-900 dark:text-white mb-1">30-Day Window</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Hassle-free exchange in original packaging</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Rail */}
      {relatedProducts.length > 0 && (
        <div className="my-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e7e2d9] dark:border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Category Companions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white mt-0.5">
                Related Objects
              </h2>
            </div>
            <Link
              to={`/categories/${product.category}`}
              className="text-xs font-semibold text-stone-900 dark:text-white hover:text-blue-600 flex items-center gap-1"
            >
              <span>Explore More</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed Products Section */}
      {recentOthers.length > 0 && (
        <div className="my-16 pt-8 border-t border-[#e7e2d9] dark:border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-stone-400" />
            <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white">
              Recently Viewed
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentOthers.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
