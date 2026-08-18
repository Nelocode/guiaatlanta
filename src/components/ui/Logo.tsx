'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightMap = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`inline-flex items-center select-none cursor-pointer ${heightMap[size]} ${className}`}>
      <img
        src="/logo.jpg"
        alt="La Guía Atlanta"
        className="h-full w-auto object-contain mix-blend-multiply"
      />
    </div>
  );
};
