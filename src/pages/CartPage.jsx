import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';

export function CartPage() {
  const { cart, clearCart, cartCount } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="flex items-center justify-between mt-4 mb-8 pb-4 border-b border-[#e7e2d9] dark:border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Selected Pieces
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white mt-1">
            Shopping Bag ({cartCount})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs font-semibold text-stone-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 max-w-2xl mx-auto px-6 my-8 shadow-xs">
          <div className="w-20 h-20 rounded-3xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-800 dark:text-stone-200 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <ShoppingBag className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white mb-2">
            Your Bag is Empty
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-8 font-normal">
            You haven't selected any curated objects yet. Discover our 48 curated pieces to begin.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map(item => (
              <CartItem key={item.cartItemId} item={item} />
            ))}

            <div className="pt-4 flex justify-between items-center text-xs text-stone-500 dark:text-stone-400">
              <Link to="/products" className="hover:text-blue-600 font-semibold flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
              <span>Prices held for your session</span>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5 sticky top-28">
            <CartSummary />
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#faf9f5] dark:bg-[#12141c] text-[#121316] dark:text-white border border-[#e7e2d9] dark:border-white/15 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-editorial">Empty Entire Bag?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              Are you sure you want to remove all {cartCount} items from your shopping bag? This action cannot be reversed.
            </p>
            <div className="flex gap-2.5 pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
