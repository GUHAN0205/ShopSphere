import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Copy, Check, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

export function PromoBanner() {
  const { toastSuccess } = useToast();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BEYOND20');
    setCopied(true);
    toastSuccess('Code Copied!', 'Use code BEYOND20 at checkout for 20% off.');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-16 md:py-24 relative bg-[#faf9f5] dark:bg-[#0c0d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-[#121316] text-white border border-[#262833] p-8 sm:p-12 md:p-16 shadow-2xl"
        >
          {/* Subtle architectural background photo */}
          <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
              alt="Seasonal Campaign Backdrop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/90 to-[#121316]/60" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Collector Window</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight leading-[1.12]">
                Save 20% Across The Entire <br />
                <span className="italic font-normal text-stone-300">ShopSphere 2.0 Catalog.</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed font-sans">
                Apply promotional voucher during checkout to redeem twenty percent reduction across all 48 catalog objects including acoustics, horology, and outerwear.
              </p>

              {/* Coupon Code Pill & CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 p-1.5 pl-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Voucher:</span>
                  <span className="font-mono font-bold text-white tracking-widest text-sm sm:text-base">
                    BEYOND20
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="py-1.5 px-3 rounded-lg bg-white hover:bg-stone-200 text-[#121316] transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <Link to="/products">
                  <Button
                    variant="cobalt"
                    size="md"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Shop the Campaign
                  </Button>
                </Link>
              </div>
            </div>

            {/* Countdown Clock Display */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Window Closes In</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                  <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Hours</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                  <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Mins</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                  <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-orange-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Secs</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
