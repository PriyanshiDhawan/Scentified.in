// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
<h1 className="text-4xl font-bold text-indigo-600">
  Welcome to Scentified.in
</h1>

const Home = () => {
  // Temporary featured products
  const featured = [
    { id: '1', name: 'Dior Sauvage EDP', brand: 'Dior', price: 499, image: '/assets/sauvage.jpg' },
    { id: '2', name: 'Creed Aventus', brand: 'Creed', price: 799, image: '/assets/aventus.jpg' },
    { id: '3', name: 'Tom Ford Oud Wood', brand: 'Tom Ford', price: 899, image: '/assets/oudwood.jpg' }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Scentified.in</h1>
        <p>Your trusted destination for premium, 100% authentic perfume decants</p>
        <Link to="/shop" className="cta">Explore Our Collection</Link>
      </section>

      <section className="featured">
        <h2>Featured Picks</h2>
        <div className="product-grid">
          {featured.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;