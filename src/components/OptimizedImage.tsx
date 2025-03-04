import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${
        loaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      width={width}
      height={height}
      loading="lazy"
      onLoad={() => setLoaded(true)}
    />
  );
}