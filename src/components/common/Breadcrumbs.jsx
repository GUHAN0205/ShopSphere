import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs md:text-sm text-stone-500 dark:text-stone-400 py-3 overflow-x-auto whitespace-nowrap">
      <Link
        to="/"
        className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Storefront</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300 dark:text-stone-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-stone-900 dark:text-white font-semibold truncate max-w-[200px] md:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0 font-medium"
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
