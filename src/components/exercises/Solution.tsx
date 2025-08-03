"use client";

import { useState, useEffect } from "react";
import { Text } from "@/components";
import { useExerciseStyles } from "@/styles/exerciseStyles";
import { Word } from './types';

interface SolutionProps {
  selectedWords: Word[];
  onWordDeselect: (word: Word) => void;
  disabled?: boolean;
  style?: 'line' | 'multiline';
}

export function Solution({ 
  selectedWords, 
  onWordDeselect, 
  disabled = false,
  style = 'line'
}: SolutionProps) {
  const styles = useExerciseStyles();
  const [fadingInWords, setFadingInWords] = useState<Set<string>>(new Set());
  const [previousWordIds, setPreviousWordIds] = useState<string[]>([]);

  // Track when new words are added to trigger fade-in animation
  useEffect(() => {
    const currentWordIds = selectedWords.map(word => word.id);
    
    // Find newly added words by comparing with previous state
    const newWordIds = currentWordIds.filter(id => !previousWordIds.includes(id));

    if (newWordIds.length > 0) {
      // Start fade-in animation for only the newly added words
      setFadingInWords(prev => {
        const newSet = new Set(prev);
        newWordIds.forEach(id => newSet.add(id));
        return newSet;
      });

      // Remove from fading set after animation completes
      setTimeout(() => {
        setFadingInWords(prev => {
          const newSet = new Set(prev);
          newWordIds.forEach(id => newSet.delete(id));
          return newSet;
        });
      }, 500);
    }

    // Update previous word IDs for next comparison
    setPreviousWordIds(currentWordIds);
  }, [selectedWords]);

  const calculateSolutionHeight = () => {
    if (style === 'line') return 48;
    // Simple responsive height based on word count
    const wordsPerLine = 4;
    const lines = Math.ceil(selectedWords.length / wordsPerLine);
    return Math.max(80, lines * 48 + 16);
  };

  return (
    <div className="space-y-2 w-full">
      <Text variant="small" color="muted" className="text-center">
        Your Answer
      </Text>
      <div className="w-full max-w-full mx-auto bg-transparent px-2">
        {style === 'line' ? (
          <div className="h-12 w-full border-b-2 border-dashed border-blue-300 dark:border-blue-600 bg-gradient-to-r from-transparent via-blue-50 dark:via-blue-950/20 to-transparent rounded-sm">
            <div className="flex items-center h-full px-2 sm:px-3 gap-2 sm:gap-3 overflow-x-auto">
              {selectedWords.length === 0 ? (
                <Text variant="small" color="muted" className="italic whitespace-nowrap text-xs sm:text-sm">
                  Tap words below to build your answer...
                </Text>
              ) : (
                selectedWords.map((word, index) => {
                  const isFadingIn = fadingInWords.has(word.id);
                  return (
                    <button
                      key={`${word.id}-${index}`}
                      className={`
                        ${styles.wordButton.base}
                        ${styles.wordButton.selected}
                        transform transition-all duration-300 ease-out
                        hover:scale-105 hover:-translate-y-1
                        whitespace-nowrap flex-shrink-0
                        text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                        ${isFadingIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                      `.replace(/\s+/g, ' ').trim()}
                      style={{
                        animation: isFadingIn ? 'fadeInUp 0.5s ease-out forwards' : undefined
                      }}
                      onClick={() => {
                        if (!disabled) {
                          onWordDeselect(word);
                        }
                      }}
                      disabled={disabled}
                    >
                      {word.displayText || word.textEn}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div 
            className="w-full p-3 relative bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-neutral-700 rounded-lg border-2"
            style={{ minHeight: `${calculateSolutionHeight()}px` }}
          >
            {selectedWords.length === 0 ? (
              <div className="flex items-center justify-center h-12">
                <Text variant="small" color="muted" className="italic text-xs sm:text-sm">
                  Tap words below to build your answer...
                </Text>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 items-start">
                {selectedWords.map((word, index) => {
                  const isFadingIn = fadingInWords.has(word.id);
                  return (
                    <button
                      key={`${word.id}-${index}`}
                      className={`
                        ${styles.wordButton.base}
                        ${styles.wordButton.selected}
                        transition-all duration-300 ease-out
                        hover:scale-105 cursor-pointer
                        text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                        ${isFadingIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                      `.replace(/\s+/g, ' ').trim()}
                      style={{
                        animation: isFadingIn ? 'fadeInUp 0.5s ease-out forwards' : undefined
                      }}
                      onClick={() => {
                        if (!disabled) {
                          onWordDeselect(word);
                        }
                      }}
                      disabled={disabled}
                    >
                      {word.displayText || word.textEn}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}