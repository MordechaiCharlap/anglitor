"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface StepProps {
  completedLessons: number;
  color: string;
  emoji: string;
  size?: "small" | "normal";
  stepName: string;
  onClick: (event: React.MouseEvent) => void;
  isCompact?: boolean;
}

export function Step({ 
  completedLessons, 
  color, 
  emoji, 
  size = "normal",
  stepName,
  onClick,
  isCompact = false
}: StepProps) {
  const { theme } = useTheme();
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case "rainbow":
        return {
          text: "text-white",
          bg: "bg-gradient-to-b from-pink-400 to-pink-700",
          hover: "hover:from-pink-300 hover:to-pink-600",
          border: "border-pink-700",
          shadow: "shadow-[0_6px_0_0_#be185d,0_8px_20px_rgba(219,39,119,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#be185d,0_6px_25px_rgba(219,39,119,0.4)]"
        };
      case "ocean":
        return {
          text: "text-white",
          bg: "bg-gradient-to-b from-cyan-400 to-cyan-700",
          hover: "hover:from-cyan-300 hover:to-cyan-600",
          border: "border-cyan-700",
          shadow: "shadow-[0_6px_0_0_#0e7490,0_8px_20px_rgba(6,182,212,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#0e7490,0_6px_25px_rgba(6,182,212,0.4)]"
        };
      case "forest":
        return {
          text: "text-white",
          bg: "bg-gradient-to-b from-emerald-400 to-emerald-700",
          hover: "hover:from-emerald-300 hover:to-emerald-600",
          border: "border-emerald-700",
          shadow: "shadow-[0_6px_0_0_#047857,0_8px_20px_rgba(5,150,105,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#047857,0_6px_25px_rgba(5,150,105,0.4)]"
        };
      case "sunset":
        return {
          text: "text-white",
          bg: "bg-gradient-to-b from-orange-400 to-orange-700",
          hover: "hover:from-orange-300 hover:to-orange-600",
          border: "border-orange-700",
          shadow: "shadow-[0_6px_0_0_#c2410c,0_8px_20px_rgba(234,88,12,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#c2410c,0_6px_25px_rgba(234,88,12,0.4)]"
        };
      case "cosmic":
        return {
          text: "text-white",
          bg: "bg-gradient-to-b from-purple-400 to-purple-700",
          hover: "hover:from-purple-300 hover:to-purple-600",
          border: "border-purple-700",
          shadow: "shadow-[0_6px_0_0_#7c3aed,0_8px_20px_rgba(139,69,244,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#7c3aed,0_6px_25px_rgba(139,69,244,0.4)]"
        };
      case "gray":
        return {
          text: "text-gray-600",
          bg: "bg-gradient-to-b from-gray-300 to-gray-500",
          hover: "hover:from-gray-200 hover:to-gray-400",
          border: "border-gray-600",
          shadow: "shadow-[0_4px_0_0_#374151,0_6px_15px_rgba(0,0,0,0.2)]",
          hoverShadow: "hover:shadow-[0_2px_0_0_#374151,0_4px_20px_rgba(0,0,0,0.3)]"
        };
      default:
        return {
          text: "text-gray-600",
          bg: "bg-gradient-to-b from-gray-300 to-gray-500",
          hover: "hover:from-gray-200 hover:to-gray-400",
          border: "border-gray-600",
          shadow: "shadow-[0_4px_0_0_#374151,0_6px_15px_rgba(0,0,0,0.2)]",
          hoverShadow: "hover:shadow-[0_2px_0_0_#374151,0_4px_20px_rgba(0,0,0,0.3)]"
        };
    }
  };

  const colorClasses = getColorClasses(color);
  const progress = (completedLessons / 4) * 100;
  const isCompleted = completedLessons === 4;
  const circleSize = size === "small" ? "w-16 h-16" : "w-20 h-20";
  const emojiSize = size === "small" ? "text-lg" : "text-xl";
  const progressRadius = size === "small" ? "32" : "40";
  const progressCircumference = size === "small" ? "201" : "251";
  
  return (
    <div 
      className={`relative ${circleSize} mx-auto cursor-pointer transition-all duration-150 ease-out transform hover:translate-y-1 active:translate-y-2`}
      onClick={onClick}
    >
      {/* Main circle with 3D effect */}
      <div className={`relative ${circleSize} rounded-full border-2 ${colorClasses.border} ${colorClasses.bg} ${colorClasses.hover} ${colorClasses.shadow} ${colorClasses.hoverShadow} flex items-center justify-center transition-all duration-150 ease-out active:shadow-[0_2px_0_0_${colorClasses.border.replace('border-', '#')},0_4px_15px_rgba(0,0,0,0.2)]`}>
        
        {/* Progress ring */}
        {!isCompleted && progress > 0 && (
          <svg className={`absolute inset-0 ${circleSize} transform -rotate-90`} viewBox={`0 0 ${size === "small" ? "64" : "80"} ${size === "small" ? "64" : "80"}`}>
            <circle
              cx={size === "small" ? "32" : "40"}
              cy={size === "small" ? "32" : "40"}
              r={progressRadius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progress * (parseFloat(progressCircumference) / 100)} ${progressCircumference}`}
              className={colorClasses.text}
              strokeLinecap="round"
            />
          </svg>
        )}
        
        {/* Center content */}
        <div className="text-center z-10">
          {isCompleted ? (
            <div className={`${size === "small" ? "text-xl" : "text-2xl"} animate-bounce text-yellow-300`}>⭐</div>
          ) : (
            <div>
              <div className={`${emojiSize} mb-1`}>{emoji}</div>
              {!isCompact && (
                <div className={`text-xs font-bold ${colorClasses.text}`}>
                  {completedLessons}/4
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Sparkle effects for completed lessons */}
      {isCompleted && (
        <>
          <div className="absolute -top-1 -right-1 text-yellow-400 animate-pulse text-sm">✨</div>
          <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-pulse delay-300 text-sm">✨</div>
        </>
      )}
    </div>
  );
}