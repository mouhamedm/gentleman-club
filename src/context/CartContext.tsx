import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  subtotal: number;
  discount: number;
  discountCode: string;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  applyDiscount: (code: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    id: 'heavyweight-hoodie',
    name: 'Raw Edges Heavyweight Hoodie (480 GSM)',
    price: 195,
    image: '/images/hero-img/look-04.webp',
    size: 'L',
    color: 'Distressed Charcoal',
    quantity: 1,
  },
];

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gentleman_club_cart');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('gentleman_club_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = newItem.quantity || 1;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { ...newItem, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GENTLEMAN10' || clean === 'SARTORIAL10' || clean === 'STREETWEAR10' || clean === 'VIP10') {
      setDiscountCode(clean);
      setDiscountPercent(0.1);
      return true;
    } else if (clean === 'DROP20' || clean === 'ATELIER20') {
      setDiscountCode(clean);
      setDiscountPercent(0.2);
      return true;
    }
    return false;
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        cartCount,
        subtotal,
        discount,
        discountCode,
        total,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyDiscount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
