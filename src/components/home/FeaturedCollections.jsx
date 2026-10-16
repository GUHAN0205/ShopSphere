import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, Layers } from 'lucide-react';
import { Button } from '../common/Button';

export function FeaturedCollections() {
  const collections = [
    {
      id: 'everyday-tech',
      title: 'The Everyday Tech Edit',
      subtitle: 'Precision Acoustics & Desk Objects',
      description: 'Streamlined tools calibrated for daily focus—featuring spatial audio headphones, tactile mechanical keys, and solid aluminum charging anchors.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1200&auto=format&fit=crop',
      tag: 'Curation N° 01',
      link: '/products?category=electronics',
      theme: 'tech',
      badge: 'Bestselling Edit'
    },
    {
      id: 'weekend-essentials',
      title: 'Weekend Essentials',
      subtitle: 'Travel Bags & Unstructured Footwear',
      description: 'Waxed canvas duffles, aerated Chelsea boots, and weather-treated EDC built to transition effortlessly from urban studios to coastal getaways.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      tag: 'Curation N° 02',
      link: '/products?category=bags-travel',
      theme: 'travel',
      badge: 'Travel Ready'
    },
    {
      id: 'better-living',
      title: 'Objects for Better Living',
      subtitle: 'Sculptural Lighting & Ceramic Homeware',
      description: 'Intentionally crafted interior accents, minimalist cast brass lamps, and artisan pour-over ceramics that celebrate the ritual of home.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
      tag: 'Curation N° 03',
      link: '/products?category=home-living',
      theme: 'home',
      badge: 'Living Space'
    },
    {
      id: 'streetwear-edit',
      title: 'The Streetwear Collection',
      subtitle: 'Architectural Silhouettes & Technical Apparel',
      description: 'Breathable 3-layer storm parkas, heavyweight organic fleece, and ergonomic runner sneakers engineered with modern performance textiles.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      tag: 'Curation N° 04',
      link: '/products?category=fashion',
      theme: 'fashion',
      badge: 'Limited Run'
    }
  ];

  return (
    <section id="collections" className="py-20 md:py-28 relative bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Seasonal Series</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight">
            Featured Collections
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 font-normal">
            Four distinct thematic portfolios curated for specialized moments, environments, and modern lifestyles.
          </p>
        </div>

        {/* 4 Distinct Visually Diverse Collection Cards */}
        <div className="space-y-12">
          {collections.map((campaign, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={`rounded-3xl border border-[#e7e2d9] dark:border-white/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 ${
                  idx === 0
                    ? 'bg-stone-900 text-white'
                    : idx === 1
                    ? 'bg-[#f4efe6] dark:bg-[#161822]'
                    : idx === 2
                    ? 'bg-white dark:bg-[#13151f]'
                    : 'bg-stone-100 dark:bg-[#191b26]'
                }`}
              >
                {/* Media Half */}
                <div
                  className={`lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] overflow-hidden group ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-stone-900 dark:text-white border border-white/20 shadow-xs">
                      {campaign.badge}
                    </span>
                  </div>
                </div>

                {/* Editorial Content Half */}
                <div
                  className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-4">
                    <span
                      className={`text-xs font-mono font-semibold uppercase tracking-widest ${
                        idx === 0 ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {campaign.tag}
                    </span>

                    <h3
                      className={`text-2xl sm:text-3xl font-bold font-editorial leading-tight ${
                        idx === 0 ? 'text-white' : 'text-stone-900 dark:text-white'
                      }`}
                    >
                      {campaign.title}
                    </h3>

                    <div
                      className={`text-xs uppercase font-semibold tracking-wider ${
                        idx === 0 ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400'
                      }`}
                    >
                      {campaign.subtitle}
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        idx === 0 ? 'text-stone-300' : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {campaign.description}
                    </p>

                    <div className="pt-4">
                      <Link to={campaign.link}>
                        <Button
                          variant={idx === 0 ? 'cobalt' : 'primary'}
                          size="md"
                          icon={ArrowRight}
                          iconPosition="right"
                        >
                          Explore This Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
