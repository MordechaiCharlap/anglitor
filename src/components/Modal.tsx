'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/styles/theme';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative ${currentTheme.cardBackground} ${currentTheme.border} border rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200`}>
        {children}
      </div>
    </div>
  );
}