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
  ChevronRight
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
  const { recordView } = useRecentlyViewed();

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
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-3">Product Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The requested instrument does not exist or may have been retired from the active roster.
        </p>
        <Link to="/products">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

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
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: product.categoryName, href: `/categories/${product.category}` },
          { label: product.name }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 my-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display with zoom on hover */}
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden glass-card bg-slate-900 border border-white/10 group shadow-2xl">
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.badge && (
                <Badge variant="cyan" size="sm">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="rose" size="sm">
                  Save {discount}%
                </Badge>
              )}
            </div>

            {/* Share action */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-2xl bg-black/50 hover:bg-black/80 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 transition-colors z-10"
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
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === idx
                      ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20'
                      : 'border-white/10 opacity-60 hover:opacity-100'
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
                className="text-xs font-bold uppercase tracking-wider text-cyan-400 hover:underline"
              >
                {product.categoryName}
              </Link>
              <div className="flex items-center text-emerald-400 text-xs font-medium gap-1">
                <Check className="w-4 h-4" />
                <span>{product.inStock ? `In Stock (${product.stockCount} units)` : 'Sold Out'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span className="text-sm font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} verified client evaluations)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-white font-display">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  {discount}% Discount
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Color Finish Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Finish Selection: <span className="text-white font-medium">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === color
                        ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300 shadow-sm shadow-cyan-500/20'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'
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
              <div className="flex items-center border border-white/15 rounded-xl bg-slate-950/80 overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-slate-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 text-sm font-bold text-white min-w-10 text-center font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stockCount || 99, q + 1))}
                  className="px-3.5 py-3 text-slate-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <Button
                variant="primary"
                size="lg"
                className="flex-1 glow-cyan"
                icon={ShoppingBag}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart • {formatPrice(product.price * quantity)}
              </Button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-pink-400' : ''}`} />
              </button>

              {/* Compare Toggle */}
              <button
                onClick={() => toggleCompare(product)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCompared
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title="Toggle compare"
              >
                <Scale className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Service Trust Micro Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Complimentary Courier on $150+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>2-Year Global Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>30-Day Hassle-Free Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Factory Calibrated Tolerance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Specification & Features Tabs */}
      <div className="my-16 rounded-3xl glass-panel bg-slate-900/60 border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="flex border-b border-white/10 gap-6">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'features', label: 'Engineered Features' },
            { id: 'shipping', label: 'Logistics & Warranty' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
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
                <div key={key} className="flex justify-between py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm">
                  <span className="text-slate-400">{key}</span>
                  <span className="font-semibold text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && product.features && (
            <ul className="space-y-3">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                All orders are dispatched from our climate-controlled fulfillment center within 24 business hours. Fragile optical and acoustic items receive specialized custom foam stabilization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white mb-1">Standard Courier</div>
                  <div className="text-xs text-slate-400">3–5 business days ($12 or Free over $150)</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white mb-1">Express Priority</div>
                  <div className="text-xs text-slate-400">1–2 business days with white glove delivery</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white mb-1">30-Day Guarantee</div>
                  <div className="text-xs text-slate-400">Full exchange privilege in original packaging</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Rail */}
      {relatedProducts.length > 0 && (
        <div className="my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Sector Companions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                Related Instruments
              </h2>
            </div>
            <Link
              to={`/categories/${product.category}`}
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
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
    </div>
  );
}
