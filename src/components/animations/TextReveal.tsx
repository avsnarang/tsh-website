import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function TextReveal({ 
  children, 
  delay = 0, 
  duration = 0.4,
  className = ''
}: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`} style={{ pointerEvents: 'auto' }}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ 
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{ pointerEvents: 'auto' }}
      >
        {children}
      </motion.div>
    </div>
  );
}