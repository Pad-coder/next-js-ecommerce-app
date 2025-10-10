'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])
useEffect(()=>{
const fetchProduct = async ()=>{
     const res = await fetch('/api/products/allProducts')
     const data = await res.json()
     let shuffledArray = await data.sort(() => Math.random()-0.5)
      setProducts(shuffledArray)
      setLoading(false)
}
fetchProduct()
},[])

const filterProducts = (category) => {
    if (category === 'all') {
        setFilteredProducts(products);
        return;
    }
    const filtered = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    setFilteredProducts(filtered);
}
const value = {
    products,
    filterProducts,
    filteredProducts,
    loading
}
return <ProductContext.Provider value={value} >{children}</ProductContext.Provider>

}

