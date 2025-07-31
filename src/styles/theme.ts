export const themes = {
  light: {
    background: 'bg-white',
    cardBackground: 'bg-white',
    chatBackground: 'bg-gray-50',
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-500',
      muted: 'text-gray-400',
    },
    border: 'border-gray-200',
    divider: 'border-gray-100',
    hover: 'hover:bg-gray-50',
    input: {
      background: 'bg-white',
      border: 'border-gray-200',
      focus: 'focus:border-emerald-500',
      text: 'text-gray-900',
      placeholder: 'placeholder-gray-400',
    },
    button: {
      primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200',
    },
    accent: 'text-emerald-600',
    badge: 'bg-gray-100',
  },
  dark: {
    background: 'bg-gray-900',
    cardBackground: 'bg-gray-800',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      muted: 'text-gray-400',
    },
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
    input: {
      background: 'bg-gray-800',
      border: 'border-gray-600',
      focus: 'focus:border-blue-500',
      text: 'text-white',
      placeholder: 'placeholder-gray-400',
    },
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600',
    },
  },
} as const;

export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  success: {
    500: '#10b981',
    600: '#059669',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
} as const;

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

export const borderRadius = {
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
} as const;

export const typography = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-semibold',
  h3: 'text-xl font-medium',
  body: 'text-base',
  small: 'text-sm',
  caption: 'text-xs',
} as const;