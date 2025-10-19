'use client'
import { useState } from 'react';
import ProductCard from './components/ProductCard';
import { useProduct } from './context/ProductContext';

export default  function HomePage() {
  const {products,filterProducts, filteredProducts,loading} = useProduct()
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = category === "all" ? products.slice(indexOfFirstItem, indexOfLastItem) : filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(category === "all" ? products.length / itemsPerPage : filteredProducts.length / itemsPerPage);

   
    
    const paginate = (page) =>{ setCurrentPage(page)}

    const previousPage = ()=>{
      if(currentPage >1)
      setCurrentPage(currentPage -1)
    }

    const nextPage =()=>{
      if(currentPage < totalPages)
        setCurrentPage(currentPage + 1)
    }
    const handleCategoryChange = (e) => {
      const selectedCategory = e.target.value;
      setCategory(selectedCategory);
      filterProducts(selectedCategory);
      setCurrentPage(1); 
    }
    if(loading){
      return <div className='h-screen flex justify-center items-center'>
          <span className="loading loading-dots loading-xl "></span>
      </div>
    }
  return (
   <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h1>
        <p className="text-gray-600">Discover our collection of premium items</p>
      </div>
      <div className="mb-8 flex justify-end">
       <select
  className="w-auto border border-gray-300 rounded-md px-4 py-2 
             text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 
             focus:ring-blue-500 focus:border-blue-500 transition duration-200
             hover:shadow-md cursor-pointer"
  
  onChange={(e) => handleCategoryChange(e)}
>
  <option value="all"  className="text-gray-600">All</option>
  {products
    .map(product => product.category)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((category, idx) => (
      <option key={idx} value={category.toLowerCase()}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </option>
    ))}
</select>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>

   <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-10  w-full px-2 `}>
  {/* ${(category === 'all' && currentItems.length < 9 && products.length >= 8 ) || (category !== 'all' && currentItems.length < 9 && filteredProducts.length >= 8 ) ? '' : 'hidden'} */}
  <button
    className="btn  text-[10px] sm:text-[12px] md:text-sm px-2 sm:px-3 md:px-4"
    onClick={() => paginate(1)}
  >
    First
  </button>

  <button
    className="btn text-[10px] sm:text-[12px] md:text-sm px-2 sm:px-3 md:px-4"
    onClick={() => previousPage()}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3">
    {new Array(totalPages).fill(0).map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => setCurrentPage(idx + 1)}
        className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full text-[12px] sm:text-sm font-medium 
          hover:bg-green-600 transition-colors duration-200 
          ${currentPage === idx + 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
      >
        {idx + 1}
      </button>
    ))}
  </div>

  <button
    className="btn text-[10px] sm:text-[12px] md:text-sm px-2 sm:px-3 md:px-4"
    onClick={() => nextPage()}
    disabled={currentPage === totalPages}
  >
    Next
  </button>

  <button
    className="btn text-[10px] sm:text-[12px] md:text-sm px-2 sm:px-3 md:px-4"
    onClick={() => paginate(totalPages)}
  >
    Last
  </button>
</div>

   </>
  );
}