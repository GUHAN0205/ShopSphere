import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

export function PromoBanner() {
  const { toastSuccess } = useToast();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15
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
    <section className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden glass-panel bg-gradient-to-r from-violet-950/80 via-slate-900/90 to-cyan-950/80 border border-cyan-500/30 p-8 sm:p-12 md:p-16 shadow-2xl"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/15 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Limited Edition Access Drop</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
                Save 20% On Your First <br />
                <span className="text-gradient-cyan">ShopSphere Order.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Unlock 20% savings across the entire catalog including titanium horology, 4K OLED mobile workstations, and spatial acoustic arrays.
              </p>

              {/* Coupon Code Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 p-1 pl-3 rounded-xl bg-black/60 border border-cyan-500/40 backdrop-blur-md">
                  <span className="text-xs text-slate-400">Code:</span>
                  <span className="font-mono font-bold text-white tracking-wider text-sm sm:text-base">
                    BEYOND20
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <Link to="/products">
                  <Button
                    variant="primary"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Redeem in Catalog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Countdown Clock Display */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Offer Window Closes In
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-2xl glass-card bg-black/50 border border-white/10 min-w-18">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold mt-1">Hours</div>
                </div>
                <div className="p-3.5 rounded-2xl glass-card bg-black/50 border border-white/10 min-w-18">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold mt-1">Mins</div>
                </div>
                <div className="p-3.5 rounded-2xl glass-card bg-black/50 border border-white/10 min-w-18">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold mt-1">Secs</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
