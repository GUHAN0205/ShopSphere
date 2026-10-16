import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, ShoppingBag, Heart } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 3800, action = null }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, message, type, duration, action };

    setToasts(prev => [newToast, ...prev.slice(0, 4)]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toastSuccess = useCallback((title, message, action) => {
    addToast({ title, message, type: 'success', action });
  }, [addToast]);

  const toastError = useCallback((title, message) => {
    addToast({ title, message, type: 'error' });
  }, [addToast]);

  const toastInfo = useCallback((title, message) => {
    addToast({ title, message, type: 'info' });
  }, [addToast]);

  const toastCart = useCallback((title, message, action) => {
    addToast({ title, message, type: 'cart', action });
  }, [addToast]);

  const toastWishlist = useCallback((title, message) => {
    addToast({ title, message, type: 'wishlist' });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toastSuccess, toastError, toastInfo, toastCart, toastWishlist }}>
      {children}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4"
      >
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto rounded-2xl p-4 shadow-2xl backdrop-blur-xl border flex items-start gap-3.5 bg-[#0d1124]/95 border-white/10 text-white dark:bg-[#0d1124]/95 dark:border-white/10 light:bg-white/95 light:border-slate-200 light:text-slate-900"
              style={{
                boxShadow: toast.type === 'success' || toast.type === 'cart'
                  ? '0 10px 30px -10px rgba(6, 182, 212, 0.35)'
                  : toast.type === 'wishlist'
                  ? '0 10px 30px -10px rgba(236, 72, 153, 0.35)'
                  : '0 10px 30px -10px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                {toast.type === 'cart' && <ShoppingBag className="w-5 h-5 text-cyan-400" />}
                {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-violet-400" />}
              </div>

              <div className="flex-1 min-w-0">
                {toast.title && (
                  <h4 className="text-sm font-semibold tracking-tight text-white dark:text-white light:text-slate-900 leading-snug">
                    {toast.title}
                  </h4>
                )}
                {toast.message && (
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5 leading-relaxed">
                    {toast.message}
                  </p>
                )}
                {toast.action && (
                  <div className="mt-2.5">
                    {toast.action}
                  </div>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
