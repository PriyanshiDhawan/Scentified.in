import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'react-feather';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">
        <Link to="/">Scentified.in</Link>
      </h2>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/build">Build a Set</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden text-gray-700">
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md md:hidden z-50">
          <ul className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
            <li><Link to="/shop" onClick={toggleMenu}>Shop</Link></li>
            <li><Link to="/build" onClick={toggleMenu}>Build a Set</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            <li><Link to="/cart" onClick={toggleMenu}>Cart</Link></li>
            <li><Link to="/wishlist" onClick={toggleMenu}>Wishlist</Link></li>
            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;