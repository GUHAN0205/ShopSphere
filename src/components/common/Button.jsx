import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    icon: 'p-2.5 rounded-xl'
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:brightness-110 active:brightness-95 border border-white/20',
    secondary: 'bg-white/10 hover:bg-white/15 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-white border border-white/10 hover:border-white/20 backdrop-blur-md shadow-sm',
    accent: 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25 border border-violet-400/30',
    outline: 'bg-transparent hover:bg-white/5 border border-slate-700 hover:border-slate-500 text-slate-200 dark:text-slate-200 light:text-slate-700 light:border-slate-300 light:hover:bg-slate-100',
    ghost: 'bg-transparent hover:bg-white/10 dark:hover:bg-slate-800/60 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25',
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </motion.button>
  );
}
