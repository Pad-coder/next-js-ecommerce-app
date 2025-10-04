// app/lib/data.js

export const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Fitness tracking smartwatch with heart rate monitor and GPS.",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Stylish leather backpack with laptop compartment and multiple pockets.",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    description: "Programmable coffee maker with thermal carafe and auto-brew feature.",
    category: "Home"
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh.",
    category: "Sports"
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "Modern LED desk lamp with adjustable brightness and USB charging port.",
    category: "Home"
  }
];

export const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return PRODUCTS;
};

export const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return PRODUCTS.find(p => p.id === parseInt(id));
};