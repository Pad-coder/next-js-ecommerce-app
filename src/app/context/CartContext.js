'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch('/api/cart/');
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    getCart();
  }, [])

  const addToCart = async (product) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ product }),
      });
      const data = await res.json();
      setCart(data.cart)
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ product }),
      });
      const data = await res.json();
      setCart(data)
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const updateQuantity = async (productId, delta) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({ productId, delta }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update cart: ${errorText}`);
      }
      const updatedCart = await res.json();
      setCart(updatedCart);

    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async ()=>{
     try {
    const res = await fetch("/api/cart/clearCart", {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setCart(data.cart); 
    }
  } catch (error) {
    console.error(" Error clearing cart:", error);
  }
  }

  const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart,
    totalItem,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};