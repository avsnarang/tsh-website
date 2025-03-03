import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.6, 0.01, -0.05, 0.95],
          delay: delay
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}