import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("https://scentified-in.onrender.com/api/products")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.ID || item.id,
          name: item.Name,
          price_5ml: item["5ml"],
          price_10ml: item["10ml"],
          price_30ml: item["30ml"],
          description: item["Short Description"],
          image: item.image || "/assets/default.jpg"
        }));

        // Shuffle and take 3 random featured products
        const shuffled = formatted.sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 3));
      })
      .catch(err => {
        console.error("Failed to fetch featured products:", err);
        setFeatured([
          { id: '1', name: 'Dior Sauvage EDP', price_5ml: 499, image: '/assets/sauvage.jpg' },
          { id: '2', name: 'Creed Aventus', price_5ml: 799, image: '/assets/aventus.jpg' },
          { id: '3', name: 'Tom Ford Oud Wood', price_5ml: 899, image: '/assets/oudwood.jpg' }
        ]);
      });
  }, []);

  return (
    <div className="home p-6">
      {/* Hero Section */}
      <section className="hero text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Welcome to Scentified.in</h1>
        <p className="text-gray-700 mb-4">Your trusted destination for premium, 100% authentic perfume decants</p>
        <Link to="/shop" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Explore Our Collection
        </Link>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2 className="text-2xl font-semibold mb-6">🌟 Featured Picks</h2>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;