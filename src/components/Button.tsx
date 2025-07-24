import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/styles/theme';

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
  const currentTheme = themes[theme];
  
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${currentTheme.button[variant]} ${className}`}
    >
      {children}
    </button>
  );
};