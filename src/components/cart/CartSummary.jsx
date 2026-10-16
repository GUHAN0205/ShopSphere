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
    <div className="rounded-3xl glass-panel bg-slate-900/70 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      <h3 className="text-xl font-bold text-white font-display">
        Order Summary
      </h3>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {amountToFreeShipping > 0
              ? `Add ${formatPrice(amountToFreeShipping)} more for complimentary shipping`
              : 'You unlocked complimentary Express Shipping!'}
          </span>
          <span className="font-mono text-cyan-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Line Item Breakdown */}
      <div className="space-y-3 text-sm border-b border-white/10 pb-6">
        <div className="flex justify-between text-slate-300">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-cyan-400 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Discount ({appliedPromo?.description || 'Promo'})</span>
            </span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-300">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-white">
            {shippingCharge === 0 ? (
              <span className="text-emerald-400 font-bold uppercase text-xs">FREE</span>
            ) : (
              formatPrice(shippingCharge)
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-semibold text-white">{formatPrice(taxAmount)}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Promotional Voucher
        </label>
        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>{appliedPromo.code}</strong> — {appliedPromo.description}
              </span>
            </div>
            <button
              onClick={removePromoCode}
              className="text-slate-400 hover:text-white p-1"
              title="Remove promo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError('');
              }}
              placeholder="e.g. BEYOND20"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 uppercase font-mono"
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
            >
              Apply
            </Button>
          </form>
        )}
        {promoError && (
          <p className="text-xs text-rose-400 mt-1.5">{promoError}</p>
        )}
        <p className="text-[11px] text-slate-500 mt-1.5">
          Try <code className="text-cyan-400">BEYOND20</code> (20% off) or <code className="text-cyan-400">FREESHIP</code>
        </p>
      </div>

      {/* Final Total */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex justify-between items-baseline mb-6">
          <span className="text-base font-bold text-white">Estimated Total</span>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-white font-display">
              {formatPrice(total)}
            </span>
            <span className="block text-[10px] text-slate-400">USD, inclusive of duties</span>
          </div>
        </div>

        {/* Checkout CTA */}
        <Button
          variant="primary"
          size="lg"
          className="w-full glow-cyan"
          icon={ArrowRight}
          iconPosition="right"
          disabled={cart.length === 0}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>

        <div className="mt-4 text-center">
          <Link
            to="/products"
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Continue Browsing Collection
          </Link>
        </div>
      </div>

      {/* Security note */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>256-Bit SSL Encrypted</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>30-Day Guarantee</span>
        </span>
      </div>
    </div>
  );
}
