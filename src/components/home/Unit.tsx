"use client";

import { Text } from "@/components";
import { StepButton } from "./StepButton";
import { useTheme } from "@/contexts/ThemeContext";

interface UnitData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
  steps: Array<{
    id: string;
    name: string;
    completedLessons: number;
    emoji: string;
    stepIndex: number;
    lessons: Array<{
      id: string;
      title: string | null;
      lessonIndex: number;
    }>;
  }>;
}

interface UnitProps {
  unit: UnitData;
  unitIndex: number;
  totalUnits: number;
  onStepClick: (event: React.MouseEvent, step: { id: string; name: string; completedLessons: number; emoji: string }) => void;
  isCompact?: boolean;
}

export function Unit({ 
  unit, 
  unitIndex, 
  totalUnits, 
  onStepClick, 
  isCompact = false 
}: UnitProps) {
  const { theme } = useTheme();

  return (
    <div key={unit.id} className="relative">
      {/* Unit Header - Text with Lines */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className={`flex-1 h-px ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}></div>
          <Text variant="body" className="font-bold whitespace-nowrap">
            {unit.name}
          </Text>
          <div className={`flex-1 h-px ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}></div>
        </div>
      </div>

      {/* Steps - True Snake Pattern */}
      <div className="relative" style={{ minHeight: '768px' }}>
        {unit.steps.map((step, index) => {
          const isFirstLesson = index === 0;
          const isLastStep = index === unit.steps.length - 1;
          
          // Snake positioning alternates direction per unit
          // Even units (0,2,4...): center → left → far left → back to center
          // Odd units (1,3,5...): center → right → far right → back to center
          let leftPosition = '50%'; // Default center
          const isLeftDirection = unitIndex % 2 === 0;
          
          if (isLeftDirection) {
            // Left curve pattern: ( - curves INWARD toward center
            switch (index) {
              case 0: leftPosition = '50%'; break;  // Start center
              case 1: leftPosition = '45%'; break;  // Move slightly left
              case 2: leftPosition = '40%'; break;  // Curve more left (outward edge)
              case 3: leftPosition = '45%'; break;  // Curve back inward
              case 4: leftPosition = '48%'; break;  // Almost back to center
              case 5: leftPosition = '50%'; break;  // End center
            }
          } else {
            // Right curve pattern: ) - curves INWARD toward center
            switch (index) {
              case 0: leftPosition = '50%'; break;  // Start center
              case 1: leftPosition = '55%'; break;  // Move slightly right
              case 2: leftPosition = '60%'; break;  // Curve more right (outward edge)
              case 3: leftPosition = '55%'; break;  // Curve back inward
              case 4: leftPosition = '52%'; break;  // Almost back to center
              case 5: leftPosition = '50%'; break;  // End center
            }
          }
          
          // Fixed cycling colors for steps - use unit index for consistent color per unit
          const lessonColors: Array<"green" | "blue" | "purple" | "orange" | "cyan"> = ["green", "blue", "purple", "orange", "cyan"];
          const stepColor = lessonColors[unitIndex % lessonColors.length];
          
          // Only first step is available, others are locked
          const isAvailable = index === 0;
          
          // Vertical spacing: circle height (96px) + half circle size (48px) = 144px
          const verticalSpacing = 144;
          
          return (
            <div 
              key={step.id} 
              className="absolute"
              style={{ 
                top: `${index * verticalSpacing}px`,
                left: leftPosition,
                transform: 'translateX(-50%)'
              }}
            >
              <StepButton 
                isAvailable={isAvailable}
                color={isAvailable ? stepColor : "green"}
                onClick={(e) => onStepClick(e, step)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}