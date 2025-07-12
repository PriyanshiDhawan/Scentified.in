import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your backend
    fetch("http://localhost:5050/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error("Failed to fetch products:", err);
        // fallback if fetch fails
        setProducts([
          { id: '1', name: 'Dior Sauvage EDP', brand: 'Dior', price_5ml: 499, image: '/assets/sauvage.jpg' },
          { id: '2', name: 'Creed Aventus', brand: 'Creed', price_5ml: 799, image: '/assets/aventus.jpg' },
          { id: '3', name: 'Tom Ford Oud Wood', brand: 'Tom Ford', price_5ml: 899, image: '/assets/oudwood.jpg' }
        ]);
      });
  }, []);

  return (
    <div className="shop p-6">
      <h1 className="text-3xl font-bold mb-4">Shop All Decants</h1>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Shop;