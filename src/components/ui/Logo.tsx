import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'light' | 'footer';
  className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const reverseOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // For footer, always use white text
  if (variant === 'footer') {
    return (
      <Link to="/" className={`flex items-center gap-3 ${className}`}>
        <img 
          src="https://images.tsh.edu.in/mobile_logo.png"
          alt="The Scholars' Home"
          className="h-12 w-auto"
        />
        <div className="text-neutral-light">
          <div className="text-xl font-display">The Scholars' Home</div>
          <div className="text-xs">Excellence in Education Since 2003</div>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-12 w-12">
        {/* Light variant (white logo) */}
        <motion.img 
          src="https://images.tsh.edu.in/logo/mobile_logo.png"
          alt="The Scholars' Home"
          className="absolute inset-0 h-full w-auto"
          style={{ 
            opacity: variant === 'light' ? 1 : opacity,
          }}
        />

        {/* Dark variant (orange logo) */}
        <motion.img 
          src="https://images.tsh.edu.in/logo/mobile_logo.png"
          alt="The Scholars' Home"
          className="absolute inset-0 h-full w-auto"
          style={{ 
            opacity: variant === 'light' ? 0 : reverseOpacity,
          }}
        />
      </div>
      <div className="relative">
        {/* Light variant (white text) */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: variant === 'light' ? 1 : opacity }}
        >
          <div className="text-neutral-light">
            <div className="text-xl font-display">The Scholars' Home</div>
            <div className="text-xs">Excellence in Education Since 2003</div>
          </div>
        </motion.div>

        {/* Dark variant (orange text) */}
        <motion.div 
          style={{ opacity: variant === 'light' ? 0 : reverseOpacity }}
        >
          <div className="text-orange">
            <div className="text-xl font-display">The Scholars' Home</div>
            <div className="text-xs">Excellence in Education Since 2003</div>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}