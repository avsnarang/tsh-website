
const NewsTicker = ({ latestUpdate }: { latestUpdate: string }) => {
  return (
    latestUpdate && (
      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm py-3 text-neutral-light border-t border-neutral-light/10 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <span className="font-semibold shrink-0">Latest Updates:</span>
            <div className="relative overflow-hidden w-full">
              <div className="flex whitespace-nowrap animate-marquee">
                {/* Duplicate Content to Ensure Seamless Looping */}
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex">
                    <span className="inline-block px-4">{latestUpdate}</span>
                    <span className="inline-block px-4">{latestUpdate}</span>
                    <span className="inline-block px-4">{latestUpdate}</span>
                    <span className="inline-block px-4">{latestUpdate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NewsTicker;