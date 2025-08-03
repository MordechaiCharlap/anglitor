"use client";

import { useState, useEffect } from "react";
import { useExerciseStyles } from "@/styles/exerciseStyles";
import { Word } from './types';

interface WordBankProps {
  words: Word[];
  selectedWords: Word[];
  onWordSelect: (word: Word) => void;
  disabled?: boolean;
  preserveOrder?: boolean;
}

export function WordBank({ 
  words, 
  selectedWords, 
  onWordSelect, 
  disabled = false,
  preserveOrder = true
}: WordBankProps) {
  const styles = useExerciseStyles();
  const [displayWords] = useState(() => {
    return preserveOrder ? words : [...words].sort(() => Math.random() - 0.5);
  });
  const [fadingOutWords, setFadingOutWords] = useState<Set<string>>(new Set());

  const isWordSelected = (word: Word) => {
    return selectedWords.some(selected => selected.id === word.id);
  };

  // Track when words are selected to trigger fade-out animation
  useEffect(() => {
    const newlySelectedIds = selectedWords
      .map(word => word.id)
      .filter(id => !fadingOutWords.has(id));

    if (newlySelectedIds.length > 0) {
      // Start fade-out animation for newly selected words
      setFadingOutWords(prev => {
        const newSet = new Set(prev);
        newlySelectedIds.forEach(id => newSet.add(id));
        return newSet;
      });
    }

    // Remove words from fading set if they're deselected
    const deselectedIds = Array.from(fadingOutWords).filter(id => 
      !selectedWords.some(word => word.id === id)
    );

    if (deselectedIds.length > 0) {
      setFadingOutWords(prev => {
        const newSet = new Set(prev);
        deselectedIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  }, [selectedWords, fadingOutWords]);

  const handleWordClick = (word: Word) => {
    if (disabled || isWordSelected(word) || fadingOutWords.has(word.id)) return;
    
    // Start fade-out animation
    setFadingOutWords(prev => new Set(prev).add(word.id));
    
    // Trigger selection after a brief delay to allow fade-out to start
    setTimeout(() => {
      onWordSelect(word);
    }, 50);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 sm:gap-3 p-3 sm:p-4 min-h-[60px] border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg items-start justify-center">
        {displayWords.map((word) => {
          const selected = isWordSelected(word);
          const isFadingOut = fadingOutWords.has(word.id);
          
          return (
            <button
              key={word.id}
              className={`
                ${styles.wordButton.base}
                ${selected || isFadingOut ? styles.wordButton.unselected : styles.wordButton.unselected}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                transition-all duration-300 ease-out
                text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                ${selected || isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
                ${selected || isFadingOut ? '' : 'hover:opacity-90'}
              `.replace(/\s+/g, ' ').trim()}
              onClick={() => handleWordClick(word)}
              disabled={disabled || selected || isFadingOut}
              style={{
                // Preserve space even when faded out
                visibility: 'visible'
              }}
            >
              {/* Show text only if not selected (to preserve space but hide content) */}
              <span className={selected || isFadingOut ? 'opacity-0' : 'opacity-100'}>
                {word.displayText || word.textEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}