import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";

// Exercise-specific extensions to the main theme
const exerciseExtensions = {
  light: {
    textCard: "bg-white border border-gray-200 rounded-xl shadow-sm",
    container: "bg-white border border-gray-200 rounded-xl shadow-sm",
    resultCard: {
      base: "bg-white border-2 rounded-xl shadow-sm",
      success: "border-emerald-200 bg-emerald-50/80",
      error: "border-red-200 bg-red-50/80",
    },
    wordButton: {
      base: "px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full min-w-[60px] border-2",
      unselected:
        "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
      selected: "bg-white text-gray-900 border-gray-200",
    },
    exitButton:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200",
  },
  dark: {
    textCard: "bg-neutral-900/50 border border-neutral-700 rounded-xl",
    container: "bg-gray-800 border border-gray-700 rounded-xl shadow-lg",
    resultCard: {
      base: "bg-gray-800 border-2 rounded-xl shadow-lg",
      success: "border-emerald-800 bg-emerald-950/30",
      error: "border-rose-800 bg-rose-950/30",
    },
    wordButton: {
      base: "text-center px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full min-w-[60px] border-2",
      unselected:
        "bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600",
      selected: "bg-neutral-800 text-gray-300 border-neutral-700",
    },
    exitButton:
      "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600",
  },
} as const;

// Hook to get consolidated exercise styles using main theme + exercise extensions
export const useExerciseStyles = () => {
  const { theme } = useTheme();
  const mainTheme = themes[theme];
  const exerciseTheme = exerciseExtensions[theme];

  return {
    // Use main theme for text colors (no duplication)
    text: {
      primary: mainTheme.text.primary,
      secondary: mainTheme.text.secondary,
      success: "text-emerald-700 dark:text-emerald-300",
      error: "text-red-700 dark:text-rose-300",
    },
    // Exercise-specific styles
    ...exerciseTheme,
  };
};
