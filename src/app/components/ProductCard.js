'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <img
            src={product.image ? product.image : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="p-6 grid-rows-2  ">
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-lg font-bold text-blue-600 mb-4">₹{product.price.toFixed(2)}</p>
        </div>
        <div className="flex flex-col ">
          <Link href={`/products/${product.id}`} className=" text-center bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            View Details
          </Link>
          {<button
            onClick={() => addToCart(product)}
            className=" bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>}
        </div>
      </div>
    </div>
  );
}