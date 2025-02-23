import React from 'react';
import { useInView, motion, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = React.useRef(null);
  const countRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  // Extract numeric part and suffix
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  React.useEffect(() => {
    if (isInView && !hasAnimated && countRef.current) {
      const node = countRef.current;
      
      // Start from 0
      node.textContent = '0';
      
      // Animate to target value
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing
        onUpdate(value) {
          node.textContent = Math.floor(value).toString();
        },
        onComplete() {
          setHasAnimated(true);
        }
      });

      return () => controls.stop();
    }
  }, [isInView, numericValue, hasAnimated]);

  return (
    <motion.span 
      ref={ref}
      className={`inline-block ${className}`} // Added inline-block for better mobile rendering
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <span ref={countRef} className="tabular-nums">0</span>
      {suffix}
    </motion.span>
  );
}