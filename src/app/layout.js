
import './globals.css';
import { Poppins } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';

const poppins = Poppins({ 
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      subsets: ['latin'], 
      display: 'swap',
      variable: '--font-poppins',
 });

export const metadata = {
  title: 'E Cart',
  description: 'A modern e-commerce experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
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