'use client';
import React, { useState } from 'react'
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import {toast } from 'react-toastify';
import {X} from 'lucide-react'

function CheckOutPage() {

  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

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



  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    await clearCart()
    toast.success('Order Placed Successfully');
    setShowAlert(false);
    router.push('/');
  };

  const CustomAlert = ({ onClose }) => {
    return (
      <div className='fixed w-100 h-50 flex justify-center items-center flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-gray-300 rounded-lg shadow-lg z-[1000]'>
        <X className='cursor-pointer self-end text-red-500 ' onClick={()=> setShowAlert(false)}/>
        <p className='font-medium text-xl '>Kindly Confirm Your Order</p>
        <button onClick={onClose} className='btn bg-neutral-300'>Confirm</button>
      </div>
    );
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);
  };
  return (
    <div className={`flex flex-col-reverse lg:flex-row p-5 max-w-3xl mx-auto `}>
{/* ${showAlert ? 'blur-sm pointer-events-none select-none' : ''} */}
      <div className={`md:flex-1 ${showAlert ? 'blur-sm pointer-events-none select-none' : ''} `}>
        <form
          onSubmit={handleSubmit}
          className='p-5 mt-5 lg:mt-0 lg:mr-5 lg:p-5 border-1 border-gray-300 rounded'
        >
          <h2 className='text-2xl'>Shipping Details</h2>
          <div className='mb-2.5'>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={shippingDetails.fullName}
                onChange={handleInputChange}
                placeholder='Name'
                required
                className='w-full p-2 mt-2'
              />

            </label>
          </div>
          <div className='mb-2.5'>
            <label>
              Address
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
                placeholder='Address'
                className='w-full p-2 mt-2'
              />

            </label>
          </div>
          <div className='flex gap-2.5 mb-2.5'>
            <label className='flex-1'>
              City
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                placeholder='City'
                required
                className='w-full p-2 mt-2'
              />
            </label>
            <label className='flex-1'>
              State
              <input
                type="text"
                name="state"
                value={shippingDetails.state}
                onChange={handleInputChange}
                placeholder='State'
                required
                className='w-full p-2 mt-2'
              />
            </label>
            <label className='flex-1'>
              Zip Code
              <input
                type="text"
                name="zip"
                value={shippingDetails.zip}
                onChange={handleInputChange}
                required
                placeholder='Zip Code'
                className='w-full p-2 mt-2'
              />
            </label>
          </div>
          <div className='mb-2.5'>
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                placeholder='Mobile / Phone Number'
                required
                className='w-full p-2 mt-2'
              />
            </label>
          </div>
          <div className='mb-2.5'>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                required
                className='w-full p-2 mt-2 '
                placeholder='Enter your Email'
              />
            </label>
          </div>
          <button
            type="submit"
            className='py-3 w-full  px-5 bg-blue-600 text-white border-none rounded mt-2.5 cursor-pointer'
          >
            Place Order
          </button>
        </form>

      </div>
      <div
        className={`flex-1 p-5 border border-gray-300 rounded-lg bg-gray-50 ${showAlert ? 'blur-sm pointer-events-none select-none' : ''} `}
      >
        <h2 className='text-xl'>Cart Details</h2>
        {cart.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between mb-2.5'
          >
            <img src={item.image ? item.image : item.images[0]} className="w-24 h-24 object-cover rounded-lg" />
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div
          className='flex justify-between font-bold mt-2.5 text-lg'
        >
          <span>Total</span>
          <span>₹{calculateTotal()}</span>
        </div>
      </div>
      {showAlert && <CustomAlert onClose={handleConfirmOrder} />}
    </div>
  )
}

export default CheckOutPage