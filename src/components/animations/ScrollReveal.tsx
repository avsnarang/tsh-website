import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}: ScrollRevealProps) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: "200px 0px 0px 0px"
  });

  // Start visible with a small transform offset - no opacity animation
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 20, opacity: 1 };
      case 'down':
        return { y: -20, opacity: 1 };
      case 'left':
        return { x: 20, opacity: 1 };
      case 'right':
        return { x: -20, opacity: 1 };
      default:
        return { y: 20, opacity: 1 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getFinalPosition());
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={controls}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
      style={{
        pointerEvents: 'auto',
        zIndex: 'auto',
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
}
