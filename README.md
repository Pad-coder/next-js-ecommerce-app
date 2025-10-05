# Mini E-Commerce Website

A simple **mini e-commerce website** built with **Next.js**, **Tailwind CSS**, and **Context API** for state management. This project demonstrates the fundamentals of building a full-stack e-commerce application including product listing, cart management, and checkout functionality.

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React.js  
- **Styling:** Tailwind CSS  
- **State Management:** Context API  
- **Backend/Mock API:** Next.js API Routes  

---

## 📄 Pages

1. **Home Page**  
   - Displays a list of products fetched from the API  
   - Product cards with image, title, price, View details and “Add to Cart” button  

2. **Product Page**  
   - Shows detailed information about a single product  
   - Option to add the product to the cart  

3. **Cart Page**  
   - Displays all products added to the cart  
   - Options to increment/decrement quantity  
   - Remove products from the cart  

4. **Checkout Page**  
   - Displays order summary  
   - Simple form for checkout (mock, without payment integration)  

---

## 🔌 API Routes

- **GET `/api/products/allProducts`** – Fetch all products  
- **POST `/api/cart`** – Add a product to the cart  
- **DELETE `/api/cart`** – Remove a product from the cart  


---

## ⚡ Features

- Product listing and details  
- Cart management (add, remove, increment, decrement)  
- Context API for global state management  
- Tailwind CSS for responsive and modern UI  
- Next.js API routes for serverless backend operations  


