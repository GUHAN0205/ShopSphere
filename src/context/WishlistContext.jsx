import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { toastWishlist, toastInfo } = useToast();
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      toastInfo('Removed from Wishlist', `${product.name} was removed from your saved items.`);
    } else {
      setWishlist(prev => [...prev, product]);
      toastWishlist('Saved to Wishlist', `${product.name} added to your wishlist.`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
