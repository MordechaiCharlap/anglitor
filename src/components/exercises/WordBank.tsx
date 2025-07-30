"use client";

import { useState } from "react";
import { Button, Text } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

interface Word {
  id: string;
  textEn: string;
  textHe: string;
  partOfSpeech?: string;
  baseWordId?: string;
  displayText?: string;
}

interface WordBankProps {
  words: Word[];
  selectedWords: Word[];
  onWordSelect: (word: Word) => void;
  onWordDeselect: (word: Word) => void;
  disabled?: boolean;
}

export function WordBank({ 
  words, 
  selectedWords, 
  onWordSelect, 
  onWordDeselect, 
  disabled = false 
}: WordBankProps) {
  const { theme } = useTheme();

  const isWordSelected = (word: Word) => {
    return selectedWords.some(selected => selected.id === word.id);
  };

  return (
    <div className="space-y-4">
      {selectedWords.length > 0 && (
        <div className="mb-4">
          <Text variant="small" color="muted">
            Selected: {selectedWords.map(w => w.displayText || w.textEn).join(" ")}
          </Text>
        </div>
      )}
      
      <Text variant="body" className="font-semibold">
        Tap the words to select them:
      </Text>
      
      <div className="flex flex-wrap gap-3 p-4 min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg items-start">
        {words.map((word) => {
          const selected = isWordSelected(word);
          return (
            <button
              key={word.id}
              className={`
                px-6 py-1.5 text-sm font-medium transition-all duration-200 rounded-full min-w-[40px]
                ${selected 
                  ? 'bg-black text-white dark:bg-white dark:text-black opacity-70' 
                  : 'bg-transparent text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => {
                if (disabled) return;
                if (selected) {
                  onWordDeselect(word);
                } else {
                  onWordSelect(word);
                }
              }}
            >
              {word.displayText || word.textEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}