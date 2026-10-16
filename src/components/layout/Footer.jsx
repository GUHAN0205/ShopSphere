import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headphones, ArrowRight, Heart } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#05070e] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                Shop<span className="text-gradient-cyan">Sphere</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Beyond Shopping. Curating high-performance acoustic instruments, ergonomic spatial design, and architectural technical apparel for the modern visionary.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/GUHAN0205/ShopSphere"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Curated Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">
                  All Products
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.slug}`} className="hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Shopping */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Client Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-cyan-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-cyan-400 transition-colors">
                  Express Checkout
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Order Tracking (Live)</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Global Warranty Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantees */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Store Confidence
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Complimentary Express Courier on orders $150+</span>
              </li>
              <li className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>30-Day Hassle-Free Exchange & Return Window</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>2-Year Manufacturer Replacement Warranty</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Headphones className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Direct Concierge Support 24 Hours / 7 Days</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShopSphere Inc. All rights reserved. Beyond Shopping.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
