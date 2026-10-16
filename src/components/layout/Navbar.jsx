import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogIn,
  LogOut,
  Package,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS, getCategoryProductCount } from '../../data/products';
import { handleImageError } from '../../utils/imageFallback';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(e.target)) {
        setIsCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoriesDropdownOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#faf9f5]/92 dark:bg-[#0c0d11]/92 backdrop-blur-md border-b border-[#e7e2d9] dark:border-white/10 shadow-sm'
            : 'bg-[#faf9f5] dark:bg-[#0c0d11] border-b border-[#e7e2d9]/60 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Identity */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] flex items-center justify-center font-bold tracking-tighter text-lg shadow-sm transition-transform group-hover:scale-105">
                <span>S</span>
                <span className="text-blue-500 font-black">.</span>
              </div>

              <div>
                <span className="text-xl font-bold tracking-tight text-[#121316] dark:text-white flex items-center gap-1 font-editorial">
                  Shop<span className="text-blue-600 dark:text-blue-400 font-sans tracking-normal font-semibold">Sphere</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium -mt-0.5">
                  Find Your Next Favorite
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              <NavLink
                to="/products?filter=new"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5'
                  }`
                }
              >
                New Arrivals
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5'
                  }`
                }
              >
                Shop All
              </NavLink>

              {/* Categories Mega Dropdown */}
              <div
                className="relative"
                ref={categoriesDropdownRef}
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-400 transition-transform ${
                      isCategoriesDropdownOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isCategoriesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] max-w-[95vw] rounded-2xl bg-[#faf9f5] dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 shadow-2xl p-4 sm:p-5 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e7e2d9] dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                            Curated Departments (8)
                          </span>
                        </div>
                        <Link
                          to="/products"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <span>Full Catalog ({PRODUCTS.length} Objects)</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
                        {CATEGORIES.map((cat) => {
                          const count = getCategoryProductCount(cat.id);
                          return (
                            <Link
                              key={cat.id}
                              to={`/categories/${cat.slug}`}
                              onClick={() => setIsCategoriesDropdownOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-[#e7e2d9] dark:hover:border-white/10 group transition-all"
                            >
                              <img
                                src={cat.image}
                                alt={cat.name}
                                onError={handleImageError}
                                className="w-12 h-12 rounded-lg object-cover bg-stone-200 dark:bg-stone-800 shrink-0 group-hover:scale-105 transition-transform"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {cat.name}
                                  </span>
                                  <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 shrink-0 bg-stone-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                    {count} items
                                  </span>
                                </div>
                                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                                  {cat.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/#collections"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
              >
                Featured Collections
              </NavLink>
            </nav>

            {/* Right Controls: Search, Theme, Auth, Wishlist, Cart, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                aria-label="Search products"
              >
                <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                <span className="hidden xl:inline">Search curated goods...</span>
                <kbd className="hidden sm:inline-flex text-[10px] text-stone-500 dark:text-slate-400 bg-stone-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-stone-200 dark:border-white/10">
                  Ctrl K
                </kbd>
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10 transition-colors cursor-pointer shadow-xs"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-700" />
                )}
              </button>

              {/* User Account / Sign In Control */}
              <div className="relative" ref={userDropdownRef}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10 text-xs font-medium text-stone-900 dark:text-white transition-all cursor-pointer shadow-xs"
                      aria-label="Account options"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-lg object-cover border border-[#e7e2d9] dark:border-white/10"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-[#121316] dark:bg-white text-white dark:text-[#121316] text-[11px] font-bold flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <span className="hidden sm:inline font-semibold text-xs max-w-[90px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-[#faf9f5] dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 shadow-2xl p-4 z-50 text-stone-800 dark:text-stone-200"
                        >
                          <div className="flex items-center gap-3 pb-3 border-b border-[#e7e2d9] dark:border-white/10">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-11 h-11 rounded-xl object-cover border border-[#e7e2d9] dark:border-white/10"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] text-sm font-bold flex items-center justify-center">
                                {user.name.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-stone-900 dark:text-white text-sm truncate">
                                {user.name}
                              </div>
                              <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                                {user.email}
                              </div>
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-500/20 mt-1">
                                {user.tier || 'Collector Member'}
                              </span>
                            </div>
                          </div>

                          <div className="py-2 space-y-1 text-xs">
                            <Link
                              to="/wishlist"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <Heart className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                                <span>Saved Wishlist</span>
                              </span>
                              <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                                {wishlistCount}
                              </span>
                            </Link>

                            <Link
                              to="/cart"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <ShoppingBag className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                <span>Shopping Bag</span>
                              </span>
                              <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                                {cartCount}
                              </span>
                            </Link>

                            <Link
                              to="/order-success"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <Package className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                                <span>Recent Orders</span>
                              </span>
                              <span className="text-[10px] text-stone-400">View</span>
                            </Link>
                          </div>

                          <div className="pt-2 border-t border-[#e7e2d9] dark:border-white/10 flex items-center justify-between">
                            <span className="text-[10px] text-stone-400">
                              Simulated Demo Account
                            </span>
                            <button
                              onClick={handleSignOut}
                              className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] hover:bg-stone-800 dark:hover:bg-stone-100 text-xs font-semibold transition-all shadow-sm"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-orange-600 fill-orange-600' : ''}`} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-600 text-[10px] font-bold text-white flex items-center justify-center shadow-xs"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Shopping Bag Icon with live count */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs group"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform" />
                <span className="hidden sm:inline text-xs font-semibold">Bag</span>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 rounded-full bg-white text-[#121316] text-[10px] font-extrabold flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#faf9f5] dark:bg-[#0c0d11] border-t border-[#e7e2d9] dark:border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-5 max-h-[85vh] overflow-y-auto">
                {/* Mobile Auth Header */}
                {isAuthenticated ? (
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#e7e2d9] dark:border-white/10 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] text-sm font-bold flex items-center justify-center shrink-0">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-stone-900 dark:text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-xs font-semibold text-rose-600 dark:text-rose-400 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg shrink-0"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] text-xs font-semibold shadow-xs"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs"
                    >
                      <span>Register</span>
                    </Link>
                  </div>
                )}

                {/* Primary Nav Links */}
                <div className="space-y-1">
                  <Link
                    to="/products?filter=new"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-white/5 text-sm font-semibold text-stone-900 dark:text-white"
                  >
                    <span>New Arrivals</span>
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                      Latest
                    </span>
                  </Link>

                  <Link
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-white/5 text-sm font-semibold text-stone-900 dark:text-white"
                  >
                    <span>Shop All Products</span>
                    <span className="text-xs text-stone-400 font-mono font-bold">{PRODUCTS.length} Items</span>
                  </Link>
                </div>

                {/* All 8 Categories List */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-3 mb-2">
                    Browse All Categories (8)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => {
                      const count = getCategoryProductCount(cat.id);
                      return (
                        <Link
                          key={cat.id}
                          to={`/categories/${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10"
                        >
                          <img
                            src={cat.image}
                            alt={cat.name}
                            onError={handleImageError}
                            className="w-8 h-8 rounded-lg object-cover bg-stone-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-stone-900 dark:text-white truncate">
                              {cat.name}
                            </div>
                            <div className="text-[10px] text-stone-400">{count} items</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="pt-2 border-t border-[#e7e2d9] dark:border-white/10 flex items-center justify-between text-xs">
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    <Heart className="w-4 h-4 text-orange-600" />
                    <span>Wishlist ({wishlistCount})</span>
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <span>Bag ({cartCount})</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
