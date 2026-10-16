import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, demoUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/';

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login({ email, password, rememberMe });
      navigate(redirectPath, { replace: true });
    } catch {
      setErrors({ form: 'Failed to sign in. Please verify your credentials.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoFill = (demoUser) => {
    setEmail(demoUser.email);
    setPassword('SpherePro2026!');
    setErrors({});
  };

  return (
    <div className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs items={[{ label: 'Sign In' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 max-w-6xl mx-auto">
        {/* Left Column: Visual & Brand Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block lg:col-span-6 relative rounded-3xl overflow-hidden bg-[#121316] text-white border border-stone-800 p-8 xl:p-12 shadow-xl h-[620px] flex flex-col justify-between"
        >
          {/* Background Image with Overlay */}
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
            alt="ShopSphere Audio"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/75 to-transparent" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Collector Access</span>
            </div>
            <h2 className="text-3xl font-bold font-editorial text-white leading-tight">
              Welcome to ShopSphere 2.0.
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed max-w-md font-normal">
              Sign in to synchronize your curated bag, manage your saved pieces, and unlock private previews.
            </p>
          </div>

          {/* Center Card Quote / Metric */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#121316] flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Demonstration Sandbox</div>
                <div className="text-[11px] text-stone-300">
                  Authentication is strictly simulated for portfolio evaluation without external third-party mailers.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Fast Demo Login Selector */}
          <div className="relative z-10 pt-4 border-t border-white/15">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>One-Click Evaluator Profiles</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickDemoFill(u)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                    {u.name}
                  </div>
                  <div className="text-[10px] text-blue-400 truncate">
                    {u.tier}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Sign In Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 w-full"
        >
          <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            {/* Form Header */}
            <div className="mb-6 space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Collector Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white">
                Sign In to ShopSphere
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Enter your credentials or choose an evaluator profile to explore.
              </p>
            </div>

            {/* General form error if any */}
            {errors.form && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                    }}
                    placeholder="alex.vance@sphere.network"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Password with Show/Hide */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none transition-colors ${
                      errors.password ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </span>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-stone-600 dark:text-stone-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#121316] dark:accent-white cursor-pointer"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full shadow-md"
                >
                  Sign In
                </Button>
              </div>
            </form>

            {/* Bottom Register Switcher */}
            <div className="mt-6 pt-5 border-t border-[#e7e2d9] dark:border-white/10 text-center text-xs text-stone-600 dark:text-stone-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-stone-900 dark:text-white hover:text-blue-600 underline">
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
