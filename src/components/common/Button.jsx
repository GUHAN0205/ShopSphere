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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d4ed8] select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold tracking-wide',
    md: 'text-sm px-5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-bold',
    icon: 'p-2.5 rounded-xl'
  };

  const variantStyles = {
    primary: 'bg-[#121316] text-white hover:bg-[#2b2d35] dark:bg-white dark:text-[#121316] dark:hover:bg-slate-200 shadow-sm hover:shadow-md border border-transparent',
    secondary: 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)] shadow-xs',
    cobalt: 'bg-[#1d4ed8] hover:bg-[#1e40af] text-white shadow-sm hover:shadow-md border border-transparent',
    coral: 'bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-sm hover:shadow-md border border-transparent',
    outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
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
