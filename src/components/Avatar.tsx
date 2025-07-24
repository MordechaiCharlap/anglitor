import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/styles/theme';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  className = '' 
}) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  if (!src) {
    return (
      <div className={`${sizeClasses[size]} ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded-full flex items-center justify-center ${className}`}>
        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
    />
  );
};