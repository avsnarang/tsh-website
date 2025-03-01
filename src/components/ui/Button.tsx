import React from 'react';
import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
  variant?: 'primary' | 'outline' | 'outline2' | 'cta' | 'cta-green' | 'download' | 'edit' | 'delete';
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  href,
  ...props 
}: ButtonProps) {
  const baseStyles = `
    px-6 py-3 overflow-hidden
    rounded-full
    font-body font-semibold
    transition-all duration-300
    disabled:opacity-50
    disabled:cursor-not-allowed
    relative
    ${className}
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
      relative overflow-hidden
    `,
    'cta-green': `
      bg-primary text-neutral-light
      group
      ring-2 ring-green/30
      hover:ring-4 hover:ring-green/50
      hover:shadow-[0_0_30px_rgba(0,80,27,0.6)]
      relative overflow-hidden
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

  const buttonStyles = `${baseStyles} ${variants[variant]}`;

  const ButtonContent = ({ children }: { children: React.ReactNode }) => (
    <>
      {/* Reflection effect for CTA buttons */}
      {(variant === 'cta' || variant === 'cta-green') && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 translate-x-[-100%] animate-continuous-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div style={{ display: 'contents' }}>
          <Link
            to={href}
            className={buttonStyles}
          >
            <ButtonContent>{children}</ButtonContent>
          </Link>
        </div>
      </motion.button>
    );
  }

  // Otherwise render as button
  return (
    <motion.button 
      className={buttonStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <ButtonContent>{children}</ButtonContent>
    </motion.button>
  );
}











