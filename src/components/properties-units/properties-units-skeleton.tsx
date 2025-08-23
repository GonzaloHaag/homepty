import { Skeleton } from "../ui/skeleton";

export const PropertiesUnitsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Image Skeleton */}
          <div className="relative h-48 overflow-hidden">
            <Skeleton className="w-full h-full animate-pulse" />

            {/* Price Badge Skeleton */}
            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm">
              <Skeleton className="h-4 w-16 animate-pulse" />
            </div>

            {/* Heart Button Skeleton */}
            <div className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm">
              <Skeleton className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-4">
            {/* Title Skeleton */}
            <Skeleton className="h-5 w-full mb-2 animate-pulse" />

            {/* Location Skeleton */}
            <div className="flex items-center mb-4">
              <Skeleton className="w-4 h-4 mr-1 animate-pulse" />
              <Skeleton className="h-4 w-32 animate-pulse" />
            </div>

            {/* Property Details Skeleton */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 animate-pulse" />
                <Skeleton className="h-4 w-12 animate-pulse" />
              </div>
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 animate-pulse" />
                <Skeleton className="h-4 w-14 animate-pulse" />
              </div>
            </div>

            {/* Areas Skeleton */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 animate-pulse" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-8 animate-pulse" />
                  <Skeleton className="h-3 w-16 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2 animate-pulse" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-10 animate-pulse" />
                  <Skeleton className="h-3 w-12 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
