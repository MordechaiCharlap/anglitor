import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/styles/theme';

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

export const Screen: React.FC<ScreenProps> = ({ children, className = '' }) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${className}`}>
      {children}
    </div>
  );
};