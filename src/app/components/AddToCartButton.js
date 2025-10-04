// app/components/AddToCartButton.js
'use client';

import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  );
}