import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTripById } from '../api';
import type{ Trip } from '../types';

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrip = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchTripById(id);
        setTrip(data);
      } catch (err) {
        setError('Failed to load trip details.');
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [id]);

  // Bonus Feature: Native Share API
  const handleShare = async () => {
    if (navigator.share && trip) {
      try {
        await navigator.share({
          title: trip.title,
          text: `Check out this trip to ${trip.title}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('User canceled share or share failed');
      }
    } else {
      alert('Your browser does not support the Web Share API.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-xl font-medium text-gray-500 dark:text-gray-400">
          Loading trip details...
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 text-xl mb-4 font-medium">{error}</div>
        <button 
          onClick={() => navigate('/')} 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Go back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        
        <button 
          onClick={() => navigate(-1)} 
          className="m-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-2 transition-colors"
        >
          ← Back
        </button>
        
        <img 
          src={trip.images[0] || trip.thumbnail} 
          alt={trip.title} 
          className="w-full h-64 sm:h-96 object-cover"
        />
        
        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{trip.title}</h1>
              <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-full capitalize">
                {trip.category}
              </span>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">${trip.price}</div>
              <div className="text-yellow-500 font-semibold text-lg mt-1">★ {trip.rating}</div>
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8 text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">About this trip</h2>
            <p className="text-lg leading-relaxed">{trip.description}</p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Book Now
            </button>
            <button 
              onClick={handleShare}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}