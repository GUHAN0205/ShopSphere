import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Department Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
              Curated Sectors
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
            Engineered disciplines spanning cutting-edge acoustic hardware, avant-garde textiles, precision EDC, and spatial lighting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link
                to={`/categories/${category.slug}`}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden glass-card bg-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 shadow-xl"
              >
                {/* Background Image with Gradient Mask */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {category.badge}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:rotate-45 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-4 inset-x-4 z-10">
                  <span className="text-xs font-medium text-cyan-400">
                    {category.itemCount} Instruments & Drops
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 opacity-90 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
