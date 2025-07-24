import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <div className={`${currentTheme.cardBackground} ${currentTheme.border} border rounded-lg p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
};