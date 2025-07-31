import { useTheme } from '@/contexts/ThemeContext';

// Exercise-specific styles for both themes
export const exerciseStyles = {
  light: {
    // ChatGPT-style light mode
    textCard: 'bg-white border border-gray-200 rounded-xl shadow-sm',
    container: 'bg-white border border-gray-200 rounded-xl shadow-sm',
    resultCard: {
      base: 'bg-white border-2 rounded-xl shadow-sm',
      success: 'border-emerald-200 bg-emerald-50/80',
      error: 'border-red-200 bg-red-50/80'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-500', 
      success: 'text-emerald-700',
      error: 'text-red-700'
    },
    wordButton: {
      base: 'px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full min-w-[60px] border-2',
      unselected: 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300',
      selected: 'bg-gray-900 text-white border-gray-900'
    },
    exitButton: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
  },
  dark: {
    // Keep existing dark mode (user likes it)
    textCard: 'bg-neutral-900/50 border border-neutral-700 rounded-xl',
    container: 'bg-gray-800 border border-gray-700 rounded-xl shadow-lg',
    resultCard: {
      base: 'bg-gray-800 border-2 rounded-xl shadow-lg',
      success: 'border-emerald-800 bg-emerald-950/30',  
      error: 'border-rose-800 bg-rose-950/30'
    },
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      success: 'text-emerald-300',
      error: 'text-rose-300'
    },
    wordButton: {
      base: 'px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full min-w-[60px] border-2',
      unselected: 'bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800 hover:border-gray-600',
      selected: 'bg-white text-black border-white'
    },
    exitButton: 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
  }
};

// Hook to get current theme's exercise styles
export const useExerciseStyles = () => {
  const { theme } = useTheme();
  return exerciseStyles[theme];
};