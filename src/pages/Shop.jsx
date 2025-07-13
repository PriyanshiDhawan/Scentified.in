// src/pages/Shop.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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
          category: item.category || "Uncategorized",
          image: item.image || "/assets/default.jpg"
        }));

        const uniqueCategories = [...new Set(formatted.map(p => p.category))];

        setProducts(formatted);
        setFiltered(formatted);
        setCategories(uniqueCategories);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
        setFiltered([]);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (search.trim()) {
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (maxPrice) {
      temp = temp.filter(p => p.price_5ml <= parseInt(maxPrice));
    }

    if (selectedCategories.length > 0) {
      temp = temp.filter(p => selectedCategories.includes(p.category));
    }

    if (sortOrder === 'asc') {
      temp.sort((a, b) => a.price_5ml - b.price_5ml);
    } else if (sortOrder === 'desc') {
      temp.sort((a, b) => b.price_5ml - a.price_5ml);
    }

    setFiltered(temp);
  }, [search, maxPrice, sortOrder, selectedCategories, products]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="shop p-6">
      <h1 className="text-3xl font-bold mb-4">Shop All Decants</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search perfumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4"
        >
          <option value="">Filter by price</option>
          <option value="500">Below ₹500</option>
          <option value="700">Below ₹700</option>
          <option value="1000">Below ₹1000</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4"
        >
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* 🏷️ Category Filters */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Category:</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-indigo-600"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 🧴 Products */}
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="text-gray-500">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;