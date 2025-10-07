'use client';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }) {
  const {cart, addToCart, removeFromCart } = useCart();


  return (
     <>
     {cart.find(item => item.id === product.id) ? 
      <button
      onClick={() => removeFromCart(product.id)}
      className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg  transition-colors flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Remove
    </button>
    : 
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
     }
 
     </>
  );
}
