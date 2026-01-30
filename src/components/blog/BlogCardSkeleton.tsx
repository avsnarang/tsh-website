'use client';

import { motion } from 'framer-motion';

interface BlogCardSkeletonProps {
  featured?: boolean;
}

export default function BlogCardSkeleton({ featured = false }: BlogCardSkeletonProps) {
  if (featured) {
    return (
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl animate-pulse">
        <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange/30 rounded-2xl" />
        <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green/30 rounded-2xl" />

        <div className="relative grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full min-h-[300px] bg-neutral-dark/10" />
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 w-24 bg-neutral-dark/10 rounded" />
              <div className="h-4 w-20 bg-neutral-dark/10 rounded" />
            </div>
            <div className="h-8 w-3/4 bg-neutral-dark/10 rounded mb-2" />
            <div className="h-8 w-1/2 bg-neutral-dark/10 rounded mb-4" />
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-neutral-dark/10 rounded" />
              <div className="h-4 w-full bg-neutral-dark/10 rounded" />
              <div className="h-4 w-2/3 bg-neutral-dark/10 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 bg-neutral-dark/10 rounded" />
              <div className="h-4 w-24 bg-neutral-dark/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl h-full animate-pulse">
      <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange/30 rounded-2xl" />
      <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green/30 rounded-2xl" />

      <div className="relative">
        <div className="h-48 bg-neutral-dark/10" />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-4 w-20 bg-neutral-dark/10 rounded" />
            <div className="h-4 w-16 bg-neutral-dark/10 rounded" />
          </div>
          <div className="h-6 w-3/4 bg-neutral-dark/10 rounded mb-2" />
          <div className="h-6 w-1/2 bg-neutral-dark/10 rounded mb-3" />
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-neutral-dark/10 rounded" />
            <div className="h-4 w-2/3 bg-neutral-dark/10 rounded" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-dark/10">
            <div className="h-4 w-24 bg-neutral-dark/10 rounded" />
            <div className="h-4 w-16 bg-neutral-dark/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
