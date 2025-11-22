"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/userContext";
import { logoutUser } from "@/api/auth";
import Link from "next/link";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { authState, user, logout } = useAuth();
  const pathname = usePathname();
  // const pathname = '/Home'; // Simulated for demo

const navItems = useMemo(() => {
    const items = [
      { name: "Home", href: "/Home" },
      { name: "About Us", href: "/About-us" },
    ];

    if (authState.isAuthenticated) {
      items.splice(1, 0, { name: "Posts", href: "/BlogPost" });
    }

    return items;
  }, [authState.isAuthenticated]);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (response.statusCode === 200) {
        logout();
      }
    } catch (error) {
       console.error("Logout failed:", error);
       // TODO: Show user-facing error notification
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >
              BlogSite
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 font-medium text-sm transition-all duration-200 rounded-lg group ${
                  pathname === item.href
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                }`}
              >

                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></span>
                )}
                <span className="absolute inset-0 rounded-lg bg-red-50 dark:bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          {!authState.isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}

          {authState.isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Hello, {authState.user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-md"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`relative block px-4 py-3 font-medium text-sm rounded-lg transition-all duration-200 overflow-hidden ${
                pathname === item.href
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
              }`}
            >
              {pathname === item.href && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600"></span>
              )}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
         {!authState.isAuthenticated && (
           <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/signin"
              className="block px-4 py-3 text-center font-medium text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-3 text-center font-medium text-sm text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
            >
              Get Started
            </Link>
          </div>
         )}

         {authState.isAuthenticated && (
           <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
             <span className="block px-4 py-3 text-center font-medium text-sm text-gray-700 dark:text-gray-300">
               Hello, {authState.user?.username || "User"}
             </span>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-center font-medium text-sm text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
              >
                Logout
              </button>
        </div>
         )}
      </div>
      </div>
    </nav>
  );
};


