"use client";

import { Card, Text } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

interface LetterCardProps {
  letter?: string;
  combo?: string;
  progress: number;
  onClick: () => void;
  isDesktop?: boolean;
}

export function LetterCard({ letter, combo, progress, onClick, isDesktop = false }: LetterCardProps) {
  const { theme } = useTheme();

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    if (progress >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getProgressTextColor = (progress: number) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 60) return "text-yellow-400";
    if (progress >= 40) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 aspect-square flex items-center justify-center">
        <div className="w-full px-1">
          {/* Letter/Combo Display */}
          <div className="flex flex-row justify-center gap-0.5 mb-1">
            {letter ? (
              <>
                <Text 
                  variant="h2" 
                  className={isDesktop ? "text-3xl lg:text-4xl font-bold" : "text-2xl sm:text-3xl md:text-4xl font-bold"}
                >
                  {letter}
                </Text>
                <Text 
                  variant="h2" 
                  className={isDesktop ? "text-3xl lg:text-4xl font-bold" : "text-2xl sm:text-3xl md:text-4xl font-bold"}
                >
                  {letter.toLowerCase()}
                </Text>
              </>
            ) : (
              <Text 
                variant="h2" 
                className={isDesktop ? "text-3xl lg:text-4xl font-bold" : "text-2xl sm:text-3xl md:text-4xl font-bold"}
              >
                {combo}
              </Text>
            )}
          </div>

          {/* Progress Bar */}
          <div
            className={`w-full ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            } rounded-full h-1 mb-1`}
          >
            <div
              className={`${getProgressColor(
                progress
              )} h-1 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress Percentage */}
          <Text
            variant="caption"
            className={`text-xs ${getProgressTextColor(progress)}`}
          >
            {progress}%
          </Text>
        </div>
      </Card>
    </div>
  );
}