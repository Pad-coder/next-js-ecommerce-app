// app/layout.js
import './globals.css'; // Make sure to have a globals.css for Tailwind
import { Inter } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ShopHub',
  description: 'A modern e-commerce experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}