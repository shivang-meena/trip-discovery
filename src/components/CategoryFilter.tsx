import { useState, useEffect } from 'react';
import { fetchCategories } from '../api';

type CategoryFilterProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        // Slicing to 10 just to keep the UI clean, dummyjson has many categories
        setCategories(data.slice(0, 10)); 
      } catch (error) {
        console.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) return null; // Hide silently while loading

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => onSelect('')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === '' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Trips
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                selected === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}