import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { toastCart, toastInfo, toastError } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('shopsphere_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('shopsphere_promo');
      }
    } catch {
      // storage unavailable
    }
  }, [appliedPromo]);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || 'Standard';
    const cartItemId = `${product.id}-${color}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stockCount || 99)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            cartItemId,
            selectedColor: color,
            quantity: Math.min(quantity, product.stockCount || 99)
          }
        ];
      }
    });

    toastCart(
      'Added to Cart',
      `${quantity}x ${product.name} (${color})`
    );
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const maxStock = item.stockCount || 99;
          return {
            ...item,
            quantity: Math.min(newQuantity, maxStock)
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cart.find(item => item.cartItemId === cartItemId);
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      toastInfo('Removed from Cart', `${itemToRemove.name} was removed.`);
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BEYOND20') {
      setAppliedPromo({ code: 'BEYOND20', discountPercent: 20, description: '20% Off Storewide' });
      toastCart('Promo Code Applied', '20% off discount activated!');
      return { success: true, message: 'Promo applied: 20% discount!' };
    } else if (cleanCode === 'SPHERE10') {
      setAppliedPromo({ code: 'SPHERE10', discountPercent: 10, description: '10% Off Your Order' });
      toastCart('Promo Code Applied', '10% off discount activated!');
      return { success: true, message: 'Promo applied: 10% discount!' };
    } else if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', freeShipping: true, description: 'Free Expedited Shipping' });
      toastCart('Promo Code Applied', 'Free shipping applied!');
      return { success: true, message: 'Free shipping promo applied!' };
    } else {
      toastError('Invalid Code', 'Try "BEYOND20" or "SPHERE10" for a discount.');
      return { success: false, message: 'Invalid promo code.' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toastInfo('Promo Removed', 'Discount has been removed.');
  };

  const { subtotal, discountAmount, shippingCharge, taxAmount, total, cartCount } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);

    let discount = 0;
    if (appliedPromo && appliedPromo.discountPercent) {
      discount = (sub * appliedPromo.discountPercent) / 100;
    }

    const discountedSub = Math.max(0, sub - discount);

    let shipping = 0;
    if (cart.length > 0) {
      if (appliedPromo?.freeShipping || discountedSub >= 150) {
        shipping = 0;
      } else {
        shipping = 12.00;
      }
    }

    // 8% estimated tax
    const tax = discountedSub * 0.08;
    const finalTotal = discountedSub + shipping + tax;

    return {
      subtotal: sub,
      discountAmount: discount,
      shippingCharge: shipping,
      taxAmount: tax,
      total: finalTotal,
      cartCount: count
    };
  }, [cart, appliedPromo]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discountAmount,
        shippingCharge,
        taxAmount,
        total,
        appliedPromo,
        applyPromoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
