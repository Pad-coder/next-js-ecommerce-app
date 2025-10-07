'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])

useEffect(()=>{
const fetchProduct = async ()=>{
     const res = await fetch('/api/products/allProducts')
     const data = await res.json()
     let shuffledArray = await data.sort(() => Math.random()-0.5)
      setProducts(shuffledArray)
}
fetchProduct()
},[])

const value = {
    products
}
return <ProductContext.Provider value={value} >{children}</ProductContext.Provider>

}

