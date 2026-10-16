import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Scale, Star, Check } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
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
  const isCompared = isInCompare(product.id);
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
    toggleCompare(product);
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="group relative rounded-2xl glass-card bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 p-3.5 flex flex-col justify-between overflow-hidden shadow-xl"
      >
        <div>
          {/* Image & Action Overlay */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-white/5">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-800/60 animate-pulse" />
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <Badge variant="cyan" size="xs">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="rose" size="xs">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
                isSaved
                  ? 'bg-pink-500/90 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            {/* Quick Action Floating Bar (Slide up on hover) */}
            <div className="absolute inset-x-2 bottom-2.5 flex items-center justify-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <button
                onClick={handleOpenQuickView}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black text-xs font-medium text-white border border-white/15 backdrop-blur-md shadow-lg transition-transform active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quick View</span>
              </button>

              <button
                onClick={handleToggleCompare}
                className={`p-2 rounded-xl text-xs backdrop-blur-md border transition-all active:scale-95 ${
                  isCompared
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                    : 'bg-black/80 hover:bg-black text-white border-white/15'
                }`}
                title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-3.5 pb-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="uppercase text-[10px] font-bold tracking-wider text-cyan-400">
                {product.categoryName}
              </span>
              <div className="flex items-center text-amber-400 gap-1 text-[11px] font-semibold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.reviewCount})</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`} className="block group-hover:text-cyan-300 transition-colors">
              <h3 className="font-semibold text-white text-sm line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>
        </div>

        {/* Price & Add to Cart Bottom Bar */}
        <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-extrabold text-white">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[11px] text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
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
