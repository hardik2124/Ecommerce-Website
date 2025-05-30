import React from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
});

export const useCart = () => React.useContext(CartContext);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  React.useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { product, quantity, size, color }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.discount > 0
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};