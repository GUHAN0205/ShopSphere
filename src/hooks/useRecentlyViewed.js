import { useState, useEffect, useCallback } from 'react';

const RECENT_KEY = 'shopsphere_recently_viewed';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const recordView = useCallback((product) => {
    if (!product || !product.id) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch {
        // storage quota
      }
      return updated;
    });
  }, []);

  return { recentlyViewed, recordView };
}
