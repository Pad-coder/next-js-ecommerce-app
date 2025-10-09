'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ChevronRight} from 'lucide-react';

export default function ProductCard({ product }) {
  const { cart , addToCart, removeFromCart } = useCart();
  
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
        <div className='flex justify-between gap-2'><p className="text-lg font-bold text-blue-600 mb-4">₹{Math.trunc(product.price)}</p> {["meats", "vegetables", "fruits"].includes(product.category) && <span className='text-[12px]'>(*Per Kg)</span>}</div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Link href={`/products/${product.id}`} className="btn text-center bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            View Details
          </Link>
          {cart.find(item=> item.id === product.id) ?<button
            onClick={() => removeFromCart(product.id)}
            className=" bg-blue-700 text-white px-4 py-2 rounded-lg font-medium  transition-colors"
          >
            Remove
          </button> : <button
            onClick={() => addToCart(product)}
            className=" bg-green-600  text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>}
          { cart.find(item=> item.id === product.id) && <button className='self-end'><Link href='/cart' className='flex items-center'>
            Go to cart <ChevronRight className="w-5 h-5" />
          </Link></button>

          }
        </div>
      </div>
    </div>
  );
}