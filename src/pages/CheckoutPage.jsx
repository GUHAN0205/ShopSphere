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
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs
        items={[
          { label: 'Shopping Bag', href: '/cart' },
          { label: 'Express Checkout' }
        ]}
      />

      <div className="mt-4 mb-8 pb-4 border-b border-[#e7e2d9] dark:border-white/10">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Simulated Settlement
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white mt-1">
          Express Checkout
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          Complete your acquisition simulation. This is a frontend demo sandbox with no real payment charges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-[#e7e2d9] dark:border-white/10 pb-4">
              <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-white">
                Order Review ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h3>
              <Link to="/cart" className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
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
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100 dark:bg-stone-900 border border-[#e7e2d9]/60 dark:border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-stone-900 dark:text-white truncate">{item.name}</div>
                    <div className="text-stone-500 dark:text-stone-400 text-[11px]">
                      Qty: {item.quantity} • Finish: {item.selectedColor}
                    </div>
                  </div>
                  <div className="font-bold text-stone-900 dark:text-white text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-[#e7e2d9] dark:border-white/10 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-white">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-orange-600 dark:text-orange-400 font-semibold">
                  <span>Promotional Savings</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Courier Dispatch</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  {shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-stone-900 dark:text-white">{formatPrice(taxAmount)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-[#e7e2d9] dark:border-white/10 pt-4 flex items-baseline justify-between">
              <span className="text-xs uppercase font-bold text-stone-500 dark:text-stone-400">Total Settlement</span>
              <span className="text-2xl font-bold font-editorial text-stone-900 dark:text-white">{formatPrice(total)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Simulated Order Security</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                This transaction processes simulated orders with local mock data. No real payment details are charged or transmitted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
