export default function Loading() {
  return (
    <div className="container-content py-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Category Badge Skeleton */}
        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
        
        {/* Title Skeleton */}
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
        
        {/* Meta Info Skeleton */}
        <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Featured Image Skeleton */}
        <div className="mb-8 mt-8">
          <div className="aspect-[16/9] bg-gray-200 rounded"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}