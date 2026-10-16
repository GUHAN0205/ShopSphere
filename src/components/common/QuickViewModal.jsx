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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel bg-[#0d1124] border border-white/15 shadow-2xl z-10 p-6 md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group">
                  <img
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="cyan">{product.badge}</Badge>
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
                            ? 'border-cyan-400 scale-105 ring-2 ring-cyan-400/20'
                            : 'border-white/10 opacity-70 hover:opacity-100'
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
                  <span className="text-xs uppercase font-semibold tracking-wider text-cyan-400">
                    {product.categoryName}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-sm font-semibold ml-1 text-white">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount} available)
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-slate-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        SAVE {discount}%
                      </span>
                    </>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Finish: <span className="text-white">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            selectedColor === color
                              ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
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
                    <div className="flex items-center border border-white/15 rounded-xl bg-slate-900/80 overflow-hidden">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-2 text-slate-400 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 text-sm font-semibold text-white min-w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(q => Math.min(product.stockCount || 99, q + 1))}
                        className="px-3 py-2 text-slate-400 hover:text-white transition-colors"
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
                          ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-pink-400' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> Free 30-Day Returns & 2-Yr Warranty
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      onClick={onClose}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
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
