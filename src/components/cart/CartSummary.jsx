import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag, ArrowRight, ShieldCheck, Lock, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../common/Button';

export function CartSummary() {
  const {
    subtotal,
    discountAmount,
    shippingCharge,
    taxAmount,
    total,
    cart,
    appliedPromo,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-md">
      <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white">
        Order Summary
      </h3>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {amountToFreeShipping > 0
              ? `Add ${formatPrice(amountToFreeShipping)} more for complimentary shipping`
              : 'You unlocked complimentary Express Courier!'}
          </span>
          <span className="font-mono text-stone-900 dark:text-white font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Line Item Breakdown */}
      <div className="space-y-3 text-sm border-b border-[#e7e2d9] dark:border-white/10 pb-6">
        <div className="flex justify-between text-stone-600 dark:text-stone-300">
          <span>Subtotal</span>
          <span className="font-semibold text-stone-900 dark:text-white">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-orange-600 dark:text-orange-400 font-semibold">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Discount ({appliedPromo?.description || 'Promo'})</span>
            </span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-stone-600 dark:text-stone-300">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-stone-900 dark:text-white">
            {shippingCharge === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-xs">FREE</span>
            ) : (
              formatPrice(shippingCharge)
            )}
          </span>
        </div>

        <div className="flex justify-between text-stone-600 dark:text-stone-300">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-semibold text-stone-900 dark:text-white">{formatPrice(taxAmount)}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div>
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Voucher code (e.g. BEYOND20)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-[#e7e2d9] dark:border-white/15 text-stone-900 dark:text-white placeholder-stone-400 text-xs font-mono uppercase focus:outline-none focus:border-stone-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-bold text-stone-900 dark:text-white transition-colors cursor-pointer"
          >
            Apply
          </button>
        </form>

        {promoError && (
          <p className="text-xs text-rose-500 mt-1.5">{promoError}</p>
        )}

        {appliedPromo && (
          <div className="mt-2 flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
            <span className="flex items-center gap-1.5 font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {appliedPromo.code} applied
            </span>
            <button
              onClick={removePromoCode}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Suggestion hint */}
        <div className="text-[11px] text-stone-400 mt-2">
          Available codes: <span className="font-mono text-stone-700 dark:text-stone-300 font-bold">BEYOND20</span> (20% off), <span className="font-mono text-stone-700 dark:text-stone-300 font-bold">FREESHIP</span>
        </div>
      </div>

      {/* Total Section */}
      <div className="pt-4 border-t border-[#e7e2d9] dark:border-white/10 flex items-baseline justify-between">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">Total Due</span>
          <div className="text-xs text-stone-400">Including tax & logistics</div>
        </div>
        <div className="text-3xl font-bold font-editorial text-stone-900 dark:text-white">
          {formatPrice(total)}
        </div>
      </div>

      {/* Proceed to Checkout CTA */}
      <Button
        variant="primary"
        size="lg"
        className="w-full shadow-md"
        icon={ArrowRight}
        iconPosition="right"
        disabled={cart.length === 0}
        onClick={() => navigate('/checkout')}
      >
        Proceed to Express Checkout
      </Button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
        <Lock className="w-3.5 h-3.5 text-stone-400" />
        <span>End-to-End Encrypted Simulation • Demo Sandbox</span>
      </div>
    </div>
  );
}
