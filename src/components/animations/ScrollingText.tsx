import React from 'react';
import { motion } from 'framer-motion';

interface ScrollingTextProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function ScrollingText({ 
  text, 
  direction = 'left', 
  speed = 20,
  className = ''
}: ScrollingTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [text]);

  const distance = width;
  const duration = distance / speed;

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div className="relative">
        <motion.div
          animate={{
            x: direction === 'left' ? [-width/2, -width * 1.5] : [width/2, width * 1.5]
          }}
          initial={{
            x: direction === 'left' ? 0 : -width
          }}
          transition={{
            repeat: Infinity,
            duration,
            ease: "linear",
            repeatType: "loop"
          }}
          className="inline-flex whitespace-nowrap"
        >
          <span className="inline-block px-4">{text}</span>
          <span className="inline-block px-4">{text}</span>
          <span className="inline-block px-4">{text}</span>
        </motion.div>
      </div>
    </div>
  );
}