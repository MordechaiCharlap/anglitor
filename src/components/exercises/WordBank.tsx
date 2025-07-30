"use client";

import { useState } from "react";
import { Text } from "@/components";

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
  preserveOrder?: boolean;
}

export function WordBank({ 
  words, 
  selectedWords, 
  onWordSelect, 
  onWordDeselect, 
  disabled = false,
  preserveOrder = true
}: WordBankProps) {
  const [displayWords] = useState(() => {
    return preserveOrder ? words : [...words].sort(() => Math.random() - 0.5);
  });

  const isWordSelected = (word: Word) => {
    return selectedWords.some(selected => selected.id === word.id);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4 min-h-[20px]">
        {selectedWords.length > 0 && (
          <Text variant="small" color="muted">
            Selected: {selectedWords.map(w => w.displayText || w.textEn).join(" ")}
          </Text>
        )}
      </div>
      
      
      <div className="flex flex-wrap gap-3 p-4 min-h-[60px] border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg items-start">
        {displayWords.map((word) => {
          const selected = isWordSelected(word);
          return (
            <button
              key={word.id}
              className={`
                px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full min-w-[60px]
                border-2 
                ${selected 
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' 
                  : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
              `.replace(/\s+/g, ' ').trim()}
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