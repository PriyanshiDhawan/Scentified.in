// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://scentified-in.onrender.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <section className="hero text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Welcome to Scentified.in</h1>
        <p className="text-lg text-gray-700">Your trusted destination for premium, 100% authentic perfume decants</p>
        <Link to="/shop" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-full shadow-md hover:bg-indigo-700 transition">
          Explore Our Collection
        </Link>
      </section>

      <section className="featured py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Picks</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.ID || product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;