"use client";

import { Card, Text } from "@/components";
import { Unit } from "./Unit";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUnits } from "@/contexts/UnitsContext";

interface LanguageRoadProps {
  isCompact?: boolean;
}

export function LanguageRoad({ isCompact = false }: LanguageRoadProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const { units, loading, error } = useUnits();
  const [selectedStep, setSelectedStep] = useState<{
    name: string;
    emoji: string;
    targetElement: HTMLElement;
    stepData: { id: string; name: string; completedLessons: number; emoji: string; stepIndex: number; lessons: Array<{id: string; title: string | null; lessonIndex: number; exercises: string[]}> };
  } | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);


  useEffect(() => {
    if (!selectedStep) {
      setPopupPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = selectedStep.targetElement.getBoundingClientRect();
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    };

    updatePosition();
    
    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedStep]);

  const handleStepClick = (event: React.MouseEvent, step: { id: string; name: string; completedLessons: number; emoji: string; stepIndex: number; lessons: Array<{id: string; title: string | null; lessonIndex: number; exercises: string[]}> }) => {
    event.stopPropagation();
    
    // If step has lessons, navigate to the first lesson
    if (step.lessons && step.lessons.length > 0) {
      const firstLesson = step.lessons[0];
      if (firstLesson.exercises && firstLesson.exercises.length > 0) {
        const exerciseIds = firstLesson.exercises.join(',');
        router.push(`/lesson?lessonId=${firstLesson.id}&exerciseIds=${exerciseIds}`);
        return;
      }
    }
    
    // Otherwise, show step popup (fallback for steps without lessons)
    if (selectedStep && selectedStep.name === step.name) {
      setSelectedStep(null);
    } else {
      setSelectedStep({
        name: step.name,
        emoji: step.emoji,
        targetElement: event.currentTarget as HTMLElement,
        stepData: step,
      });
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Text variant="body" color="muted">Loading units...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <Text variant="body" color="muted">Failed to load units. Please try again.</Text>
      </div>
    );
  }

  if (isCompact) {
    // Compact version for mobile - card format
    return (
      <Link href="/language-road">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <div className="text-center p-4">
            <Text
              variant="h3"
              className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
            >
              🌈 Language Adventure
            </Text>
            <Text variant="small" color="muted" className="mb-4">
              Your epic English learning journey
            </Text>

            {/* Mini preview */}
            <div className="flex justify-center gap-2 mb-3">
              {units.slice(0, 3).map((unit) => (
                <div
                  key={unit.id}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${unit.bgGradient} flex items-center justify-center text-white text-sm`}
                >
                  {unit.emoji}
                </div>
              ))}
            </div>

            <Text variant="caption" color="muted">
              Tap to start your adventure! →
            </Text>
          </div>
        </Card>
      </Link>
    );
  }

  // Full version for desktop sidebar
  return (
    <div className="h-full" onClick={() => setSelectedStep(null)}>

      {/* Vertical Road - Compact */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Units - Compact Vertical Layout */}
        <div className="space-y-32">
          {units.map((unit, unitIndex) => (
            <Unit
              key={unit.id}
              unit={unit}
              unitIndex={unitIndex}
              totalUnits={units.length}
              onStepClick={handleStepClick}
              isCompact={isCompact}
            />
          ))}
        </div>
      </div>
      {/* Step Popup */}
      {selectedStep && popupPosition && (
        <>
          {/* Popup */}
          <div
            className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: popupPosition.x,
              top: popupPosition.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              } border-2 shadow-2xl backdrop-blur-sm`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedStep.emoji}</span>
                <Text
                  variant="small"
                  className="font-semibold whitespace-nowrap"
                >
                  {selectedStep.name}
                </Text>
              </div>

              {/* Arrow pointing down */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${
                  theme === "dark" ? "border-t-gray-800" : "border-t-white"
                }`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
