import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Trip } from '../types';

type TripCardProps = {
  trip: Trip;
};

export default function TripCard({ trip }: TripCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Check if this trip is already in the wishlist on load
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsFavorite(savedWishlist.includes(trip.id));
  }, [trip.id]);

  // Handle adding/removing from local storage
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating to the details page if they click the heart
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isFavorite) {
      const updated = savedWishlist.filter((id: number) => id !== trip.id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
    } else {
      savedWishlist.push(trip.id);
      localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
    }
    
    setIsFavorite(!isFavorite);
    // Dispatch a custom event so the Navbar or Drawer knows to update
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col relative">
      
      {/* Favorite / Wishlist Button */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
        aria-label="Toggle Wishlist"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <img 
        src={trip.thumbnail} 
        alt={trip.title} 
        loading="lazy" 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 pr-2">
            {trip.title}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 flex-shrink-0">
            ★ {trip.rating}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2">{trip.category}</p>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4 flex-grow">
          {trip.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${trip.price}</span>
          <Link 
            to={`/trip/${trip.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}