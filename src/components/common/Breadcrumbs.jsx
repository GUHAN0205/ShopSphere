import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs md:text-sm text-slate-400 py-3 overflow-x-auto whitespace-nowrap">
      <Link
        to="/"
        className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-white font-medium truncate max-w-[200px] md:max-w-xs dark:text-white light:text-slate-900">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-cyan-400 transition-colors shrink-0"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
