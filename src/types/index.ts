export type Trip = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ApiResponse = {
  products: Trip[];
  total: number;
  skip: number;
  limit: number;
};