"use client";

import { useState, useEffect } from "react";
import { Card, Text, Button } from "@/components";
import { WordBank } from "./WordBank";
import { useTheme } from "@/contexts/ThemeContext";
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
  const { theme } = useTheme();
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Filter and combine words for word bank - only include words with Hebrew text
  const filteredSolutionWords = solutionWords.filter(word => word.textHe && word.textHe.trim() !== '');
  const filteredDistractorWords = distractorWords.filter(word => word.textHe && word.textHe.trim() !== '');
  const allWords = [...filteredSolutionWords, ...filteredDistractorWords].sort(() => Math.random() - 0.5);

  const handleWordSelect = (word: Word) => {
    setSelectedWords(prev => [...prev, word]);
  };

  const handleWordDeselect = (word: Word) => {
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
  };

  const checkAnswer = () => {
    const selectedText = selectedWords.map(w => w.textHe).join(" ");
    const correct = exercise.solutions.includes(selectedText);
    
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  const playAudio = () => {
    speakEnglish(exercise.sentence, exercise.voice);
    setHasPlayed(true);
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
            Listen and Translate
          </Text>
          <Text variant="body" color="secondary">
            Listen to the English audio and select the Hebrew translation
          </Text>
        </div>

        {/* Audio Player */}
        <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="mb-4">
            <Button
              variant="primary"
              onClick={playAudio}
              className="px-8 py-4 text-lg rounded-full"
            >
              🔊 {hasPlayed ? 'Play Again' : 'Play Audio'}
            </Button>
          </div>
          <Text variant="small" color="muted">
            Listen to the English and select the Hebrew words
          </Text>
        </div>

        {/* Word Bank - Modified to show Hebrew text */}
        <div className="space-y-4">
          <Text variant="body" className="font-semibold">
            Tap the Hebrew words to select them:
          </Text>
          
          <div className="flex flex-wrap gap-3 p-4 min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg">
            {allWords.map((word) => {
              const selected = selectedWords.some(selected => selected.id === word.id);
              return (
                <Button
                  key={word.id}
                  variant={selected ? "primary" : "secondary"}
                  className={`
                    px-4 py-2 text-sm font-medium transition-all duration-200
                    ${selected 
                      ? 'transform scale-95 opacity-70' 
                      : 'hover:scale-105 hover:shadow-md'
                    }
                    ${showResult ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={() => {
                    if (showResult) return;
                    if (selected) {
                      handleWordDeselect(word);
                    } else {
                      handleWordSelect(word);
                    }
                  }}
                >
                  {word.textHe}
                </Button>
              );
            })}
          </div>
          
          {selectedWords.length > 0 && (
            <div className="mt-4">
              <Text variant="small" color="muted">
                Selected: {selectedWords.map(w => w.textHe).join(" ")}
              </Text>
            </div>
          )}
        </div>

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