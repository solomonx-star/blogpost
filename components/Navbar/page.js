'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/Home' },
    { name: 'Posts', href: '/BlogPost' },
    { name: 'About Us', href: '/About-us' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (href) => {
    return router.pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300"
          >
            BlogSite
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`
                    relative px-6 py-3 text-white font-medium text-lg rounded-full
                    transition-all duration-200 hover:scale-105 

                    ${pathname === item.href ? 'bg-white/25 backdrop-blur-sm' : 'hover:bg-blue-600/30 hover:backdrop-blur-sm'}
                  `}
                >
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          >
            <span 
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}
        `}>
          <ul className="flex flex-col space-y-2 pt-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-6 py-3 text-white font-medium text-lg rounded-lg
                    transition-all duration-200 hover:bg-white/20
                    ${pathname === item.href ? 'bg-white/25 backdrop-blur-sm' : 'hover:bg-blue-600/30 hover:backdrop-blur-sm'}
                  `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;