import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { formatPrice, estimateDeliveryDate } from '../utils/formatters';
import { Button } from '../components/common/Button';

export function OrderSuccessPage() {
  const location = useLocation();

  const [order, setOrder] = useState(() => {
    if (location.state?.order) {
      return location.state.order;
    }
    try {
      const saved = localStorage.getItem('shopsphere_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#8b5cf6', '#ec4899', '#38bdf8']
      });
    } catch {
      // confetti fallback
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Recent Order Found</h2>
        <p className="text-xs text-slate-400 mb-6">
          You may have already completed your session or cleared your local browser history.
        </p>
        <Link to="/products">
          <Button variant="primary">Explore Catalog</Button>
        </Link>
      </div>
    );
  }

  const deliveryEstimate = estimateDeliveryDate(4);

  return (
    <div className="py-8 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Success Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl glass-panel bg-slate-900/80 border border-cyan-500/30 p-6 sm:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 p-[3px] mx-auto mb-6 shadow-xl shadow-cyan-500/20">
          <div className="w-full h-full bg-[#0d1124] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
          Order Reference: {order.orderId}
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mt-4 mb-2">
          Acquisition Confirmed
        </h1>

        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Thank you for choosing ShopSphere, <strong className="text-white">{order.customer?.name}</strong>. A simulated confirmation receipt has been generated.
        </p>

        {/* Courier Dispatch Timeline */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Status</div>
              <div className="text-xs text-cyan-300 mt-0.5 font-medium">Preparing Dispatch</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Estimated Delivery</div>
              <div className="text-xs text-slate-300 mt-0.5">{deliveryEstimate}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Destination</div>
              <div className="text-xs text-slate-300 mt-0.5 truncate max-w-[150px]">
                {order.customer?.city}, {order.customer?.state}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invoice & Order Summary Card */}
      <div className="mt-8 rounded-3xl glass-panel bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-display">Acquisition Manifest</h3>
            <span className="text-xs text-slate-400">
              Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Invoice</span>
          </button>
        </div>

        {/* Item Rows */}
        <div className="space-y-4">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                  <div className="text-xs text-slate-400">
                    Qty: {item.quantity} • Finish: {item.selectedColor}
                  </div>
                </div>
              </div>
              <div className="text-sm font-bold text-white">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="pt-2 space-y-2 text-xs border-t border-white/10">
          <div className="flex justify-between text-slate-300">
            <span>Subtotal</span>
            <span>{formatPrice(order.pricing?.subtotal)}</span>
          </div>
          {order.pricing?.discountAmount > 0 && (
            <div className="flex justify-between text-cyan-400">
              <span>Promotional Discount</span>
              <span>-{formatPrice(order.pricing?.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-300">
            <span>Courier Dispatch</span>
            <span>{order.pricing?.shippingCharge === 0 ? 'FREE' : formatPrice(order.pricing?.shippingCharge)}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Estimated Tax</span>
            <span>{formatPrice(order.pricing?.taxAmount)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t border-white/10 text-base font-extrabold text-white">
            <span>Total Invoiced</span>
            <span className="text-2xl font-display text-cyan-400">
              {formatPrice(order.pricing?.total)}
            </span>
          </div>
        </div>

        {/* Shipping and Client Info */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300">
          <div>
            <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-1.5">
              Shipping Address
            </div>
            <p className="leading-relaxed">
              {order.customer?.name} <br />
              {order.customer?.address} {order.customer?.apartment} <br />
              {order.customer?.city}, {order.customer?.state} {order.customer?.postalCode} <br />
              {order.customer?.country}
            </p>
          </div>

          <div>
            <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-1.5">
              Contact & Dispatch Updates
            </div>
            <p className="leading-relaxed">
              Email: {order.customer?.email} <br />
              Phone: {order.customer?.phone} <br />
              Method: Standard Encrypted Express
            </p>
          </div>
        </div>
      </div>

      {/* Return Home CTA */}
      <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/products">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Continue Exploring Collection
          </Button>
        </Link>
        <Link to="/">
          <Button variant="secondary" size="lg">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
