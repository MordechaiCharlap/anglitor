import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '' 
}) => {
  const { theme } = useTheme();
  
  const getVariantClasses = (variant: string) => {
    if (theme === 'light') {
      switch (variant) {
        case 'primary':
          return `
            bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800
            text-white 
            border-0
            focus:outline-none focus:ring-2 focus:ring-emerald-300
          `;
        case 'secondary':
          return `
            bg-gray-100 hover:bg-gray-200 active:bg-gray-300
            text-gray-900
            border border-gray-200 hover:border-gray-300
            focus:outline-none focus:ring-2 focus:ring-gray-300
          `;
        default:
          return getVariantClasses('primary');
      }
    } else {
      // Keep existing dark mode styling
      switch (variant) {
        case 'primary':
          return `
            bg-white hover:bg-gray-200 active:bg-gray-100
            text-black 
            border-0
            focus:outline-none focus:ring-2 focus:ring-gray-400
          `;
        case 'secondary':
          return `
            bg-gray-700 hover:bg-gray-600 active:bg-gray-500
            text-white
            border border-gray-600 hover:border-gray-500
            focus:outline-none focus:ring-2 focus:ring-gray-400
          `;
        default:
          return getVariantClasses('primary');
      }
    }
  };

  const baseClasses = `
    px-4 py-2.5 rounded-lg
    transition-colors duration-150
    cursor-pointer font-medium text-sm
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses(variant)} ${className}`}
    >
      {children}
    </button>
  );
};