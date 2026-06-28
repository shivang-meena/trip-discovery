export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Rating Skeleton */}
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
        </div>
        
        {/* Category Skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        
        {/* Footer (Price & Button) Skeleton */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}