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
    if (!email || !email.includes('@') || !email.includes('.')) {
      toastError('Invalid Email Address', 'Please provide a valid email format.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toastSuccess('Subscribed to The Dispatch', 'Welcome to the inner circle of ShopSphere releases.');
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl glass-panel bg-gradient-to-b from-slate-900/90 to-[#0d1124] border border-white/10 p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto shadow-2xl"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/15">
              <Mail className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Private Dispatch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
              Join The ShopSphere Circle
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Receive confidential notifications for limited mechanical drops, architectural collaborations, and private member seasonal pricing.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-2 text-sm font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You have been registered for future private release alerts.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
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

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zero spam policy. Strict cryptographic privacy adherence. Unsubscribe anytime.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
