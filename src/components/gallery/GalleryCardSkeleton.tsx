export default function GalleryCardSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
      {/* Decorative borders */}
      <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
      <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
      
      {/* Content */}
      <div className="relative">
        {/* Image skeleton */}
        <div className="h-64 bg-neutral-200 animate-pulse" />

        <div className="p-8">
          {/* Tags skeleton */}
          <div className="flex items-center gap-4 mb-3">
            <div className="h-6 w-24 bg-neutral-200 animate-pulse rounded-full" />
            <div className="h-6 w-32 bg-neutral-200 animate-pulse rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="h-8 bg-neutral-200 animate-pulse rounded-lg w-3/4 mb-3" />
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-neutral-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-neutral-200 animate-pulse rounded w-5/6" />
          </div>

          {/* Button skeleton */}
          <div className="h-12 bg-neutral-200 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
}