"use client";

import { useEffect } from "react";
import { Text, SpeakerButton } from "@/components";
import { ExerciseContainer } from "./ExerciseContainer";
import { speakEnglish } from "@/lib/voice";
import { useExerciseStyles } from "@/styles/exerciseStyles";

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
  onNext: () => void;
}

export function TranslateEnToHe({ 
  exercise, 
  solutionWords, 
  distractorWords, 
  onComplete,
  onNext
}: TranslateEnToHeProps) {
  const styles = useExerciseStyles();
  
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
    <div className="flex items-center gap-4">
      <div className={`flex-[3] p-6 ${styles.textCard}`}>
        <Text variant="h3" color="primary" className="font-semibold text-xl text-center">
          {exercise.sentence}
        </Text>
      </div>
      <div className="flex-1 flex justify-center">
        <SpeakerButton onClick={playAudio} />
      </div>
    </div>
  );

  return (
    <ExerciseContainer
      exercise={exercise}
      onComplete={onComplete}
      onNext={onNext}
      title="Translate to Hebrew"
      promptSection={promptSection}
      words={allWords}
      getSelectedText={(selectedWords) => selectedWords.map(w => w.textHe).join(" ")}
      checkAnswerLogic={(selectedText, solutions) => solutions.includes(selectedText)}
    />
  );
}