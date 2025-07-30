import React from 'react';

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
  
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'primary':
        return `
          bg-black hover:bg-gray-700 active:bg-gray-900
          dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-100
          text-white dark:text-black 
          border-0
          focus:outline-none focus:ring-2 focus:ring-gray-400
        `;
      case 'secondary':
        return `
          bg-transparent hover:bg-gray-50 active:bg-gray-100
          dark:hover:bg-gray-800 dark:active:bg-gray-700
          text-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100
          border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-gray-400
        `;
      default:
        return getVariantClasses('primary');
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