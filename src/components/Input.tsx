import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/styles/theme';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = ''
}) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-3 ${currentTheme.input.background} ${currentTheme.input.border} border rounded-lg ${currentTheme.input.text} ${currentTheme.input.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${className}`}
    />
  );
};