import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'react-feather';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        <Link to="/">Scentified.in</Link>
      </h2>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium items-center">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/build">Build a Set</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li className="relative">
          <Link to="/cart" className="flex items-center gap-1">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      {/* Mobile Toggle Button */}
      <button onClick={toggleMenu} className="md:hidden text-gray-700 dark:text-gray-200">
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t shadow-md md:hidden z-50">
          <ul className="flex flex-col p-4 gap-4 text-gray-700 dark:text-gray-200 font-medium">
            <li><Link to="/shop" onClick={toggleMenu}>Shop</Link></li>
            <li><Link to="/build" onClick={toggleMenu}>Build a Set</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            <li><Link to="/cart" onClick={toggleMenu}>Cart ({totalItems})</Link></li>
            <li><Link to="/wishlist" onClick={toggleMenu}>Wishlist</Link></li>
            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;