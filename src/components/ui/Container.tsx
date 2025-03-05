import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div 
        ref={ref}
        className={`max-w-[150rem] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
