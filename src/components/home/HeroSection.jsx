import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-32">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-violet-600/15 to-pink-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>Next-Generation Curated Commerce</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-white">Fall 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Beyond Shopping. <br />
              <span className="text-gradient-cosmic">Pure Innovation.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Immerse yourself in precision-machined audio instruments, aerospace titanium horology, architectural technical apparel, and sculptural living objects designed for the forward-thinking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/products">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto glow-cyan"
                >
                  Explore All Products
                </Button>
              </Link>

              <Link to="/categories/electronics">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Flagship Audio
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold text-white font-display">4.9/5</div>
                <div className="text-xs text-slate-400 mt-0.5">Audited Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-display">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Authenticity Guaranteed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400 font-display">2-Year</div>
                <div className="text-xs text-slate-400 mt-0.5">Worldwide Warranty</div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Main Showcase Hero Card */}
            <div className="relative rounded-3xl glass-card bg-slate-900/70 border border-white/15 p-4 shadow-2xl shadow-cyan-950/40 group overflow-hidden">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                  alt="SpherePulse Pro ANC Flagship Headphones"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge variant="cyan" size="sm">Editor's Choice</Badge>
                  <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    Spatial Telemetry
                  </span>
                </div>

                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl glass-panel bg-[#0d1124]/90 border border-white/20 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">
                      Featured Instrument
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="ml-1 text-white font-semibold">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white truncate">
                    SpherePulse Pro ANC Headphones
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                    <div>
                      <span className="text-xl font-extrabold text-white">$349.99</span>
                      <span className="text-xs text-slate-400 line-through ml-2">$429.99</span>
                    </div>
                    <Link
                      to="/products/prod-01"
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Pill Left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -bottom-6 -left-8 p-3 rounded-2xl glass-panel bg-[#0d1124]/95 border border-cyan-500/30 shadow-xl items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Lossless LDAC Audio</div>
                <div className="text-[10px] text-slate-400">45-Hour Battery Life</div>
              </div>
            </motion.div>

            {/* Floating Glass Pill Right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-6 -right-6 p-3 rounded-2xl glass-panel bg-[#0d1124]/95 border border-violet-500/30 shadow-xl items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Grade 5 Titanium</div>
                <div className="text-[10px] text-slate-400">Micro-Billet Chassis</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
