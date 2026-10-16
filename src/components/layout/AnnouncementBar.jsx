import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="relative z-30 bg-gradient-to-r from-violet-950 via-slate-950 to-cyan-950 border-b border-cyan-500/20 text-xs py-2 px-4 text-center text-slate-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold uppercase tracking-wider text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Fall Launch 2026
        </span>
        <span>
          Take 20% off all flagship instruments with code{' '}
          <strong className="text-white font-mono font-bold tracking-wider">BEYOND20</strong>
        </span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <span className="hidden sm:inline text-slate-400">Free Express Delivery on orders over $150</span>
        <Link
          to="/products"
          className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-0.5 ml-1 transition-colors group"
        >
          <span>Shop Now</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
