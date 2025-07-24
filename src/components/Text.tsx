import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes, typography } from '@/styles/theme';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'body', 
  color = 'primary',
  className = '' 
}) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  
  const getTextColor = () => {
    if (variant === 'h1' || variant === 'h2' || variant === 'h3') {
      return currentTheme.text.primary;
    }
    return currentTheme.text[color];
  };

  const Tag = variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' : 'p';

  return (
    <Tag className={`${typography[variant]} ${getTextColor()} ${className}`}>
      {children}
    </Tag>
  );
};