import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="py-20 sm:py-32 max-w-4xl mx-auto px-4 text-center bg-[#faf9f5] dark:bg-[#0c0d11] text-[#121316] dark:text-[#f3efe6]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 p-8 sm:p-16 shadow-lg overflow-hidden"
      >
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-stone-100 dark:bg-white/5 border border-[#e7e2d9] dark:border-white/10 text-stone-900 dark:text-white flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Compass className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="text-7xl sm:text-9xl font-bold font-editorial text-stone-900 dark:text-white tracking-tighter">
            404
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-white mt-2">
            Page Not Found
          </h1>

          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mt-3 leading-relaxed font-normal">
            The collection, category, or object you are seeking may have moved or does not exist in our catalog.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                icon={Home}
                className="w-full sm:w-auto shadow-md"
              >
                Return to Storefront
              </Button>
            </Link>

            <Link to="/products">
              <Button
                variant="secondary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Browse All 48 Products
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
