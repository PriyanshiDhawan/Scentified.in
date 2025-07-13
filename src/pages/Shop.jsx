import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
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
          image: item.image || "/assets/default.jpg"
        }));
        setProducts(formatted);
        setFiltered(formatted);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        const fallback = [
          {
            id: '1',
            name: 'Dior Sauvage EDP',
            price_5ml: 499,
            image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.48100.2x.avif'
          },
          {
            id: '2',
            name: 'Creed Aventus',
            price_5ml: 799,
            image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.9828.2x.avif'
          },
          {
            id: '3',
            name: 'Tom Ford Oud Wood',
            price_5ml: 899,
            image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.1826.2x.avif'
          }
        ];
        setProducts(fallback);
        setFiltered(fallback);
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

    if (sortOrder === 'asc') {
      temp.sort((a, b) => a.price_5ml - b.price_5ml);
    } else if (sortOrder === 'desc') {
      temp.sort((a, b) => b.price_5ml - a.price_5ml);
    }

    setFiltered(temp);
  }, [search, maxPrice, sortOrder, products]);

  return (
    <div className="shop p-6">
      <h1 className="text-3xl font-bold mb-4">Shop All Decants</h1>

      {/* Filters */}
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

      {/* Product Grid */}
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