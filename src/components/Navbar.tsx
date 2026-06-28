import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WishlistDrawer from './WishlistDrawer'; // <-- Import added

type NavbarProps = {
  searchTerm?: string;
  onSearch?: (term: string) => void;
};

export default function Navbar({ searchTerm = '', onSearch }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // <-- State added
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Initialize dark mode from local storage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              BuddyInHills
            </span>
          </Link>

          {/* Search Bar - Only show on Home page */}
          {isHomePage && onSearch && (
            <div className="flex-1 max-w-xl hidden sm:block">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg py-2 px-4 transition-colors"
              />
            </div>
          )}

          {/* Right Side: Wishlist & Dark Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Wishlist Button Added Here */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Open Wishlist"
            >
              ❤️
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {isHomePage && onSearch && (
          <div className="pb-3 sm:hidden">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg py-2 px-4 transition-colors"
            />
          </div>
        )}
      </div>
      
      {/* Drawer Component rendered outside the normal flow */}
      <WishlistDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </nav>
  );
}