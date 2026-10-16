import React from 'react';

export function Badge({ children, variant = 'neutral', size = 'sm', className = '' }) {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 font-bold tracking-wider',
    sm: 'text-[11px] px-2.5 py-1 font-semibold tracking-wide',
    md: 'text-xs px-3 py-1.5 font-bold'
  };

  const variantStyles = {
    neutral: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)]',
    cobalt: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    coral: 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
    lime: 'bg-lime-50 text-lime-800 border border-lime-200 dark:bg-lime-950/60 dark:text-lime-300 dark:border-lime-800',
    dark: 'bg-[#121316] text-white border border-transparent dark:bg-white dark:text-[#121316]',
    cyan: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
  };

  return (
    <span className={`inline-flex items-center rounded-full uppercase ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.neutral} ${className}`}>
      {children}
    </span>
  );
}
