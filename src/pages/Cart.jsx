import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Price: ₹{item.price} ×
                  </p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 mt-1 px-2 py-1 border rounded"
                  />
                  <p className="text-sm mt-1">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 text-right">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-xl shadow hover:bg-gray-800"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;