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
  ShieldCheck,
  CheckCircle2,
  Package
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SearchOverlay } from '../common/SearchOverlay';
import { CATEGORIES } from '../../data/categories';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
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
            ? 'glass-panel bg-[#070913]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-[#070913] rounded-[14px] flex items-center justify-center overflow-hidden">
                  <div className="relative w-5 h-5">
                    <span className="absolute inset-0 rounded-full bg-cyan-400/80 blur-xs group-hover:scale-125 transition-transform" />
                    <span className="absolute inset-1 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1 font-display">
                  Shop<span className="text-gradient-cyan">Sphere</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium -mt-1">
                  Beyond Shopping
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Catalog
              </NavLink>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                <AnimatePresence>
                  {isCategoriesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-2xl glass-panel bg-[#0d1124]/95 border border-white/10 shadow-2xl p-2 z-50"
                    >
                      {CATEGORIES.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/categories/${cat.slug}`}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 group transition-colors"
                        >
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {cat.itemCount} items
                            </div>
                          </div>
                          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            Explore
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/categories/electronics"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Electronics
              </NavLink>

              <NavLink
                to="/categories/fashion"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Avant Fashion
              </NavLink>
            </nav>

            {/* Right Controls: Search, Theme, Auth, Wishlist, Cart, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Search products"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="hidden xl:inline">Search gear...</span>
                <kbd className="hidden sm:inline-flex text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                  Ctrl K
                </kbd>
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-violet-400" />
                )}
              </button>

              {/* User Account / Sign In Control */}
              <div className="relative" ref={userDropdownRef}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white transition-all cursor-pointer group"
                      aria-label="Account options"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-lg object-cover border border-cyan-400/50"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 text-[11px] font-bold text-white flex items-center justify-center shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <span className="hidden sm:inline font-semibold text-xs max-w-[90px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                    </button>

                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-72 rounded-2xl glass-panel bg-[#0d1124]/98 border border-white/15 shadow-2xl p-4 z-50 text-slate-200"
                        >
                          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-11 h-11 rounded-xl object-cover border border-cyan-400/40"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 text-sm font-bold text-white flex items-center justify-center">
                                {user.name.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-white text-sm truncate flex items-center gap-1.5">
                                <span>{user.name}</span>
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {user.email}
                              </div>
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 mt-1">
                                {user.tier || 'Member'}
                              </span>
                            </div>
                          </div>

                          <div className="py-2 space-y-1 text-xs">
                            <Link
                              to="/wishlist"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <Heart className="w-3.5 h-3.5 text-pink-400" />
                                <span>Saved Wishlist</span>
                              </span>
                              <span className="font-mono text-[11px] text-slate-400">
                                {wishlistCount}
                              </span>
                            </Link>

                            <Link
                              to="/cart"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Shopping Bag</span>
                              </span>
                              <span className="font-mono text-[11px] text-slate-400">
                                {cartCount}
                              </span>
                            </Link>

                            <Link
                              to="/order-success"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <Package className="w-3.5 h-3.5 text-violet-400" />
                                <span>Recent Manifest</span>
                              </span>
                              <span className="text-[10px] text-slate-500">View</span>
                            </Link>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">
                              Demo Sandbox Mode
                            </span>
                            <button
                              onClick={handleSignOut}
                              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
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
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-violet-500/15 hover:from-cyan-500/25 hover:to-violet-500/25 text-xs font-semibold text-white border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm"
                  >
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-pink-400 fill-pink-400' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Icon with animated badge */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 hover:from-cyan-500/25 hover:to-violet-500/25 border border-cyan-500/30 text-white transition-all group"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
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
              className="lg:hidden glass-panel bg-[#070913]/98 border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
                {/* Mobile Auth Header */}
                {isAuthenticated ? (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 text-sm font-bold text-white flex items-center justify-center shrink-0">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-cyan-400">
                          {user.tier || 'Member'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-transparent border border-cyan-500/20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Client Portal</span>
                      <span className="text-[10px] text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        Demo Mode
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold"
                      >
                        <span>Create Account</span>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                        isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                        isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    All Products Catalog
                  </NavLink>
                  <NavLink
                    to="/wishlist"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-slate-300 hover:text-white"
                  >
                    <span>Saved Wishlist</span>
                    <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full font-mono">
                      {wishlistCount} items
                    </span>
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-slate-300 hover:text-white"
                  >
                    <span>Shopping Bag</span>
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-mono">
                      {cartCount} items
                    </span>
                  </NavLink>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs uppercase font-bold text-slate-400 px-4 mb-2 tracking-wider">
                    Categories
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/categories/${cat.slug}`}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-slate-200 hover:text-cyan-300"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
