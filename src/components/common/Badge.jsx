import React from 'react';

export function Badge({ children, variant = 'cyan', size = 'sm', className = '' }) {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 font-medium tracking-wide',
    sm: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
    md: 'text-sm px-3 py-1.5 font-semibold'
  };

  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30',
    violet: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    glass: 'bg-white/10 text-white backdrop-blur-md border border-white/20'
  };

  return (
    <span className={`inline-flex items-center rounded-full uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
