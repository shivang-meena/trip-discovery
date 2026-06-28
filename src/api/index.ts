import type { ApiResponse, Trip } from '../types/index';

const BASE_URL = 'https://dummyjson.com/products';

// 1. Fetch all trips (used on Home Page with pagination)
export const fetchTrips = async (limit: number = 20, skip: number = 0): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
};

// 2. Search trips by keyword (used with Debounce on Home Page)
export const searchTrips = async (query: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/search?q=${query}`);
  if (!res.ok) throw new Error('Failed to search trips');
  return res.json();
};

// 3. Fetch all available categories (used for the Category Filter)
export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  
  const data = await res.json();
  // DummyJSON's category endpoint can return objects or strings depending on the API version.
  // This ensures we always return a clean array of string slugs for your UI.
  return data.map((category: any) => typeof category === 'string' ? category : category.slug);
};

// 4. Fetch trips by a specific category (used when a user clicks a category pill)
export const fetchTripsByCategory = async (category: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch trips for category: ${category}`);
  return res.json();
};

// 5. Fetch a single trip by ID (used on the Trip Details Page)
export const fetchTripById = async (id: string): Promise<Trip> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch trip details');
  return res.json();
};