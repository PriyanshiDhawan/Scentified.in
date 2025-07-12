// src/pages/Shop.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Eventually pull from Firestore
    setProducts([
      { id: '1', name: 'Dior Sauvage EDP', brand: 'Dior', price: 499, image: '/assets/sauvage.jpg' },
      { id: '2', name: 'Creed Aventus', brand: 'Creed', price: 799, image: '/assets/aventus.jpg' },
      { id: '3', name: 'Tom Ford Oud Wood', brand: 'Tom Ford', price: 899, image: '/assets/oudwood.jpg' }
    ]);
  }, []);

  return (
    <div className="shop">
      <h1>Shop All Decants</h1>
      <div className="product-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Shop;