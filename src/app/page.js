'use client'
import { useState } from 'react';
import ProductCard from './components/ProductCard';
import { useProduct } from './context/ProductContext';

export default  function HomePage() {
  const {products} = useProduct()

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (page) =>{ setCurrentPage(page)}

    const previousPage = ()=>{
      if(currentPage >1)
      setCurrentPage(currentPage -1)
    }

    const nextPage =()=>{
      if(currentPage < totalPages)
        setCurrentPage(currentPage + 1)
    }
  return (
   <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h1>
        <p className="text-gray-600">Discover our collection of premium items</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>

    <div className='w-fit flex mx-auto gap-5 mb-10'>
     
      <button className='btn' onClick={(()=>paginate(1))} > First </button>
      <button className='btn' onClick={()=> previousPage()} disabled={currentPage === 1}> Previous </button>
      {new Array(totalPages).fill(0).map((_,idx)=>{
        return <button key={idx +1} onClick={()=>setCurrentPage(idx+1)} className={`w-10 h-10 rounded-3xl hover:bg-green-600 ${currentPage === idx +1 && "bg-green-600"}`}>{idx + 1}</button>
      })}
      <button className='btn' onClick={()=> nextPage()} disabled={currentPage === totalPages}> Next </button>
      <button className='btn' onClick={(()=>paginate(totalPages))}> Last </button>
    
    </div>
   </>
  );
}