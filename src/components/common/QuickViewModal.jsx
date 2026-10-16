import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Button } from './Button';
import { Badge } from './Badge';

export function QuickViewModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#faf9f5] dark:bg-[#12141c] text-[#121316] dark:text-[#f2f4f8] border border-[#e7e2d9] dark:border-white/15 shadow-2xl z-10 p-6 md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f4f2ec] dark:bg-stone-900 border border-[#e7e2d9] dark:border-white/10 group">
                  <img
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="cobalt">{product.badge}</Badge>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? 'border-blue-600 dark:border-blue-400 scale-105'
                            : 'border-[#e7e2d9] dark:border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
                    {product.categoryName || product.category}
                  </span>
                  <h3 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white mt-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="text-sm font-semibold ml-1 text-stone-900 dark:text-white">{product.rating}</span>
                    </div>
                    <span className="text-xs text-stone-500 dark:text-stone-400">({product.reviewCount} customer reviews)</span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount} available)
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-stone-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-stone-400 dark:text-stone-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-500/20">
                        SAVE {discount}%
                      </span>
                    </>
                  )}
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                      Finish: <span className="text-stone-900 dark:text-white font-bold">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            selectedColor === color
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 font-semibold'
                              : 'border-[#e7e2d9] dark:border-white/10 bg-white dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#e7e2d9] dark:border-white/15 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-2 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 text-sm font-semibold text-stone-900 dark:text-white min-w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(q => Math.min(product.stockCount || 99, q + 1))}
                        className="px-3 py-2 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <Button
                      variant="primary"
                      className="flex-1"
                      icon={ShoppingBag}
                      onClick={handleAddToCart}
                    >
                      Add to Cart • {formatPrice(product.price * quantity)}
                    </Button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3 rounded-xl border transition-all ${
                        isSaved
                          ? 'bg-orange-50 border-orange-300 text-orange-600 dark:bg-orange-500/20 dark:border-orange-500'
                          : 'bg-white dark:bg-white/5 border-[#e7e2d9] dark:border-white/10 text-stone-600 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-orange-600' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Free 30-Day Returns & 2-Yr Warranty
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      onClick={onClose}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Full Specifications</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
