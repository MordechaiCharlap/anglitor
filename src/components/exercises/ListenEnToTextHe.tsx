"use client";

import { useEffect } from "react";
import { SpeakerButton, SlowSpeakerButton } from "@/components";
import { ExerciseContainer } from "./ExerciseContainer";
import { speakEnglish, speakEnglishSlow } from "@/lib/voice";

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

interface ListenEnToTextHeProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
}

export function ListenEnToTextHe({ 
  exercise, 
  solutionWords, 
  distractorWords, 
  onComplete 
}: ListenEnToTextHeProps) {

  // Filter and combine words for word bank - only include words with Hebrew text
  const filteredSolutionWords = solutionWords.filter(word => word.textHe && word.textHe.trim() !== '');
  const filteredDistractorWords = distractorWords.filter(word => word.textHe && word.textHe.trim() !== '');
  const allWords = [...filteredSolutionWords, ...filteredDistractorWords];

  const playAudio = () => {
    speakEnglish(exercise.sentence, exercise.voice);
  };

  const playSlowAudio = () => {
    speakEnglishSlow(exercise.sentence, exercise.voice);
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
      <div className="mb-4 flex justify-center gap-4">
        <SpeakerButton onClick={playAudio} />
        <SlowSpeakerButton onClick={playSlowAudio} />
      </div>
    </div>
  );

  // Filter and prepare words with Hebrew display text
  const wordsForWordBank = allWords.map(word => ({ 
    ...word, 
    displayText: word.textHe 
  }));

  return (
    <ExerciseContainer
      exercise={exercise}
      onComplete={onComplete}
      title="Listen and Translate"
      promptSection={promptSection}
      words={wordsForWordBank}
      getSelectedText={(selectedWords) => selectedWords.map(w => w.textHe).join(" ")}
      checkAnswerLogic={(selectedText, solutions) => solutions.includes(selectedText)}
    />
  );
}