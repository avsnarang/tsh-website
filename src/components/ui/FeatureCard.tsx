import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  className?: string;
  colorVariant?: 'primary' | 'primary-alt';
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  highlight, 
  className = '',
  colorVariant = 'primary'
}: FeatureCardProps) {
  const colorClasses = {
    'primary': {
      icon: 'text-green',
      badge: 'bg-green-light/20 text-green',
    },
    'primary-alt': {
      icon: 'text-orange',
      badge: 'bg-orange-light/20 text-orange',
    }
  };

  return (
    <div className={`
      group
      relative
      bg-neutral-light 
      p-6 
      rounded-2xl 
      shadow-md 
      hover:shadow-xl
      transition-all 
      duration-300
      ${className}
    `}>
      {/* Icon Container */}
      <div className={`mb-4 transform transition-transform duration-300 group-hover:scale-110 ${colorClasses[colorVariant].icon} shrink-0`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl mb-2 text-neutral-dark line-clamp-2">{title}</h3>
      <p className={`font-body mb-4 line-clamp-3 ${colorClasses[colorVariant].icon}`}>{description}</p>

      {/* Highlight Badge */}
      <div className={`
        inline-block
        px-3 
        py-1 
        text-sm 
        font-semibold 
        rounded-full
        truncate
        max-w-full
        ${colorClasses[colorVariant].badge}
      `}>
        {highlight}
      </div>
    </div>
  );
}