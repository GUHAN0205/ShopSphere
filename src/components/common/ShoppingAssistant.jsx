import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, ArrowRight, ShoppingBag, Send } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const SUGGESTIONS = [
  { label: 'Audio Gear', query: 'audio' },
  { label: 'Under $200', query: 'under200' },
  { label: 'Titanium & EDC', query: 'titanium' },
  { label: 'Workspace Setup', query: 'workspace' },
  { label: 'Active Promos', query: 'promos' }
];

export function ShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hello! I'm Sphere Concierge, your local personal shopping guide. What kind of gear or style are you looking for today?",
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
      replyText = `Here are our highest-rated curated picks under $200:`;
    } else if (q.includes('audio') || q.includes('headphone') || q.includes('sound') || q.includes('music')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'electronics' && p.tags.includes('audio')).slice(0, 3);
      replyText = `For acoustic immersion and spatial precision, check out these audio flagships:`;
    } else if (q.includes('titanium') || q.includes('edc') || q.includes('watch') || q.includes('accessories')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'accessories').slice(0, 3);
      replyText = `Here are our aerospace-grade titanium instruments and precision EDC items:`;
    } else if (q.includes('workspace') || q.includes('desk') || q.includes('ergonomic') || q.includes('chair')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'home-living' || p.tags.includes('workspace')).slice(0, 3);
      replyText = `Elevate your sanctuary with these ergonomic and ambient workspace enhancements:`;
    } else if (q.includes('promo') || q.includes('discount') || q.includes('coupon') || q.includes('code')) {
      replyText = `You can apply code "BEYOND20" during checkout for 20% off your entire order, or "FREESHIP" for free express delivery!`;
    } else {
      matchedProducts = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3);

      if (matchedProducts.length > 0) {
        replyText = `Found ${matchedProducts.length} items matching "${query}":`;
      } else {
        replyText = `I couldn't find exact matches for "${query}". Try exploring our top trending audio, titanium watches, or minimalist workspace categories!`;
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
          className="relative p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 text-white shadow-xl shadow-cyan-500/25 border border-white/20 flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          </div>
          <span className="hidden md:inline font-semibold text-xs tracking-wide">
            Sphere Concierge
          </span>
        </motion.button>
      </div>

      {/* Assistant Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-22 right-4 md:right-8 z-50 w-full max-w-sm rounded-3xl glass-panel bg-[#0d1124]/95 border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sphere Concierge</h4>
                  <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Local Deterministic Advisor
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
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
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium rounded-tr-none'
                        : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-2 space-y-2">
                      {msg.products.map(prod => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-400/40 transition-colors"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/products/${prod.id}`}
                              onClick={() => setIsOpen(false)}
                              className="font-medium text-white hover:text-cyan-400 truncate block"
                            >
                              {prod.name}
                            </Link>
                            <span className="text-[11px] font-bold text-cyan-400">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                          <button
                            onClick={() => addToCart(prod, 1)}
                            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-colors"
                            title="Add to cart"
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
            <div className="px-3 py-2 bg-white/[0.02] border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap">
              {SUGGESTIONS.map(s => (
                <button
                  key={s.label}
                  onClick={() => handleQuery(s.query)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-slate-300 border border-white/10 transition-colors hover:text-cyan-300"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="p-3 bg-white/[0.04] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about gear, prices, or style..."
                className="flex-1 bg-white/5 text-white placeholder-slate-400 rounded-xl px-3 py-2 text-xs border border-white/10 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 transition-colors cursor-pointer"
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
