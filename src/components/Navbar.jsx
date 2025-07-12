import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">
        <Link to="/">Scentified.in</Link>
      </h2>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/build">Build a Set</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;