import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { formatPrice, estimateDeliveryDate } from '../utils/formatters';
import { Button } from '../components/common/Button';

export function OrderSuccessPage() {
  const location = useLocation();

  const [order] = useState(() => {
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
        colors: ['#1d4ed8', '#ea580c', '#eab308', '#121316']
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
      <div className="py-24 text-center max-w-lg mx-auto px-4 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-300 flex items-center justify-center mx-auto mb-4 border border-[#e7e2d9] dark:border-white/10">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white mb-2">No Recent Order Found</h2>
        <p className="text-xs text-stone-600 dark:text-stone-400 mb-6">
          You may have already completed your simulated session or cleared your local storage.
        </p>
        <Link to="/products">
          <Button variant="primary">Explore Catalog</Button>
        </Link>
      </div>
    );
  }

  const deliveryEstimate = estimateDeliveryDate(4);

  return (
    <div className="py-8 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      {/* Success Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-12 text-center shadow-lg relative overflow-hidden"
      >
        <div className="w-20 h-20 rounded-full bg-[#121316] dark:bg-white text-white dark:text-[#121316] flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 dark:text-emerald-600" />
        </div>

        <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
          Order Reference: {order.orderId}
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight mt-4 mb-2">
          Order Simulation Confirmed
        </h1>

        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
          Thank you for exploring ShopSphere 2.0, <strong className="text-stone-900 dark:text-white">{order.customer?.name}</strong>. A simulated dispatch manifest has been created.
        </p>

        {/* Courier Dispatch Timeline */}
        <div className="mt-10 pt-8 border-t border-[#e7e2d9] dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Status</div>
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-0.5 font-medium">Preparing Dispatch</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-stone-700 dark:text-stone-300 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Estimated Delivery</div>
              <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">{deliveryEstimate}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Destination</div>
              <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 truncate max-w-[150px]">
                {order.customer?.city}, {order.customer?.state}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invoice & Order Summary Card */}
      <div className="mt-8 rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-center justify-between pb-4 border-b border-[#e7e2d9] dark:border-white/10">
          <div>
            <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-white">Simulated Manifest</h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-semibold text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Item Rows */}
        <div className="space-y-4">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-[#e7e2d9]/60 dark:border-white/5">
              <div className="flex items-center gap-3">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover bg-stone-100 dark:bg-stone-900 border border-[#e7e2d9]/60 dark:border-white/10"
                />
                <div>
                  <h4 className="text-sm font-semibold font-editorial text-stone-900 dark:text-white">{item.name}</h4>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Qty: {item.quantity} • Finish: {item.selectedColor}
                  </div>
                </div>
              </div>
              <div className="text-sm font-bold font-editorial text-stone-900 dark:text-white">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="pt-2 space-y-2 text-xs border-t border-[#e7e2d9] dark:border-white/10">
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Subtotal</span>
            <span className="font-medium text-stone-900 dark:text-white">{formatPrice(order.pricing?.subtotal)}</span>
          </div>
          {order.pricing?.discountAmount > 0 && (
            <div className="flex justify-between text-orange-600 dark:text-orange-400 font-semibold">
              <span>Promotional Discount</span>
              <span>-{formatPrice(order.pricing?.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Courier Dispatch</span>
            <span className="font-medium text-stone-900 dark:text-white">
              {order.pricing?.shippingCharge === 0 ? 'FREE' : formatPrice(order.pricing?.shippingCharge)}
            </span>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Estimated Sales Tax</span>
            <span className="font-medium text-stone-900 dark:text-white">{formatPrice(order.pricing?.taxAmount)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t border-[#e7e2d9] dark:border-white/10 text-base font-extrabold text-stone-900 dark:text-white">
            <span>Total Settlement</span>
            <span className="text-2xl font-editorial text-stone-900 dark:text-white">
              {formatPrice(order.pricing?.total)}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="pt-4 border-t border-[#e7e2d9] dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-600 dark:text-stone-300">
          <div>
            <div className="font-bold text-stone-900 dark:text-white uppercase text-[10px] tracking-wider mb-1.5">
              Shipping Destination
            </div>
            <p className="leading-relaxed">
              {order.customer?.name} <br />
              {order.customer?.address} {order.customer?.apartment} <br />
              {order.customer?.city}, {order.customer?.state} {order.customer?.postalCode} <br />
              {order.customer?.country}
            </p>
          </div>

          <div>
            <div className="font-bold text-stone-900 dark:text-white uppercase text-[10px] tracking-wider mb-1.5">
              Client Contact
            </div>
            <p className="leading-relaxed">
              Email: {order.customer?.email} <br />
              Phone: {order.customer?.phone} <br />
              Courier: Tracked Carbon-Neutral Courier
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
            Continue Exploring Catalog
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
