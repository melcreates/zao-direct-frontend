import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext'; // import your user context

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext); // get current logged-in user
  const [cartItems, setCartItems] = useState([]);

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } else {
      setCartItems([]); // clear cart on logout
    }
  }, [user]);

  // Save cart when it changes (if user is logged in)
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (product) => {
    if (!product || !product.id) {
    console.warn("Tried to add invalid product to cart:", product);
    return prevItems => prevItems; // no changes
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) localStorage.removeItem(`cart_${user.id}`);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
