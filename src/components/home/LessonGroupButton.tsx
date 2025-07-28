"use client";

interface LessonGroupButtonProps {
  isAvailable: boolean;
  color?: "green" | "blue" | "purple" | "orange" | "cyan";
  onClick: (event: React.MouseEvent) => void;
  size?: "normal" | "large";
}

export function LessonGroupButton({ 
  isAvailable, 
  color = "green",
  onClick,
  size = "normal"
}: LessonGroupButtonProps) {
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-gradient-to-b from-green-400 to-green-600",
          hover: "hover:from-green-300 hover:to-green-500",
          shadow: "shadow-[0_6px_0_0_#166534,0_8px_20px_rgba(34,197,94,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#166534,0_6px_25px_rgba(34,197,94,0.4)]",
          activeShadow: "active:shadow-[0_2px_0_0_#166534,0_4px_15px_rgba(34,197,94,0.2)]",
          border: "border-green-700"
        };
      case "blue":
        return {
          bg: "bg-gradient-to-b from-blue-400 to-blue-600",
          hover: "hover:from-blue-300 hover:to-blue-500",
          shadow: "shadow-[0_6px_0_0_#1e40af,0_8px_20px_rgba(59,130,246,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#1e40af,0_6px_25px_rgba(59,130,246,0.4)]",
          activeShadow: "active:shadow-[0_2px_0_0_#1e40af,0_4px_15px_rgba(59,130,246,0.2)]",
          border: "border-blue-700"
        };
      case "purple":
        return {
          bg: "bg-gradient-to-b from-purple-400 to-purple-600",
          hover: "hover:from-purple-300 hover:to-purple-500",
          shadow: "shadow-[0_6px_0_0_#7c3aed,0_8px_20px_rgba(139,69,244,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#7c3aed,0_6px_25px_rgba(139,69,244,0.4)]",
          activeShadow: "active:shadow-[0_2px_0_0_#7c3aed,0_4px_15px_rgba(139,69,244,0.2)]",
          border: "border-purple-700"
        };
      case "orange":
        return {
          bg: "bg-gradient-to-b from-orange-400 to-orange-600",
          hover: "hover:from-orange-300 hover:to-orange-500",
          shadow: "shadow-[0_6px_0_0_#c2410c,0_8px_20px_rgba(234,88,12,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#c2410c,0_6px_25px_rgba(234,88,12,0.4)]",
          activeShadow: "active:shadow-[0_2px_0_0_#c2410c,0_4px_15px_rgba(234,88,12,0.2)]",
          border: "border-orange-700"
        };
      case "cyan":
        return {
          bg: "bg-gradient-to-b from-cyan-400 to-cyan-600",
          hover: "hover:from-cyan-300 hover:to-cyan-500",
          shadow: "shadow-[0_6px_0_0_#0e7490,0_8px_20px_rgba(6,182,212,0.3)]",
          hoverShadow: "hover:shadow-[0_4px_0_0_#0e7490,0_6px_25px_rgba(6,182,212,0.4)]",
          activeShadow: "active:shadow-[0_2px_0_0_#0e7490,0_4px_15px_rgba(6,182,212,0.2)]",
          border: "border-cyan-700"
        };
      default:
        return getColorClasses("green");
    }
  };

  const grayClasses = {
    bg: "bg-gradient-to-b from-gray-300 to-gray-500",
    hover: "hover:from-gray-200 hover:to-gray-400",
    shadow: "shadow-[0_4px_0_0_#374151,0_6px_15px_rgba(0,0,0,0.2)]",
    hoverShadow: "hover:shadow-[0_2px_0_0_#374151,0_4px_20px_rgba(0,0,0,0.3)]",
    activeShadow: "active:shadow-[0_1px_0_0_#374151,0_2px_10px_rgba(0,0,0,0.1)]",
    border: "border-gray-600"
  };

  const colorClasses = isAvailable ? getColorClasses(color) : grayClasses;
  const buttonSize = size === "large" ? "w-28 h-28" : "w-24 h-24";
  const iconSize = size === "large" ? "w-14 h-14" : "w-12 h-12";
  const lockIconSize = size === "large" ? "w-12 h-12" : "w-10 h-10";

  return (
    <button
      className={`
        ${buttonSize} rounded-full
        ${colorClasses.bg}
        ${colorClasses.hover}
        ${colorClasses.shadow}
        ${colorClasses.hoverShadow}
        ${colorClasses.activeShadow}
        transform hover:translate-y-1
        transition-all duration-150 ease-out
        active:translate-y-2
        border-2 ${colorClasses.border}
        flex items-center justify-center
        cursor-pointer
      `}
      onClick={onClick}
    >
      {isAvailable ? (
        <svg
          className={`${iconSize} text-white`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ) : (
        <svg
          className={`${lockIconSize} text-black opacity-50`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
        </svg>
      )}
    </button>
  );
}