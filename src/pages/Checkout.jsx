// src/pages/Checkout.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: total * 100,
        currency: 'INR',
        name: 'Scentified.in',
        description: 'Perfume Decants',
        handler: (response) => {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          clearCart();
        },
        prefill: {
          name: 'Customer',
          email: 'email@example.com'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total: ₹{total}</p>
      <button onClick={loadRazorpay}>Pay Now</button>
    </div>
  );
};

export default Checkout;