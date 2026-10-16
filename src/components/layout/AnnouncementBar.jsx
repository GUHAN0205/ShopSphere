import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return localStorage.getItem('shopsphere_banner_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('shopsphere_banner_dismissed', 'true');
    } catch {
      // storage
    }
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Seasonal Offer" className="relative z-30 bg-[#121316] text-[#faf9f5] text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 flex-wrap text-center">
          <span className="inline-flex items-center gap-1 bg-[#ea580c] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5" />
            Seasonal Edit
          </span>
          <span className="font-medium text-slate-200">
            Enjoy 20% off all curated arrivals with code <strong className="text-white font-mono font-bold">BEYOND20</strong>
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-300">Complimentary Courier on orders $150+</span>
          <Link
            to="/products"
            className="text-white underline hover:text-[#ea580c] font-semibold inline-flex items-center gap-0.5 ml-1 transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Dismiss promotional banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
