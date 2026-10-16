import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Shield, Mail } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toastSuccess, toastError } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toastError('Invalid Email Address', 'Please provide a valid email format.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toastSuccess('Subscribed to The Gazette', 'Welcome to the ShopSphere editorial digest.');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#faf9f5] dark:bg-[#0c0d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-[#f2efe7] dark:bg-[#141620] border border-[#e7e2d9] dark:border-white/10 p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto shadow-sm"
        >
          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              The Weekly Edit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white mt-1">
              Join The ShopSphere Dispatch
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed font-sans font-normal">
              Curated notes on industrial design, private previews of seasonal arrivals, and member-exclusive discount codes delivered weekly.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2 text-sm font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>You have been added to the editorial dispatch list.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-[#e7e2d9] dark:border-white/15 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:border-stone-500 transition-colors shadow-xs"
                />
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  icon={Send}
                  iconPosition="right"
                  className="shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-stone-400" />
                <span>No spam. Unsubscribe with a single click anytime.</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="italic text-stone-400">Demo Simulation Notice: Local frontend demo without external mailers.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
