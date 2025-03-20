export default function SportCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200" />
      
      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Title placeholder */}
          <div className="h-6 w-32 bg-gray-200 rounded" />
          {/* Icon placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>

        <div className="space-y-3 mb-4">
          {/* Info lines placeholders */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Link placeholder */}
        <div className="pt-4 border-t border-neutral-dark/10">
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}