import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';

export function TrustSection() {
  const benefits = [
    {
      icon: Truck,
      title: 'Complimentary Delivery',
      description: 'Carbon-neutral tracked courier shipping on all orders over $150 worldwide.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Return Window',
      description: 'Experience your piece in person. Simplified returns in original undamaged packaging.'
    },
    {
      icon: ShieldCheck,
      title: 'Curated Provenance',
      description: 'Sourced directly from independent ateliers and accredited manufacturers.'
    },
    {
      icon: HelpCircle,
      title: 'Dedicated Client Care',
      description: 'Knowledgeable product specialists available via digital concierge Monday through Friday.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Client Commitments
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white mt-1">
            The ShopSphere Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl bg-white dark:bg-[#151722] border border-[#e7e2d9] dark:border-white/10 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-800 dark:text-stone-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
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
