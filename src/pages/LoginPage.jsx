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
  CheckCircle2,
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
      setErrors({ form: 'Failed to sign in. Please check your credentials.' });
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
    <div className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Sign In' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 max-w-6xl mx-auto">
        {/* Left Column: Visual & Brand Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block lg:col-span-6 relative rounded-3xl overflow-hidden glass-card bg-slate-900 border border-white/10 p-8 xl:p-12 shadow-2xl h-[620px] flex flex-col justify-between"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/15 blur-[90px] rounded-full pointer-events-none" />

          {/* Background Image with Overlay */}
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
            alt="ShopSphere Audio"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/70 to-transparent" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client Portal Access</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white font-display">
              Welcome to the Sphere Network.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Sign in to synchronize your curated acoustic bag, manage saved precision instruments, and unlock member-exclusive releases.
            </p>
          </div>

          {/* Center Card Quote / Metric */}
          <div className="relative z-10 p-5 rounded-2xl glass-panel bg-[#0d1124]/90 border border-white/15 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Client Autonomy Guarantee</div>
                <div className="text-[11px] text-slate-400">
                  Zero telemetry tracking. Session data preserved securely in your personal local environment.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Fast Demo Login Selector */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>One-Click Evaluator Profiles</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickDemoFill(u)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                    {u.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 truncate">
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
          <div className="rounded-3xl glass-panel bg-[#0d1124]/90 border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Form Header */}
            <div className="mb-6 space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Member Verification
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                Sign In to ShopSphere
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Enter your credentials or choose a quick demo account to continue.
              </p>
            </div>

            {/* General form error if any */}
            {errors.form && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                    }}
                    placeholder="alex.vance@sphere.network"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
                    }`}
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Password with Show/Hide */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.password ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </span>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                  />
                  <span>Remember this terminal</span>
                </label>

                <span className="text-[11px] text-slate-500">
                  256-Bit SSL Encrypted
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full text-sm font-bold py-3.5 glow-cyan"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Sign In to Account
                </Button>
              </div>

              {/* Mobile Quick Fill Helper */}
              <div className="lg:hidden pt-3 border-t border-white/10">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Or Test with Demo Account
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demoUsers.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickDemoFill(u)}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-semibold text-cyan-300 hover:bg-white/10"
                    >
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Register Link */}
              <div className="pt-4 text-center border-t border-white/10">
                <span className="text-xs text-slate-400">
                  Don't have a ShopSphere account?{' '}
                </span>
                <Link
                  to="/register"
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors ml-1"
                >
                  Create Account →
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
