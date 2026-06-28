import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTripById } from '../api';
import type { Trip } from '../types';

type WishlistDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const [wishlistTrips, setWishlistTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadWishlistItems = async () => {
      if (!isOpen) return; // Only fetch when the drawer opens
      
      setLoading(true);
      try {
        const savedIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        // Fetch all saved trips concurrently using the IDs
        const tripsData = await Promise.all(
          savedIds.map((id: number) => fetchTripById(id.toString()))
        );
        
        setWishlistTrips(tripsData);
      } catch (error) {
        console.error('Failed to load wishlist items');
      } finally {
        setLoading(false);
      }
    };

    loadWishlistItems();
  }, [isOpen]);

  const handleRemove = (id: number) => {
    // Remove from local storage
    const savedIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedIds = savedIds.filter((savedId: number) => savedId !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedIds));
    
    // Remove from UI state
    setWishlistTrips(wishlistTrips.filter(trip => trip.id !== id));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  // If drawer is closed, don't render anything
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 shadow-xl overflow-y-auto transform transition-transform duration-300 flex flex-col">
        
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Wishlist</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 font-bold text-xl p-2"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex-grow">
          {loading ? (
            <div className="text-center text-gray-500 mt-10 animate-pulse">Loading favorites...</div>
          ) : wishlistTrips.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-4xl mb-4">🏜️</p>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Row Layout for Wishlist Items */}
              {wishlistTrips.map((trip) => (
                <div key={trip.id} className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 relative group">
                  
                  <img 
                    src={trip.thumbnail} 
                    alt={trip.title} 
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  
                  <div className="flex flex-col flex-grow justify-center pr-8">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{trip.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{trip.category}</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400 mt-1">${trip.price}</p>
                    
                    <Link 
                      to={`/trip/${trip.id}`} 
                      onClick={onClose}
                      className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(trip.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2"
                    title="Remove from wishlist"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}