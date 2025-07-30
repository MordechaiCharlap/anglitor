"use client";

import { useState, useEffect, ReactNode } from "react";
import { Card, Text, Button } from "@/components";
import { WordBank } from "./WordBank";

interface Word {
  id: string;
  textEn: string;
  textHe: string;
  partOfSpeech?: string;
  baseWordId?: string;
  displayText?: string;
}

interface Exercise {
  id: string;
  exerciseType: string;
  sentence: string;
  solutions: string[];
  solutionWordIds: string[];
  voice: "male" | "female";
}

interface ExerciseContainerProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  title: string;
  promptSection: ReactNode;
  words: Word[];
  getSelectedText: (selectedWords: Word[]) => string;
  checkAnswerLogic?: (selectedText: string, solutions: string[]) => boolean;
  useWordBank?: boolean;
  customWordSelection?: ReactNode | ((selectedWords: Word[], onWordSelect: (word: Word) => void, onWordDeselect: (word: Word) => void, disabled: boolean) => ReactNode);
}

export function ExerciseContainer({
  exercise,
  onComplete,
  title,
  promptSection,
  words,
  getSelectedText,
  checkAnswerLogic,
  useWordBank = true,
  customWordSelection
}: ExerciseContainerProps) {
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordSelect = (word: Word) => {
    setSelectedWords(prev => [...prev, word]);
  };

  const handleWordDeselect = (word: Word) => {
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
  };

  const defaultCheckAnswer = (selectedText: string, solutions: string[]) => {
    return solutions.some(solution => 
      solution.toLowerCase() === selectedText.toLowerCase()
    );
  };

  const checkAnswer = () => {
    const selectedText = getSelectedText(selectedWords);
    const correct = checkAnswerLogic 
      ? checkAnswerLogic(selectedText, exercise.solutions)
      : defaultCheckAnswer(selectedText, exercise.solutions);
    
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  useEffect(() => {
    // Reset state when exercise changes
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  }, [exercise.id]);

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <Text variant="h2" className="mb-2">
            {title}
          </Text>
        </div>

        {/* Prompt Section (sentence/audio) */}
        {promptSection}

        {/* Word Selection */}
        {useWordBank ? (
          <WordBank
            words={words}
            selectedWords={selectedWords}
            onWordSelect={handleWordSelect}
            onWordDeselect={handleWordDeselect}
            disabled={showResult}
          />
        ) : (
          customWordSelection && typeof customWordSelection === 'function' 
            ? customWordSelection(selectedWords, handleWordSelect, handleWordDeselect, showResult)
            : customWordSelection
        )}

        {/* Fixed height bottom area for button/result */}
        <div className="h-32 flex items-center justify-center">
          {!showResult ? (
            <Button
              variant="primary"
              onClick={checkAnswer}
              disabled={selectedWords.length === 0}
              className={`px-8 py-3 ${selectedWords.length === 0 ? 'cursor-default' : ''}`}
            >
              Check Answer
            </Button>
          ) : (
            <Card className={`text-center p-6 border-2 w-full max-w-md ${
              isCorrect 
                ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30' 
                : 'border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/30'
            }`}>
              <Text variant="h3" className={`mb-2 ${
                isCorrect 
                  ? 'text-emerald-700 dark:text-emerald-300' 
                  : 'text-rose-700 dark:text-rose-300'
              }`}>
                {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
              </Text>
              <Text variant="body" color={isCorrect ? "primary" : "secondary"}>
                {isCorrect 
                  ? 'Great job!' 
                  : `Correct answer: ${exercise.solutions[0]}`
                }
              </Text>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
}