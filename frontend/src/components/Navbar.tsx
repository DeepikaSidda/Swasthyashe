import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo/Home Link */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-600">Swasthyashe</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-purple-700 hover:bg-purple-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/period-health"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50"
          >
            Period Health
          </Link>
          <Link
            to="/mental-wellness"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50"
          >
            Mental Wellness
          </Link>
          <Link
            to="/sexual-health"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50"
          >
            Sexual Health
          </Link>
          <Link
            to="/skin-hair-care"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50"
          >
            Skin & Hair Care
          </Link>
          <Link
            to="/pregnancy-care"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50"
          >
            Pregnancy Care
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;