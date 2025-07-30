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
      <Text variant="body" className="font-semibold">
        Tap the words to select them:
      </Text>
      
      <div className="flex flex-wrap gap-3 p-4 min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg">
        {words.map((word) => {
          const selected = isWordSelected(word);
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
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
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
            </Button>
          );
        })}
      </div>
      
      {selectedWords.length > 0 && (
        <div className="mt-4">
          <Text variant="small" color="muted">
            Selected: {selectedWords.map(w => w.displayText || w.textEn).join(" ")}
          </Text>
        </div>
      )}
    </div>
  );
}