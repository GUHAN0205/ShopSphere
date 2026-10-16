import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const { toastInfo } = useToast();
  const [compareItems, setCompareItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleCompare = (product) => {
    if (compareItems.some(item => item.id === product.id)) {
      setCompareItems(prev => prev.filter(item => item.id !== product.id));
      toastInfo('Removed from Comparison', `${product.name} removed from compare list.`);
    } else {
      if (compareItems.length >= 3) {
        toastInfo('Comparison Limit', 'You can compare up to 3 products at a time.');
        setIsDrawerOpen(true);
        return;
      }
      setCompareItems(prev => [...prev, product]);
      toastInfo('Added to Comparison', `${product.name} added. View side-by-side specs.`);
      setIsDrawerOpen(true);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsDrawerOpen(false);
  };

  const isInCompare = (productId) => {
    return compareItems.some(item => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
