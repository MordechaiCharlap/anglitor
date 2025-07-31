"use client";

import { TranslateEnToHe } from './TranslateEnToHe';
import { TranslateHeToEn } from './TranslateHeToEn';
import { ListenEnToTextEn } from './ListenEnToTextEn';
import { ListenEnToTextHe } from './ListenEnToTextHe';

interface Word {
  id: string;
  textEn: string;
  textHe: string;
  partOfSpeech?: string;
  baseWordId?: string;
}

interface Exercise {
  id: string;
  exerciseType: string;
  sentence: string;
  solutions: string[];
  solutionWordIds: string[];
  voice: "male" | "female";
}

interface ExerciseRendererProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
  onNext: () => void;
}

export function ExerciseRenderer({ 
  exercise, 
  solutionWords, 
  distractorWords, 
  onComplete,
  onNext
}: ExerciseRendererProps) {
  
  switch (exercise.exerciseType) {
    case 'translateEnToHe':
      return (
        <TranslateEnToHe
          exercise={exercise}
          solutionWords={solutionWords}
          distractorWords={distractorWords}
          onComplete={onComplete}
          onNext={onNext}
        />
      );
      
    case 'translateHeToEn':
      return (
        <TranslateHeToEn
          exercise={exercise}
          solutionWords={solutionWords}
          distractorWords={distractorWords}
          onComplete={onComplete}
          onNext={onNext}
        />
      );
      
    case 'listenEnToTextEn':
      return (
        <ListenEnToTextEn
          exercise={exercise}
          solutionWords={solutionWords}
          distractorWords={distractorWords}
          onComplete={onComplete}
          onNext={onNext}
        />
      );
      
    case 'listenEnToTextHe':
      return (
        <ListenEnToTextHe
          exercise={exercise}
          solutionWords={solutionWords}
          distractorWords={distractorWords}
          onComplete={onComplete}
          onNext={onNext}
        />
      );
      
    default:
      return (
        <div className="text-center p-8">
          <p>Unknown exercise type: {exercise.exerciseType}</p>
        </div>
      );
  }
}