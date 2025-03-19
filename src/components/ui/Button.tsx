import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'cta' | 'cta-green' | 'edit' | 'outline2' | 'redOutline' | 'download' | 'delete';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "relative font-medium transition-all duration-300 px-6 py-3 rounded-full";

  const variants = {
    primary: `
      bg-primary text-primary-foreground 
      hover:bg-primary/90
      shadow-[0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]
    `,
    secondary: `
      bg-secondary text-secondary-foreground 
      hover:bg-secondary/80
      shadow-[0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]
    `,
    outline: `
      border border-input bg-background 
      hover:bg-accent hover:text-accent-foreground
      shadow-[0_2px_4px_rgba(0,0,0,0.05)]
      hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]
    `,
    outline2: `
      border border-input bg-background 
      hover:bg-accent hover:text-accent-foreground
      shadow-[0_2px_4px_rgba(0,0,0,0.05)]
      hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]
    `,
    ghost: `
      hover:bg-accent hover:text-accent-foreground
      shadow-[0_2px_4px_rgba(0,0,0,0.05)]
      hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]
    `,
    link: 'text-primary underline-offset-4 hover:underline',
    cta: `
      text-white
      relative
      overflow-hidden
      bg-gradient-to-r from-orange via-[rgba(166,90,32,0.8)] to-orange
      border border-white/10
      shadow-[0_4px_12px_rgba(166,90,32,0.2)]
      hover:shadow-[0_8px_24px_rgba(166,90,32,0.3)]
      before:absolute before:inset-0
      before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
      before:translate-x-[-100%]
      hover:before:translate-x-[100%]
      before:transition-transform before:duration-1000
      before:ease-out
      after:absolute after:inset-0
      after:bg-gradient-to-r after:from-white/0 after:via-white/10 after:to-white/0
      after:translate-x-[-100%]
      after:animate-[shine_3s_ease-in-out_infinite]
      hover:after:animate-none
      disabled:opacity-70 disabled:cursor-not-allowed
      disabled:hover:shadow-[0_4px_12px_rgba(166,90,32,0.2)]
    `,
    'cta-green': `
      text-white
      relative
      overflow-hidden
      bg-gradient-to-r from-green via-[rgba(0,80,27,0.8)] to-green
      border border-white/10
      shadow-[0_4px_12px_rgba(0,80,27,0.2)]
      hover:shadow-[0_8px_24px_rgba(0,80,27,0.3)]
      before:absolute before:inset-0
      before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
      before:translate-x-[-100%]
      hover:before:translate-x-[100%]
      before:transition-transform before:duration-1000
      before:ease-out
      after:absolute after:inset-0
      after:bg-gradient-to-r after:from-white/0 after:via-white/10 after:to-white/0
      after:translate-x-[-100%]
      after:animate-[shine_3s_ease-in-out_infinite]
      hover:after:animate-none
      disabled:opacity-70 disabled:cursor-not-allowed
      disabled:hover:shadow-[0_4px_12px_rgba(0,80,27,0.2)]
    `,
  };

  if (variant === 'cta' || variant === 'cta-green') {
    return (
      <motion.button 
        type="button"
        className={`${baseStyles} ${variants[variant]} ${className}`}
        onClick={props.onClick}
        disabled={props.disabled}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        initial={false}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-lg tracking-wide">
          {children}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button 
      type="button"
      className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.99,
        transition: { duration: 0.1 }
      }}
      initial={false}
      {...(props as any)} // Type assertion to avoid conflicts between HTML and Framer Motion props
    >
      {children}
    </motion.button>
  );
}
