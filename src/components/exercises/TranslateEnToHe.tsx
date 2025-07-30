"use client";

import { useEffect } from "react";
import { Text, SpeakerButton } from "@/components";
import { ExerciseContainer } from "./ExerciseContainer";
import { speakEnglish } from "@/lib/voice";

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

interface TranslateEnToHeProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
}

export function TranslateEnToHe({ 
  exercise, 
  solutionWords, 
  distractorWords, 
  onComplete 
}: TranslateEnToHeProps) {
  
  // Filter and combine words for word bank - only include words with Hebrew text
  const filteredSolutionWords = solutionWords.filter(word => word.textHe && word.textHe.trim() !== '');
  const filteredDistractorWords = distractorWords.filter(word => word.textHe && word.textHe.trim() !== '');
  const allWords = [...filteredSolutionWords, ...filteredDistractorWords].map(word => ({ 
    ...word, 
    displayText: word.textHe 
  }));

  const playAudio = () => {
    speakEnglish(exercise.sentence, exercise.voice);
  };

  useEffect(() => {
    // Auto-play audio when component mounts
    const timer = setTimeout(() => {
      playAudio();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [exercise.id]);

  const promptSection = (
    <div className="text-center p-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-center gap-4">
        <Text variant="h3" color="primary" className="font-semibold text-xl">
          {exercise.sentence}
        </Text>
        <SpeakerButton onClick={playAudio} />
      </div>
    </div>
  );

  return (
    <ExerciseContainer
      exercise={exercise}
      onComplete={onComplete}
      title="Translate to Hebrew"
      promptSection={promptSection}
      words={allWords}
      getSelectedText={(selectedWords) => selectedWords.map(w => w.textHe).join(" ")}
      checkAnswerLogic={(selectedText, solutions) => solutions.includes(selectedText)}
    />
  );
}