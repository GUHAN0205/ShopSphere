import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';

export function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex items-center justify-between mt-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            Personal Curation
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-1">
            Saved Wishlist ({wishlistCount})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center rounded-3xl glass-panel bg-slate-900/40 border border-white/10 max-w-2xl mx-auto px-6 my-8">
          <div className="w-20 h-20 rounded-3xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-500/10">
            <Heart className="w-10 h-10 fill-pink-500/20" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
            Save flagship acoustic hardware, avant-garde streetwear, and precision timepieces to review or purchase anytime.
          </p>
          <Link to="/products">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="glow-cyan"
            >
              Explore All Drops
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="rounded-2xl glass-card bg-slate-900/60 border border-white/10 p-4 flex flex-col justify-between hover:border-pink-500/40 transition-all shadow-xl group"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 mb-3 border border-white/5">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-black/60 text-slate-300 hover:text-rose-400 hover:bg-black/90 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                  {product.categoryName || product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="block text-base font-bold text-white hover:text-cyan-300 transition-colors truncate mt-0.5"
                >
                  {product.name}
                </Link>

                <div className="text-base font-extrabold text-white mt-2">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  icon={ShoppingBag}
                  onClick={() => handleMoveToCart(product)}
                >
                  Move to Bag
                </Button>
                <Link to={`/products/${product.id}`}>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
