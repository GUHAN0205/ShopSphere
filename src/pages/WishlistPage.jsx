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
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex items-center justify-between mt-4 mb-8 pb-4 border-b border-[#e7e2d9] dark:border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Personal Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white mt-1">
            Saved Wishlist ({wishlistCount})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-stone-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 max-w-2xl mx-auto px-6 my-8 shadow-xs">
          <div className="w-20 h-20 rounded-3xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Heart className="w-10 h-10 fill-orange-600/20" />
          </div>
          <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-8 font-normal">
            Save flagship acoustic hardware, avant-garde streetwear, and precision timepieces to review or purchase anytime.
          </p>
          <Link to="/products">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="shadow-md"
            >
              Explore Catalog
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="rounded-2xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-4 flex flex-col justify-between hover:border-stone-400 dark:hover:border-white/20 transition-all shadow-xs group"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-3 border border-[#e7e2d9]/60 dark:border-white/10">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/80 dark:bg-black/60 text-stone-600 dark:text-stone-300 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
                  {product.categoryName || product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="block text-base font-bold font-editorial text-stone-900 dark:text-white hover:text-blue-600 transition-colors truncate mt-0.5"
                >
                  {product.name}
                </Link>

                <div className="text-base font-extrabold text-stone-900 dark:text-white mt-1">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#e7e2d9] dark:border-white/10">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full shadow-xs"
                  icon={ShoppingBag}
                  onClick={() => handleMoveToCart(product)}
                >
                  Move to Bag
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
