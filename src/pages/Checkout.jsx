import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    // Load Razorpay script once
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!razorpayLoaded) {
      alert("Razorpay is still loading...");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: total * 100, // in paise
      currency: "INR",
      name: "Scentified.in",
      description: "Perfume Decants",
      handler: (response) => {
        alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        clearCart(); // clear cart after payment
      },
      prefill: {
        name: "Customer",
        email: "email@example.com",
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-4">Total: ₹{total}</h3>
          <button
            onClick={handlePayment}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;