// src/pages/BuildSet.jsx
import React, { useState } from 'react';

const BuildSet = () => {
  const [selected, setSelected] = useState([]);
  const [sizes, setSizes] = useState({});

  const products = [
    { id: '1', name: 'Dior Sauvage', image: '/assets/sauvage.jpg' },
    { id: '2', name: 'Creed Aventus', image: '/assets/aventus.jpg' },
    { id: '3', name: 'TF Oud Wood', image: '/assets/oudwood.jpg' }
  ];

  const handleSelect = (product) => {
    if (selected.find(p => p.id === product.id)) {
      setSelected(selected.filter(p => p.id !== product.id));
    } else {
      setSelected([...selected, product]);
    }
  };

  const handleSizeChange = (id, size) => {
    setSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleSubmit = () => {
    console.log('Build submitted:', selected, sizes);
    alert('Your custom set has been created! (functionality coming soon)');
  };

  return (
    <div className="build-set">
      <h2>Build Your Discovery Set</h2>
      <p>Select 3-5 fragrances and choose a size for each</p>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className={`product-card ${selected.find(s => s.id === p.id) ? 'selected' : ''}`} onClick={() => handleSelect(p)}>
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            {selected.find(s => s.id === p.id) && (
              <select onChange={e => handleSizeChange(p.id, e.target.value)}>
                <option value="">Choose size</option>
                <option value="2ml">2ml</option>
                <option value="5ml">5ml</option>
                <option value="10ml">10ml</option>
              </select>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={selected.length < 3 || selected.length > 5}>Create Set</button>
    </div>
  );
};

export default BuildSet;