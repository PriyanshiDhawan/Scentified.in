// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  // TODO: Fetch product from Firestore using id
  return (
    <div className="product-detail">
      <h2>Product ID: {id}</h2>
      <p>This is a placeholder. We'll render full details here from Firestore.</p>
    </div>
  );
};

export default ProductDetail;