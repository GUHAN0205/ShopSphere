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
  Shield,
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
    <div className="py-6 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Sign In', href: '/login' }, { label: 'Password Recovery' }]} />

      <div className="max-w-md mx-auto my-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl glass-panel bg-[#0d1124]/90 border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Icon Header */}
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/15">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="text-center space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Reset Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Recover access to your ShopSphere client credentials.
            </p>
          </div>

          {/* Important Technical Notice */}
          <div className="mb-6 p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Demonstration Environment Note</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This portfolio frontend does not connect to a production SMTP server. The form demonstrates the simulated recovery workflow.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 text-center"
            >
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="font-bold text-sm text-white">Simulated Reset Dispatched</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  A cryptographic reset token has been simulated for <strong className="text-white">{email}</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-[11px] font-mono text-cyan-300 break-all text-left">
                Demo Token: https://shopsphere.internal/auth/reset?token=sim-7f9a2b8e
              </div>

              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="alex.vance@sphere.network"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      error ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
                    }`}
                  />
                </div>
                {error && (
                  <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {error}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full text-sm font-bold py-3.5 glow-cyan"
                icon={ArrowRight}
                iconPosition="right"
              >
                Send Recovery Instructions
              </Button>

              <div className="pt-4 text-center border-t border-white/10">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
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
