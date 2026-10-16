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
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="flex items-center justify-between mt-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Current Selection
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-1">
            Shopping Bag ({cartCount})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center rounded-3xl glass-panel bg-slate-900/40 border border-white/10 max-w-2xl mx-auto px-6 my-8">
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/10">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">
            Your Bag is Empty
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
            You haven't added any instruments or hardware to your selection yet. Explore our curated collections to get started.
          </p>
          <Link to="/products">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="glow-cyan"
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

            <div className="pt-4 flex justify-between items-center text-xs text-slate-400">
              <Link to="/products" className="hover:text-cyan-400 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
              <span>Prices guaranteed for 30 minutes</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0d1124] border border-white/15 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Empty Entire Bag?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
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
                Yes, Empty Bag
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
