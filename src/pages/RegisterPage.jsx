import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      errs.acceptTerms = 'You must accept the terms & demo protocol';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/', { replace: true });
    } catch {
      setErrors({ form: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs items={[{ label: 'Sign In', href: '/login' }, { label: 'Create Account' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 max-w-6xl mx-auto">
        {/* Left Column: Visual & Perks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block lg:col-span-6 relative rounded-3xl overflow-hidden bg-[#121316] text-white border border-stone-800 p-8 xl:p-12 shadow-xl h-[680px] flex flex-col justify-between"
        >
          {/* Background Image with Overlay */}
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
            alt="Avant Fashion"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/75 to-transparent" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Collector Membership</span>
            </div>
            <h2 className="text-3xl font-bold font-editorial text-white leading-tight">
              Begin Your Intentional Collection.
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed max-w-md font-normal">
              Register an evaluator profile to experience synchronous bag state, private campaign access, and persistent wishlist archives.
            </p>
          </div>

          {/* Member Privileges */}
          <div className="relative z-10 space-y-3 pt-6 border-t border-white/15">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Collector Privileges
            </div>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Complimentary tracked shipping on all orders over $150</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Synchronized wishlist and saved bag across devices</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>20% private release voucher (code: BEYOND20)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 w-full"
        >
          <div className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="mb-6 space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                New Membership
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white">
                Create Collector Account
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Simulate member onboarding with client credentials.
              </p>
            </div>

            {errors.form && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Marcus Chen"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                    }`}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="marcus.chen@studio.design"
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

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 dark:text-stone-400">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded accent-[#121316] dark:accent-white cursor-pointer"
                  />
                  <span>
                    I accept the{' '}
                    <span className="text-stone-900 dark:text-white underline">Terms of Service</span> and understand this is a simulated demo environment.
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="text-xs text-rose-500 mt-1 block">
                    {errors.acceptTerms}
                  </span>
                )}
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
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-[#e7e2d9] dark:border-white/10 text-center text-xs text-stone-600 dark:text-stone-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-stone-900 dark:text-white hover:text-blue-600 underline">
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
