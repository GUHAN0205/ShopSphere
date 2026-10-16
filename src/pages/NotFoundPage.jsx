import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Home, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="py-20 sm:py-32 max-w-4xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl glass-panel bg-slate-900/60 border border-white/10 p-8 sm:p-16 shadow-2xl overflow-hidden"
      >
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-cyan-500/20 to-violet-600/20 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/15">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 font-display">
            404
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2">
            Orbit Coordinate Lost
          </h1>

          <p className="text-sm text-slate-300 max-w-md mx-auto mt-3 leading-relaxed">
            The page, collection, or instrument you are seeking has either shifted orbital coordinates or does not exist.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                icon={Home}
                className="w-full sm:w-auto"
              >
                Back to Command (Home)
              </Button>
            </Link>

            <Link to="/products">
              <Button
                variant="secondary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
