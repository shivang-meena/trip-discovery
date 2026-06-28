import { useState, useEffect } from 'react';
import { fetchTrips, searchTrips, fetchTripsByCategory } from '../api';
import type { Trip } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import TripCard from '../components/TripCard';
import SkeletonCard from '../components/SkeletonCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearch = useDebounce({ value: searchTerm, delay: 500 });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const limit = 20;

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        
        // SCENARIO 1: Both Search AND Category are active
        // The API can't handle both, so we fetch by search and filter in the browser!
        if (debouncedSearch && selectedCategory) {
          data = await searchTrips(debouncedSearch);
          const filteredProducts = data.products.filter(
            (trip: Trip) => trip.category === selectedCategory
          );
          setTrips(filteredProducts);
          setHasMore(false); // Disable pagination when heavily filtering
        } 
        // SCENARIO 2: Only Search is active
        else if (debouncedSearch) {
          data = await searchTrips(debouncedSearch);
          setTrips(data.products);
          setHasMore(false);
        } 
        // SCENARIO 3: Only Category is active
        else if (selectedCategory) {
          data = await fetchTripsByCategory(selectedCategory);
          setTrips(data.products);
          setHasMore(false);
        } 
        // SCENARIO 4: Default (No search, no category, fetch all with pagination)
        else {
          data = await fetchTrips(limit, skip);
          if (skip === 0) {
            setTrips(data.products);
          } else {
            setTrips((prev) => [...prev, ...data.products]);
          }
          setHasMore(data.products.length === limit);
        }
      } catch (err) {
        setError('Failed to load trips. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, [debouncedSearch, selectedCategory, skip]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSkip(0);
    // 🛑 REMOVED: setSelectedCategory('') -> Now the filter stays active!
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSkip(0);
    // 🛑 REMOVED: setSearchTerm('') -> Now the search bar keeps its text!
  };

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar searchTerm={searchTerm} onSearch={handleSearch} />
      <CategoryFilter selected={selectedCategory} onSelect={handleCategorySelect} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="text-red-500 text-center mb-4 font-medium">{error}</div>}
        
        {/* Empty State */}
        {trips.length === 0 && !loading && !error && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            <p className="text-xl font-semibold mb-2">No trips found.</p>
            <p>Try adjusting your search or clearing the category filter.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
          {/* Render 8 Skeleton Cards while loading */}
          {loading && Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

        {/* Load More Button */}
        {!loading && hasMore && !debouncedSearch && !selectedCategory && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md"
            >
              Load More Trips
            </button>
          </div>
        )}
      </main>
    </div>
  );
}