"use client";

import { useState, useEffect, ReactNode } from "react";
import { Card, Text, Button } from "@/components";
import { WordBank, Solution } from "./index";
import { useExerciseStyles } from "@/styles/exerciseStyles";
import { Word, Exercise } from './types';

interface ExerciseContainerProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  onNext: () => void;
  title: string;
  promptSection: ReactNode;
  words: Word[];
  getSelectedText: (selectedWords: Word[]) => string;
  checkAnswerLogic?: (selectedText: string, solutions: string[]) => boolean;
  useWordBank?: boolean;
  language?: 'en' | 'he';
  customWordSelection?:
    | ReactNode
    | ((
        selectedWords: Word[],
        onWordSelect: (word: Word) => void,
        onWordDeselect: (word: Word) => void,
        disabled: boolean
      ) => ReactNode);
}

export function ExerciseContainer({
  exercise,
  onComplete,
  onNext,
  title,
  promptSection,
  words,
  getSelectedText,
  checkAnswerLogic,
  useWordBank = true,
  language = 'en',
  customWordSelection,
}: ExerciseContainerProps) {
  const styles = useExerciseStyles();
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordSelect = (word: Word) => {
    setSelectedWords((prev) => [...prev, word]);
  };

  const handleWordDeselect = (word: Word) => {
    setSelectedWords((prev) => prev.filter((w) => w.id !== word.id));
  };

  const defaultCheckAnswer = (selectedText: string, solutions: string[]) => {
    return solutions.some(
      (solution) => solution.toLowerCase() === selectedText.toLowerCase()
    );
  };

  const checkAnswer = () => {
    const selectedText = getSelectedText(selectedWords);
    const correct = checkAnswerLogic
      ? checkAnswerLogic(selectedText, exercise.solutions)
      : defaultCheckAnswer(selectedText, exercise.solutions);

    setIsCorrect(correct);
    setShowResult(true);
    onComplete(correct);
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

        {/* Solution Area */}
        <Solution
          selectedWords={selectedWords}
          onWordDeselect={handleWordDeselect}
          disabled={showResult}
          style="multiline"
          language={language}
        />

        {/* Word Selection */}
        {useWordBank ? (
          <WordBank
            words={words}
            selectedWords={selectedWords}
            onWordSelect={handleWordSelect}
            disabled={showResult}
            language={language}
          />
        ) : customWordSelection && typeof customWordSelection === "function" ? (
          customWordSelection(
            selectedWords,
            handleWordSelect,
            handleWordDeselect,
            showResult
          )
        ) : (
          customWordSelection
        )}

        {/* Fixed height bottom area for button/result */}
        <div className="h-32 flex items-center justify-center">
          {!showResult ? (
            <Button
              variant="primary"
              onClick={checkAnswer}
              disabled={selectedWords.length === 0}
              className={`px-8 py-3 ${
                selectedWords.length === 0 ? "cursor-default" : ""
              }`}
            >
              Check Answer
            </Button>
          ) : (
            <Card
              className={`text-center p-6 w-full max-w-md ${
                styles.resultCard.base
              } ${
                isCorrect ? styles.resultCard.success : styles.resultCard.error
              }`}
            >
              <Text
                variant="h3"
                className={`mb-2 ${
                  isCorrect ? styles.text.success : styles.text.error
                }`}
              >
                {isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
              </Text>
              <Text
                variant="body"
                color={isCorrect ? "primary" : "secondary"}
                className="mb-4"
              >
                {isCorrect
                  ? "Great job!"
                  : `Correct answer: ${exercise.solutions[0]}`}
              </Text>
              <Button variant="primary" onClick={onNext} className="w-full">
                Next
              </Button>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
}
