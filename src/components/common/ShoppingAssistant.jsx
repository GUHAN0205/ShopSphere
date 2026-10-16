import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, ArrowRight, ShoppingBag, Send } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const SUGGESTIONS = [
  { label: 'Audio & Acoustics', query: 'audio' },
  { label: 'Under $200', query: 'under200' },
  { label: 'Horology & EDC', query: 'watches' },
  { label: 'Desk Setup', query: 'workspace' },
  { label: 'Active Vouchers', query: 'promos' }
];

export function ShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Welcome to ShopSphere 2.0. I am your local concierge advisor. What object or aesthetic are you looking for today?",
      products: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const { addToCart } = useCart();

  const handleQuery = (query) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      products: []
    };

    let replyText = '';
    let matchedProducts = [];

    const q = query.toLowerCase();

    if (q.includes('under200') || q.includes('under $200') || q.includes('cheap') || q.includes('budget')) {
      matchedProducts = PRODUCTS.filter(p => p.price <= 200).slice(0, 3);
      replyText = `Here are our top curated objects under $200:`;
    } else if (q.includes('audio') || q.includes('headphone') || q.includes('sound') || q.includes('music')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'audio' || p.category === 'electronics').slice(0, 3);
      replyText = `For acoustic fidelity and spatial precision, consider these pieces:`;
    } else if (q.includes('watch') || q.includes('watches') || q.includes('horology') || q.includes('timepiece')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'watches').slice(0, 3);
      replyText = `Here are our precision titanium horological pieces:`;
    } else if (q.includes('workspace') || q.includes('desk') || q.includes('ergonomic') || q.includes('home')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'home-living' || p.lifestyle === 'work').slice(0, 3);
      replyText = `Elevate your sanctuary with these workspace and living additions:`;
    } else if (q.includes('promo') || q.includes('discount') || q.includes('coupon') || q.includes('code') || q.includes('voucher')) {
      replyText = `Apply voucher code "BEYOND20" during checkout for 20% off your entire order, or "FREESHIP" for free express courier!`;
    } else {
      matchedProducts = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3);

      if (matchedProducts.length > 0) {
        replyText = `Found ${matchedProducts.length} objects matching "${query}":`;
      } else {
        replyText = `I couldn't find exact matches for "${query}". Try exploring audio acoustics, titanium horology, or desk objects!`;
      }
    }

    const assistantMessage = {
      id: Date.now() + 1,
      sender: 'assistant',
      text: replyText,
      products: matchedProducts
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInputText('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleQuery(inputText);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Shopping Assistant"
          className="relative p-3.5 rounded-2xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] shadow-xl border border-stone-800 dark:border-stone-200 flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-blue-400 dark:text-blue-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          </div>
          <span className="hidden md:inline font-semibold text-xs tracking-wide">
            Concierge
          </span>
        </motion.button>
      </div>

      {/* Assistant Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-22 right-4 md:right-8 z-50 w-full max-w-sm rounded-3xl bg-[#faf9f5] dark:bg-[#12141c] text-[#121316] dark:text-[#f3efe6] border border-[#e7e2d9] dark:border-white/15 shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 bg-white dark:bg-white/5 border-b border-[#e7e2d9] dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#121316] dark:bg-white text-white dark:text-[#121316] flex items-center justify-center font-bold shadow-xs">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-editorial text-stone-900 dark:text-white">ShopSphere Concierge</h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Local Curatorial Guide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-[#121316] text-white dark:bg-white dark:text-[#121316] font-medium rounded-tr-none'
                        : 'bg-white dark:bg-white/5 text-stone-800 dark:text-stone-200 border border-[#e7e2d9] dark:border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-2 space-y-2">
                      {msg.products.map(prod => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-stone-900/90 border border-[#e7e2d9] dark:border-white/10 transition-colors shadow-xs"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/products/${prod.id}`}
                              onClick={() => setIsOpen(false)}
                              className="font-semibold text-stone-900 dark:text-white hover:text-blue-600 truncate block"
                            >
                              {prod.name}
                            </Link>
                            <span className="text-[11px] font-bold text-stone-900 dark:text-white">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                          <button
                            onClick={() => addToCart(prod, 1)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-white/10 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                            title="Add to bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 py-2 bg-stone-100/60 dark:bg-white/[0.02] border-t border-[#e7e2d9] dark:border-white/10 flex gap-1.5 overflow-x-auto whitespace-nowrap">
              {SUGGESTIONS.map(s => (
                <button
                  key={s.label}
                  onClick={() => handleQuery(s.query)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-stone-200 text-[10px] font-medium text-stone-700 dark:text-stone-300 border border-[#e7e2d9] dark:border-white/10 transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="p-3 bg-white dark:bg-white/5 border-t border-[#e7e2d9] dark:border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about acoustics, horology, vouchers..."
                className="flex-1 bg-stone-50 dark:bg-white/5 text-stone-900 dark:text-white placeholder-stone-400 rounded-xl px-3 py-2 text-xs border border-[#e7e2d9] dark:border-white/10 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-[#121316] hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-[#121316] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
