"use client";

import { Button, Text } from "@/components";

interface TextWithAudioPromptProps {
  text: string;
  onPlay: () => void;
  hideText?: boolean;
}

export function TextWithAudioPrompt({ text, onPlay, hideText = false }: TextWithAudioPromptProps) {
  return (
    <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
      {!hideText && (
        <Text variant="h3" className="mb-4 text-blue-800 dark:text-blue-200">
          {text}
        </Text>
      )}
      <Button
        variant="secondary"
        onClick={onPlay}
        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800"
      >
        🔊 {hideText ? "Play Audio" : "Listen"}
      </Button>
    </div>
  );
}