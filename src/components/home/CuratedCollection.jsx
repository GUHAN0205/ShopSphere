import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../common/Button';

export function CuratedCollection() {
  const watch = PRODUCTS.find(p => p.id === 'prod-25') || PRODUCTS[0];
  const camera = PRODUCTS.find(p => p.id === 'prod-05') || PRODUCTS[1];

  const spotlights = [watch, camera].filter(Boolean);

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
            Curator's Spotlight
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
            Mastery & Precision
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Selected for extraordinary engineering tolerance, biocompatible finishes, and timeless mechanical integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {spotlights.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl glass-card bg-slate-900/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl group"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 mb-6 border border-white/10">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-cyan-400 font-semibold uppercase tracking-wider">
                    {item.categoryName}
                  </span>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    <span className="font-bold text-white">{item.rating}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.shortDesc}
                </p>

                {/* Key Spec highlights */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
                  {item.features && item.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-1.5 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Retail Value</span>
                  <span className="text-2xl font-extrabold text-white">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <Link to={`/products/${item.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Examine Piece
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
