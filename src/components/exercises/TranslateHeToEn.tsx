"use client";

import { useState, useEffect } from "react";
import { Card, Text, Button } from "@/components";
import { WordBank } from "./WordBank";
import { useTheme } from "@/contexts/ThemeContext";
import { speakHebrew } from "@/lib/voice";

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

interface TranslateHeToEnProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
}

export function TranslateHeToEn({ 
  exercise, 
  solutionWords, 
  distractorWords, 
  onComplete 
}: TranslateHeToEnProps) {
  const { theme } = useTheme();
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Filter and combine words for word bank - only include words with English text
  const filteredSolutionWords = solutionWords.filter(word => word.textEn && word.textEn.trim() !== '');
  const filteredDistractorWords = distractorWords.filter(word => word.textEn && word.textEn.trim() !== '');
  
  // Capitalize first word in the solution for proper display
  const firstSolutionWord = exercise.solutions[0]?.split(' ')[0]?.toLowerCase();
  const wordsWithCapitalization = [...filteredSolutionWords, ...filteredDistractorWords].map(word => {
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
  
  const allWords = wordsWithCapitalization.sort(() => Math.random() - 0.5);

  const handleWordSelect = (word: Word) => {
    setSelectedWords(prev => [...prev, word]);
  };

  const handleWordDeselect = (word: Word) => {
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
  };

  const checkAnswer = () => {
    const selectedText = selectedWords.map(w => w.textEn).join(" ");
    // Case-insensitive comparison to handle capitalization differences
    const correct = exercise.solutions.some(solution => 
      solution.toLowerCase() === selectedText.toLowerCase()
    );
    
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  const playAudio = () => {
    speakHebrew(exercise.sentence, exercise.voice);
  };

  useEffect(() => {
    // Auto-play audio when component mounts
    const timer = setTimeout(() => {
      playAudio();
    }, 500); // Small delay to ensure component is fully mounted
    
    return () => clearTimeout(timer);
  }, [exercise.id]); // Only trigger when exercise changes

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <Text variant="h2" className="mb-2">
            Translate to English
          </Text>
          <Text variant="body" color="secondary">
            Select the words to translate the sentence
          </Text>
        </div>

        {/* Hebrew sentence */}
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-3">
            <Text variant="h3" className="text-purple-600 dark:text-purple-400">
              {exercise.sentence}
            </Text>
            <Button
              variant="secondary"
              onClick={playAudio}
              className="p-2 rounded-full"
            >
              🔊
            </Button>
          </div>
        </div>

        {/* Word Bank */}
        <WordBank
          words={allWords}
          selectedWords={selectedWords}
          onWordSelect={handleWordSelect}
          onWordDeselect={handleWordDeselect}
          disabled={showResult}
        />

        {/* Check Answer Button */}
        {selectedWords.length > 0 && !showResult && (
          <div className="text-center">
            <Button
              variant="primary"
              onClick={checkAnswer}
              className="px-8 py-3"
            >
              Check Answer
            </Button>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`text-center p-4 rounded-lg ${
            isCorrect 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}>
            <Text variant="h3" className="mb-2">
              {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
            </Text>
            <Text variant="body">
              {isCorrect 
                ? 'Great job!' 
                : `Correct answer: ${exercise.solutions[0]}`
              }
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}