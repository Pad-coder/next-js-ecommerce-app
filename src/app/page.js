'use client'
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { data } from 'autoprefixer';

export default  function HomePage() {
  const [products,setProducts] = useState([])
  

useEffect(()=>{
 fetch('/api/products/allProducts').then((res)=> res.json())
 .then((data)=>setProducts(data))
},[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h1>
        <p className="text-gray-600">Discover our collection of premium items</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}