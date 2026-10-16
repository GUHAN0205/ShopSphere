import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Scale, Star } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { handleImageError } from '../../utils/imageFallback';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { Badge } from '../common/Badge';
import { QuickViewModal } from '../common/QuickViewModal';

export function ProductCard({ product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare ? isInCompare(product.id) : false;
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleCompare) toggleCompare(product);
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="group relative rounded-2xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 hover:border-stone-400 dark:hover:border-white/20 p-3 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
      >
        <div>
          {/* Image & Action Overlay */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f4f2ec] dark:bg-stone-900 border border-[#e7e2d9]/60 dark:border-white/5">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse" />
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(true);
                handleImageError(e);
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <Badge variant={product.badge === 'New Arrival' || product.badge === 'New' ? 'cobalt' : 'coral'} size="xs">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="coral" size="xs">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
                isSaved
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white/80 dark:bg-black/60 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-black/80'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            {/* Quick Action Floating Bar (Slide up on hover) */}
            <div className="absolute inset-x-2 bottom-2.5 flex items-center justify-center gap-1.5 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <button
                onClick={handleOpenQuickView}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-xs font-semibold text-stone-900 dark:text-white border border-[#e7e2d9] dark:border-white/15 backdrop-blur-md shadow-md transition-transform active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Quick View</span>
              </button>

              <button
                onClick={handleToggleCompare}
                className={`p-2 rounded-xl text-xs backdrop-blur-md border transition-all active:scale-95 ${
                  isCompared
                    ? 'bg-blue-600 text-white border-blue-500 font-bold'
                    : 'bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-stone-700 dark:text-stone-300 border-[#e7e2d9] dark:border-white/15'
                }`}
                title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-3 pb-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="uppercase text-[10px] font-bold tracking-wider text-stone-500 dark:text-stone-400">
                {product.categoryName || product.category}
              </span>
              <div className="flex items-center text-amber-500 gap-1 text-[11px] font-semibold">
                <Star className="w-3 h-3 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-stone-400 dark:text-stone-500 font-normal">({product.reviewCount})</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>
        </div>

        {/* Price & Add to Cart Bottom Bar */}
        <div className="pt-3 mt-2 border-t border-[#e7e2d9] dark:border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-extrabold text-stone-900 dark:text-white">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[11px] text-stone-400 dark:text-stone-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121316] hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-[#121316] font-semibold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
