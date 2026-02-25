import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80";

export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  fallbackSrc = DEFAULT_FALLBACK
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (!error && currentSrc !== fallbackSrc) {
      setError(true);
      setCurrentSrc(fallbackSrc);
      setLoaded(false);
    } else {
      // Even fallback failed, show as loaded anyway
      setLoaded(true);
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Background placeholder while loading */}
      <div className={`absolute inset-0 bg-linear-to-br from-green-light/20 to-green/10 transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`} />
      
      <img
        src={currentSrc}
        alt={alt}
        className={`transition-opacity duration-300 w-full h-full object-cover ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </div>
  );
}