import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function CheckoutPage() {
  const { cart, subtotal, discountAmount, shippingCharge, taxAmount, total, cartCount } = useCart();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Shopping Bag', href: '/cart' },
          { label: 'Express Checkout' }
        ]}
      />

      <div className="mt-4 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Encrypted Gateway
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-1">
          Express Checkout
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your acquisition securely. All entries are encrypted with zero persistent card retention.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="rounded-3xl glass-panel bg-slate-900/70 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white font-display">
                Order Review ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h3>
              <Link to="/cart" className="text-xs text-cyan-400 hover:underline">
                Edit Bag
              </Link>
            </div>

            {/* Items Mini List */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{item.name}</div>
                    <div className="text-slate-400 text-[11px]">
                      Qty: {item.quantity} • Finish: {item.selectedColor}
                    </div>
                  </div>
                  <div className="font-bold text-white text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="font-medium text-white">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-cyan-400">
                  <span>Promotional Savings</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-300">
                <span>Courier Dispatch</span>
                <span className="font-medium text-white">
                  {shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium text-white">{formatPrice(taxAmount)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Amount Due</span>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-display">
                  {formatPrice(total)}
                </span>
                <span className="block text-[10px] text-slate-400">USD, inclusive of duties</span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero-risk 30-day evaluation with free returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Complimentary tracked shipping with impact telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Simulated sandbox mode — no live transaction occurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
