import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  KeyRound,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim()) {
      setError('Email address is required');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email format');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 850);
  };

  return (
    <div className="py-6 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <Breadcrumbs items={[{ label: 'Sign In', href: '/login' }, { label: 'Password Recovery' }]} />

      <div className="max-w-md mx-auto my-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-6 sm:p-10 shadow-lg relative overflow-hidden"
        >
          {/* Icon Header */}
          <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white flex items-center justify-center mx-auto mb-5 shadow-xs">
            <KeyRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="text-center space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white">
              Reset Password
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Recover access to your ShopSphere client credentials.
            </p>
          </div>

          {/* Important Technical Notice */}
          <div className="mb-6 p-3.5 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-xs text-stone-600 dark:text-stone-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-white">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Demonstration Sandbox Note</span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
              This portfolio frontend simulates the password reset flow locally without external mailers.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 text-center"
            >
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <div className="font-bold text-sm text-stone-900 dark:text-white">Simulated Reset Dispatched</div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                  A cryptographic reset token has been simulated for <strong className="text-stone-900 dark:text-white">{email}</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-[11px] font-mono text-stone-800 dark:text-stone-300 break-all text-left">
                Demo Token: https://shopsphere.internal/auth/reset?token=sim-7f9a2b8e
              </div>

              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" size="md" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                      if (error) setError('');
                    }}
                    placeholder="alex.vance@sphere.network"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none transition-colors ${
                      error ? 'border-rose-500' : 'border-[#e7e2d9] dark:border-white/10 focus:border-stone-500'
                    }`}
                  />
                </div>
                {error && (
                  <span className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {error}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full shadow-md"
              >
                Send Recovery Instructions
              </Button>

              <div className="pt-3 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
