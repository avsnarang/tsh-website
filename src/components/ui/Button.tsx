import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
  variant?: 'primary' | 'outline' | 'outline2' | 'cta' | 'cta-green' | 'download' | 'edit' | 'delete';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = `
    px-6 py-3
    rounded-full
    font-body font-semibold
    transition-all duration-300
    disabled:opacity-50
    disabled:cursor-not-allowed
    relative
    overflow-hidden
  `;

  const variants = {
    primary: `
      bg-orange text-neutral-light
      hover:bg-orange-dark
      hover:shadow-lg hover:shadow-orange/20
    `,
    outline: `
      bg-white/10 backdrop-blur-sm
      border-2 border-white
      text-white
      hover:bg-white/20
      hover:shadow-lg hover:shadow-white/20
    `,
    outline2: `
      bg-white/10 backdrop-blur-sm
      border-2 border-[#00501b]
      text-[#00501b]
      hover:bg-white/20
      hover:shadow-lg hover:shadow-white/20
    `,
    redOutline: `
      bg-white/10 backdrop-blur-sm
      border-2 border-[#FF0000]
      text-[#FF0000]
      hover:bg-[B53737]
      hover:shadow-lg hover:shadow-[B53737]/20
    `,
    cta: `
      bg-orange text-neutral-light
      group
      ring-2 ring-orange/30
      hover:ring-4 hover:ring-orange/50
      hover:shadow-[0_0_30px_rgba(166,90,32,0.6)]
    `,
    'cta-green': `
      bg-primary text-neutral-light
      group
      ring-2 ring-green/30
      hover:ring-4 hover:ring-green/50
      hover:shadow-[0_0_30px_rgba(0,80,27,0.6)]
    `,
    edit: `
      bg-green text-neutral-light
      hover:bg-green-dark
      hover:shadow-lg hover:shadow-green/20
    `,
    delete: `
      bg-[#FF0000] text-neutral-light
      hover:bg-[#B53737]
      hover:shadow-lg hover:shadow-red/20
    `,
    download: `
      bg-[#A65A20] text-neutral-light
      hover:bg-orange-dark
      hover:shadow-lg hover:shadow-orange/20
    `
  };

  if (variant === 'cta' || variant === 'cta-green') {
    const isGreen = variant === 'cta-green';
    
    return (
      <motion.button 
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={false}
      >
        {/* Static glowing gradient background */}
        <div className={`absolute inset-0 ${
          isGreen 
            ? 'bg-gradient-to-r from-primary via-primary-dark to-primary'
            : 'bg-gradient-to-r from-orange via-orange-dark to-orange'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
          <div className="absolute inset-0 animate-gradient-x" />
        </div>
        
        {/* Continuous pulsing ring effect */}
        <div className={`absolute -inset-1 ${
          isGreen
            ? 'bg-gradient-to-r from-green-light to-primary'
            : 'bg-gradient-to-r from-orange-light to-orange'
        } rounded-full blur opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:blur-xl animate-pulse`} />
        
        {/* Continuous moving shine effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 transform animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Glowing border with continuous animation */}
        <div className={`absolute inset-0 rounded-full border-2 ${
          isGreen ? 'border-green-light' : 'border-orange-light'
        } opacity-20 group-hover:opacity-50 transition-opacity duration-500`}>
          <div className="absolute inset-0 animate-border-glow" />
        </div>

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>

        {/* Additional hover glow effect */}
        <div className={`absolute inset-0 ${
          isGreen
            ? 'bg-gradient-to-r from-green-light/0 via-green-light/30 to-green-light/0'
            : 'bg-gradient-to-r from-orange-light/0 via-orange-light/30 to-orange-light/0'
        } opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
      </motion.button>
    );
  }

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}











