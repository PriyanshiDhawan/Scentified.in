import React from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success('Removed from cart');
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-sm text-red-600 underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right font-semibold">
            Total: ₹{totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;