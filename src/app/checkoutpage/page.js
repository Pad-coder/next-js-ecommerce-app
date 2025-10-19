'use client';
import React, { useState } from 'react'
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { X } from 'lucide-react'

function CheckOutPage() {

  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });
  const { cart, clearCart } = useCart();

  if (typeof window === 'undefined') {
    return redirect('/cart');
  }

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    await clearCart()
    toast.success('Order Placed Successfully');
    setShowAlert(false);
    router.push('/');
  };

  const CheckOutAlert = ({ onClose }) => {
    return (
      <div className='fixed w-100 h-50 flex justify-center items-center flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-gray-300 rounded-lg shadow-lg z-[1000]'>
        <X className='cursor-pointer self-end text-red-500 ' onClick={()=> setShowAlert(false)}/>
        <p className='font-medium text-xl text-gray-950 '>Kindly Confirm Your Order</p>
        <button onClick={onClose} className='btn bg-neutral-300 hover:bg-neutral-400 text-gray-950'>Confirm</button>
      </div>
    );
  };

  const EmptyCartAlert = () => {
    return(
      <div className='fixed w-100 h-50 flex justify-center items-center flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-gray-300 rounded-lg shadow-lg z-[1000]'>
    <X className='cursor-pointer self-end text-red-500 ' onClick={()=> setShowButton(false)}/>
    <p className='font-medium text-xl text-gray-950 '>Your cart is empty! Please add items to proceed.</p>
    <Link href='/' className='btn bg-neutral-300 hover:bg-neutral-400 text-gray-950'>Browse Products</Link>   
</div>
    )
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(calculateTotal() == 0 ){
      setShowButton(true);
      toast.error('Your cart is empty! Please add items to proceed.');
      return;
      
    }
    setShowAlert(true);
  };

  
  return (
    <div className={`flex flex-col-reverse lg:flex-row p-5 max-w-3xl mx-auto`}>
  <div className={`md:flex-1  ${showAlert ? 'blur-sm pointer-events-none select-none' : ''}`}>
    <form
      onSubmit={handleSubmit}
      className='p-5 mt-5 lg:mt-0 lg:mr-5 lg:p-5 border rounded-lg border-gray-300 dark:border-gray-700  bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm'
    >
      <h2 className='text-2xl mb-3 font-semibold'>Shipping Details</h2>

      <div className='mb-2.5'>
        <label className='block'>
          Full Name
          <input
            type="text"
            name="fullName"
            value={shippingDetails.fullName}
            onChange={handleInputChange}
            placeholder='Name'
            required
            className='w-full p-2 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
      </div>

      <div className='mb-2.5'>
        <label className='block'>
          Address
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            required
            placeholder='Address'
            className='w-full p-2 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
      </div>

      <div className='flex gap-2.5 mb-2.5'>
        {['city', 'state', 'zip'].map((field) => (
          <label key={field} className='flex-1 block capitalize'>
            {field}
            <input
              type="text"
              name={field}
              value={shippingDetails[field]}
              onChange={handleInputChange}
              placeholder={field}
              required
              className='w-full p-2 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </label>
        ))}
      </div>

      <div className='mb-2.5'>
        <label className='block'>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={shippingDetails.phone}
            onChange={handleInputChange}
            placeholder='Mobile / Phone Number'
            required
            className='w-full p-2 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
      </div>

      <div className='mb-2.5'>
        <label className='block'>
          Email
          <input
            type="email"
            name="email"
            value={shippingDetails.email}
            onChange={handleInputChange}
            required
            placeholder='Enter your Email'
            className='w-full p-2 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
      </div>

      <button
        type="submit"
        className='py-3 w-full px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded mt-2.5 cursor-pointer transition-colors'
      >
        Place Order
      </button>
    </form>
  </div>

  <div
    className={`flex-1 p-5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm ${showAlert ? 'blur-sm pointer-events-none select-none' : ''}`}
  >
    <h2 className='text-xl font-semibold mb-3'>Cart Details</h2>
    {cart.map((item) => (
      <div key={item.id} className='flex items-center justify-between mb-2.5'>
        <img
          src={item.image ? item.image : item.images[0]}
          className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
        />
        <span>{item.name} x {item.quantity}</span>
        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
      </div>
    ))}
    <hr className='border-gray-300 dark:border-gray-700' />
    <div className='flex justify-between font-bold mt-2.5 text-lg'>
      <span>Total</span>
      <span>₹{calculateTotal()}</span>
    </div>
  </div>

  {showAlert && <CheckOutAlert onClose={handleConfirmOrder} />}
  {showButton && <EmptyCartAlert />
}
  </div>

  )
}

export default CheckOutPage