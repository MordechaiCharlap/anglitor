export interface Word {
  id: string;
  textEn: string;
  textHe: string;
  partOfSpeech?: string;
  baseWordId?: string;
  displayText?: string;
}

export interface Exercise {
  id: string;
  exerciseType: string;
  sentence: string;
  solutions: string[];
  solutionWordIds: string[];
  voice: "male" | "female";
}

export interface ExerciseProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
  onNext: () => void;
}

export type Language = 'en' | 'he';
export type ExerciseType = 'translate-en-to-he' | 'translate-he-to-en' | 'listen-en-to-text-en' | 'listen-en-to-text-he';