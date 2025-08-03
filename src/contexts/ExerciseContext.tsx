"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUnits } from './UnitsContext';
import { shuffleArray } from '@/services/exerciseService';

interface ExerciseContextType {
  getShuffledExerciseIds: (unitIndex: number, stepIndex: number, lessonIndex: number) => string[];
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

interface ExerciseProviderProps {
  children: ReactNode;
}

export function ExerciseProvider({ children }: ExerciseProviderProps) {
  const { units } = useUnits();
  const [shuffledExerciseIds, setShuffledExerciseIds] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!units.length) return;

    const shuffledIds: Record<string, string[]> = {};
    
    // Pre-shuffle exercise IDs for all lessons
    units.forEach((unit, unitIndex) => {
      unit.steps.forEach((step, stepIndex) => {
        step.lessons.forEach((lesson, lessonIndex) => {
          const lessonKey = `${unitIndex}-${stepIndex}-${lessonIndex}`;
          const shuffled = shuffleArray(lesson.exercises, lesson.id);
          shuffledIds[lessonKey] = shuffled;
        });
      });
    });

    setShuffledExerciseIds(shuffledIds);
  }, [units]);

  const getShuffledExerciseIds = (unitIndex: number, stepIndex: number, lessonIndex: number): string[] => {
    const lessonKey = `${unitIndex}-${stepIndex}-${lessonIndex}`;
    return shuffledExerciseIds[lessonKey] || [];
  };

  const value: ExerciseContextType = {
    getShuffledExerciseIds,
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercises(): ExerciseContextType {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
}