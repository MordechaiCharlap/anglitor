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

interface ListenEnToTextEnProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
  onNext: () => void;
}

export function ListenEnToTextEn({ 
  exercise, 
  solutionWords, 
  distractorWords, 
  onComplete,
  onNext
}: ListenEnToTextEnProps) {

  // Filter and combine words for word bank - only include words with English text
  const filteredSolutionWords = solutionWords.filter(word => word.textEn && word.textEn.trim() !== '');
  const filteredDistractorWords = distractorWords.filter(word => word.textEn && word.textEn.trim() !== '');
  
  // Capitalize first word in the solution for proper display
  const firstSolutionWord = exercise.solutions[0]?.split(' ')[0]?.toLowerCase();
  const allWords = [...filteredSolutionWords, ...filteredDistractorWords].map(word => {
    if (firstSolutionWord && word.textEn.toLowerCase() === firstSolutionWord) {
      return {
        ...word,
        displayText: word.textEn.charAt(0).toUpperCase() + word.textEn.slice(1).toLowerCase()
      };
    }
    return {
      ...word,
      displayText: word.textEn
    };
  });

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
    <div className="text-center">
      <div className="flex justify-center gap-4">
        <SpeakerButton onClick={playAudio} />
        <SlowSpeakerButton onClick={playSlowAudio} />
      </div>
    </div>
  );

  return (
    <ExerciseContainer
      exercise={exercise}
      onComplete={onComplete}
      onNext={onNext}
      title="Listen and Select"
      promptSection={promptSection}
      words={allWords}
      getSelectedText={(selectedWords) => selectedWords.map(w => w.textEn).join(" ")}
    />
  );
}