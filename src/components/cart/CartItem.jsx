import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    updateQuantity(item.cartItemId, item.quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(item.cartItemId, item.quantity + 1);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-[#e7e2d9] dark:border-white/10 hover:border-stone-400 dark:hover:border-white/20 transition-all shadow-xs">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link to={`/products/${item.id}`} className="shrink-0">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-stone-100 dark:bg-stone-900 border border-[#e7e2d9]/60 dark:border-white/10 hover:scale-105 transition-transform"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
            {item.categoryName || item.category}
          </span>
          <Link
            to={`/products/${item.id}`}
            className="block text-base font-bold font-editorial text-stone-900 dark:text-white hover:text-blue-600 transition-colors truncate"
          >
            {item.name}
          </Link>
          <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Finish: <span className="text-stone-900 dark:text-white font-medium">{item.selectedColor}</span>
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Unit Price: <span className="text-stone-900 dark:text-white font-medium">{formatPrice(item.price)}</span>
          </div>
        </div>
      </div>

      {/* Quantity & Pricing Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#e7e2d9] dark:border-white/5">
        {/* Quantity Selector */}
        <div className="flex items-center border border-[#e7e2d9] dark:border-white/15 rounded-xl bg-stone-50 dark:bg-stone-900 overflow-hidden">
          <button
            onClick={handleDecrease}
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 py-1 text-xs font-bold text-stone-900 dark:text-white min-w-8 text-center font-mono">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={item.stockCount && item.quantity >= item.stockCount}
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-24">
          <div className="text-base font-extrabold text-stone-900 dark:text-white font-editorial">
            {formatPrice(lineTotal)}
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.cartItemId)}
          className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
