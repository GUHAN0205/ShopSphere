import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export function TrustSection() {
  const benefits = [
    {
      icon: Truck,
      title: 'Global Express Courier',
      description: 'Expedited carbon-neutral logistics with live temperature and impact monitoring for fragile instruments.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Evaluation Period',
      description: 'Audit any instrument in your personal workspace or studio with zero-friction return privileges.'
    },
    {
      icon: ShieldCheck,
      title: '2-Year Hardware Assurance',
      description: 'Full replacement coverage against electrical, acoustic, and mechanical component failures.'
    },
    {
      icon: Headphones,
      title: 'Direct Client Concierge',
      description: 'Around-the-clock technical advisory for device setup, acoustic tuning, and tailored product pairings.'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Store Confidence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
            The ShopSphere Standard
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Every transaction is safeguarded by strict quality inspection and white-glove logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl glass-card bg-slate-900/50 border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-400/40"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
