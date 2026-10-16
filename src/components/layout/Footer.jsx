import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
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
    <footer className="relative bg-[#f4f1ea] dark:bg-[#07080b] border-t border-[#e7e2d9] dark:border-white/10 pt-16 pb-12 overflow-hidden text-stone-600 dark:text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#e7e2d9] dark:border-white/10">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] flex items-center justify-center font-bold tracking-tighter text-base shadow-xs">
                <span>S</span>
                <span className="text-blue-500 font-black">.</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white font-editorial">
                Shop<span className="text-blue-600 dark:text-blue-400 font-sans tracking-normal font-semibold">Sphere</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm font-normal">
              Find Your Next Favorite. Curating high-performance acoustic instruments, ergonomic spatial design, precision horology, and architectural apparel for intentional living.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/GUHAN0205/ShopSphere"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* All 8 Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-4">
              Curated Hubs (8)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                  All 48 Products
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Shopping */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-4">
              Client Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Express Checkout
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Account Access
                </Link>
              </li>
              <li>
                <Link to="/order-success" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Recent Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Commitments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-4">
              Store Standards
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Complimentary tracked shipping on orders $150+</span>
              </li>
              <li className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>30-Day Hassle-Free Return & Exchange Window</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>2-Year Manufacturer Replacement Warranty</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Headphones className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Product Concierge Advisory Mon–Fri</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Demo Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} ShopSphere 2.0. Editorial Luxury Commerce. Demo Experience.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-800 dark:hover:text-stone-300 transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-stone-800 dark:hover:text-stone-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-800 dark:hover:text-stone-300 transition-colors cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
