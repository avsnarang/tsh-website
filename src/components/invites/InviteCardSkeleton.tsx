import { motion } from 'framer-motion';

export default function InviteCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-neutral-200 animate-pulse" />
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-8 bg-neutral-200 rounded-lg animate-pulse w-3/4" />
        
        {/* Date and location skeletons */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-2/3" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-5/6" />
        </div>
        
        {/* Button skeleton */}
        <div className="h-12 bg-neutral-200 rounded-xl animate-pulse mt-6" />
      </div>
    </div>
  );
}