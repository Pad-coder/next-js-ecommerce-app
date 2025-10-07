'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddToCartButton from '@/app/components/AddToCartButton';

export default function ProductDetailPage({ params }) {

  const [product, setProduct] = useState('')
  

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/products/productbyId/${params.id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Error fetching product:", err));
    }, [params.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Products</span>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img src={product.image ? product.image : product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">₹{product.price.toFixed(2)}</p> {["meats", "vegetables", "fruits"].includes(product.category) && <span className='text-[12px]'>(*Per Kg)</span>}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}