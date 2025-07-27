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
          bg-gradient-to-b from-blue-400 to-blue-700
          hover:from-blue-300 hover:to-blue-600
          text-white font-bold
          shadow-[0_6px_0_0_#1e40af,0_8px_20px_rgba(0,0,0,0.3)]
          hover:shadow-[0_4px_0_0_#1e40af,0_6px_25px_rgba(0,0,0,0.4)]
          transform hover:translate-y-1
          active:translate-y-2 active:shadow-[0_2px_0_0_#1e40af,0_4px_15px_rgba(0,0,0,0.2)]
        `;
      case 'secondary':
        return `
          bg-gradient-to-b from-gray-300 to-gray-500
          hover:from-gray-200 hover:to-gray-400
          text-gray-800 font-bold
          shadow-[0_4px_0_0_#374151,0_6px_15px_rgba(0,0,0,0.2)]
          hover:shadow-[0_2px_0_0_#374151,0_4px_20px_rgba(0,0,0,0.3)]
          transform hover:translate-y-1
          active:translate-y-2 active:shadow-[0_1px_0_0_#374151,0_2px_10px_rgba(0,0,0,0.1)]
        `;
      default:
        return getVariantClasses('primary');
    }
  };

  const baseClasses = `
    py-4 px-8 rounded-xl
    transition-all duration-150 ease-out
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none disabled:shadow-none
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