'use client';
import Link from 'next/link';
import { ShoppingCart, Package, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItem } = useCart()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">E CART</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link href="/cart" className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {totalItem > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItem}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}