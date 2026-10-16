import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Compass, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d5cfc4_1px,transparent_1px)] dark:bg-[radial-gradient(#262a36_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Magazine Typography & Editorial Lead */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Seasonal Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-200/60 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700/60 text-stone-800 dark:text-stone-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>Vol. 04 — Curated Autumn / Winter 2026</span>
              <span className="text-stone-400 dark:text-stone-600">|</span>
              <span className="text-stone-600 dark:text-stone-400 font-mono text-[11px]">48 Selected Objects</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#121316] dark:text-white leading-[1.06] font-editorial">
              Find Your Next <br />
              <span className="italic font-normal text-stone-700 dark:text-stone-300">Favorite.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed font-sans font-normal">
              An intentional edit of precision audio, architectural technical apparel, horological crafts, and sculptural homeware designed for discerning modern life.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link to="/products">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto shadow-md"
                >
                  Explore Collection
                </Button>
              </Link>

              <Link to="/products?filter=new">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  New Arrivals (2026)
                </Button>
              </Link>
            </div>

            {/* Editorial Curator Trust Row */}
            <div className="pt-8 mt-4 border-t border-[#e7e2d9] dark:border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-2xl font-bold font-editorial text-stone-900 dark:text-white">8</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 uppercase tracking-wider font-semibold">Specialty Hubs</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-editorial text-stone-900 dark:text-white">48+</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 uppercase tracking-wider font-semibold">Curated Designs</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-editorial text-blue-600 dark:text-blue-400">4.92 ★</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 uppercase tracking-wider font-semibold">Collector Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Asymmetric Magazine Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Large Editorial Image */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-[#e7e2d9] dark:border-white/10 shadow-2xl aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop"
                alt="Curated contemporary design objects and minimalist lifestyle"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />

              {/* Subtle top stamp */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 dark:bg-[#12141c]/90 backdrop-blur-md border border-[#e7e2d9] dark:border-white/10 text-[11px] font-bold uppercase tracking-widest text-stone-900 dark:text-white shadow-xs">
                Featured Editorial
              </div>

              {/* Bottom Image Overlay Strip */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white z-10">
                <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-1">
                  Campaign Focus
                </div>
                <h3 className="text-lg font-bold font-editorial leading-snug">
                  The Art of Everyday Balance
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                  Objects engineered for quiet luxury, tactile presence, and lasting longevity.
                </p>
              </div>
            </div>

            {/* Overlapping Floating Product Card (Asymmetric Layer) */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute -bottom-6 -left-6 sm:-left-10 bg-white dark:bg-[#181a24] p-3.5 rounded-2xl border border-[#e7e2d9] dark:border-white/15 shadow-xl max-w-[260px] z-20 hidden sm:flex items-center gap-3.5"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop"
                alt="SpherePulse Pro ANC"
                className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Top Release
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate">
                  SpherePulse Pro ANC
                </h4>
                <div className="text-xs font-extrabold text-stone-900 dark:text-white mt-0.5">
                  $349 <span className="text-[10px] text-stone-400 font-normal line-through">$399</span>
                </div>
              </div>
              <Link
                to="/products/sp-audio-01"
                className="p-1.5 rounded-lg bg-stone-100 dark:bg-white/10 hover:bg-stone-200 text-stone-700 dark:text-white shrink-0 ml-auto"
                aria-label="View product"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Top Right Floating Pill */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#181a24] border border-[#e7e2d9] dark:border-white/15 shadow-md text-xs font-semibold text-stone-800 dark:text-stone-200 z-20">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Complimentary Global Delivery</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
