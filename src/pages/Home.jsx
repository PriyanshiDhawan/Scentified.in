import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(items);
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Our Fragrances</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 shadow">
            {product.image && <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />}
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-700 mb-2">₹{product.price}</p>
            <button
              onClick={() => handleAdd(product)}
              className="bg-black text-white py-1 px-3 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;