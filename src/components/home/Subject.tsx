"use client";

import { Text } from "@/components";
import { LessonGroupButton } from "./LessonGroupButton";
import { useTheme } from "@/contexts/ThemeContext";

interface SubjectData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
  lessonGroups: Array<{
    id: number;
    name: string;
    completedLessons: number;
    emoji: string;
  }>;
}

interface SubjectProps {
  subject: SubjectData;
  subjectIndex: number;
  totalSubjects: number;
  onLessonClick: (event: React.MouseEvent, lessonGroup: any) => void;
  isCompact?: boolean;
}

export function Subject({ 
  subject, 
  subjectIndex, 
  totalSubjects, 
  onLessonClick, 
  isCompact = false 
}: SubjectProps) {
  const { theme } = useTheme();

  return (
    <div key={subject.id} className="relative">
      {/* Subject Header - Compact */}
      <div className="relative z-10 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${subject.bgGradient} shadow-lg transform hover:scale-105 transition-all duration-300`}>
          <div className="text-center text-white">
            <div className="text-xl mb-1">{subject.emoji}</div>
            <Text variant="body" className="text-white font-bold">
              {subject.name}
            </Text>
            <div className="mt-1 flex items-center justify-center gap-1">
              <div className="text-xs">0/20</div>
              <div className="text-sm">🏆</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Groups - True Snake Pattern */}
      <div className="relative" style={{ minHeight: '768px' }}>
        {subject.lessonGroups.map((lessonGroup, index) => {
          const isFirstLesson = index === 0;
          const isLastLesson = index === subject.lessonGroups.length - 1;
          
          // Snake positioning alternates direction per subject
          // Even subjects (0,2,4...): center → left → far left → back to center
          // Odd subjects (1,3,5...): center → right → far right → back to center
          let leftPosition = '50%'; // Default center
          const isLeftDirection = subjectIndex % 2 === 0;
          
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
          
          // Random colors for first lesson
          const randomColors: Array<"green" | "blue" | "purple" | "orange" | "cyan"> = ["green", "blue", "purple", "orange", "cyan"];
          const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
          
          // Only first lesson group is available, others are locked
          const isAvailable = index === 0;
          
          // Vertical spacing: circle height (96px) + half circle size (48px) = 144px
          const verticalSpacing = 144;
          
          return (
            <div 
              key={lessonGroup.id} 
              className="absolute"
              style={{ 
                top: `${index * verticalSpacing}px`,
                left: leftPosition,
                transform: 'translateX(-50%)'
              }}
            >
              <LessonGroupButton 
                isAvailable={isAvailable}
                color={isAvailable ? randomColor : "green"}
                onClick={(e) => onLessonClick(e, lessonGroup)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}