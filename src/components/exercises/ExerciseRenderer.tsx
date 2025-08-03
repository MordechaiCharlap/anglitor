"use client";

import { useEffect, useState } from "react";
import { ExerciseContainer } from "./ExerciseContainer";
import { AudioOnlyPrompt } from "./PromptSections";
import { Word, Exercise, Language } from "./types";
import { speakEnglish } from "@/lib/voice";
import { useTheme } from "@/contexts/ThemeContext";

interface ExerciseRendererProps {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
  onComplete: (correct: boolean) => void;
  onNext: () => void;
}

function filterWords(
  solutionWords: Word[],
  distractorWords: Word[],
  language: Language
): Word[] {
  const textProp = language === "en" ? "textEn" : "textHe";

  const filteredSolution = (solutionWords || []).filter(
    (word) => word && word[textProp] && word[textProp].trim() !== ""
  );
  const filteredDistractors = (distractorWords || []).filter(
    (word) => word && word[textProp] && word[textProp].trim() !== ""
  );

  return [...filteredSolution, ...filteredDistractors].map((word) => ({
    ...word,
    displayText: word[textProp],
  }));
}

function capitalizeFirstWord(words: Word[], solution: string): Word[] {
  const firstSolutionWord = solution?.split(" ")[0]?.toLowerCase();
  if (!firstSolutionWord) return words;

  return words.map((word) => {
    if (word.textEn.toLowerCase() === firstSolutionWord) {
      return {
        ...word,
        displayText:
          word.textEn.charAt(0).toUpperCase() +
          word.textEn.slice(1).toLowerCase(),
      };
    }
    return { ...word, displayText: word.textEn };
  });
}

function getSelectedText(selectedWords: Word[], language: Language): string {
  const textProp = language === "en" ? "textEn" : "textHe";
  return selectedWords.map((w) => w[textProp]).join(" ");
}

export function ExerciseRenderer({
  exercise,
  solutionWords,
  distractorWords,
  onComplete,
  onNext,
}: ExerciseRendererProps) {
  const { theme } = useTheme();
  const [hasAutoPlayed, setHasAutoPlayed] = useState<string | null>(null);


  const getExerciseConfig = () => {
    switch (exercise.exerciseType) {
      case "translateEnToHe":
        return {
          title: "Translate to Hebrew",
          language: "he" as Language,
          needsCapitalization: false,
          autoPlay: undefined,
          promptSection: (
            <div
              className={`text-center p-6 rounded-lg border ${
                theme === "dark"
                  ? "bg-blue-950/20 border-blue-950"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <p
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-blue-200" : "text-blue-950"
                }`}
              >
                {exercise.sentence}
              </p>
            </div>
          ),
          checkAnswerLogic: (selectedText: string, solutions: string[]) =>
            solutions.includes(selectedText),
        };

      case "translateHeToEn":
        return {
          title: "Translate to English",
          language: "en" as Language,
          needsCapitalization: true,
          autoPlay: undefined,
          promptSection: (
            <div
              className={`text-center p-6 rounded-lg border ${
                theme === "dark"
                  ? "bg-blue-950/20 border-blue-950"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <p
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-blue-200" : "text-blue-950"
                }`}
              >
                {exercise.sentence}
              </p>
            </div>
          ),
        };

      case "listenEnToTextEn":
        return {
          title: "What did you hear?",
          language: "en" as Language,
          needsCapitalization: true,
          autoPlay: () => speakEnglish(exercise.sentence, exercise.voice),
          promptSection: (
            <AudioOnlyPrompt
              onPlay={() => speakEnglish(exercise.sentence, exercise.voice)}
              onPlaySlow={() => speakEnglish(exercise.sentence, exercise.voice)}
            />
          ),
        };

      case "listenEnToTextHe":
        return {
          title: "What did you hear? (Hebrew)",
          language: "he" as Language,
          needsCapitalization: false,
          autoPlay: () => speakEnglish(exercise.sentence, exercise.voice),
          promptSection: (
            <AudioOnlyPrompt
              onPlay={() => speakEnglish(exercise.sentence, exercise.voice)}
              onPlaySlow={() => speakEnglish(exercise.sentence, exercise.voice)}
            />
          ),
          checkAnswerLogic: (selectedText: string, solutions: string[]) =>
            solutions.includes(selectedText),
        };

      default:
        return null;
    }
  };

  const config = getExerciseConfig();

  useEffect(() => {
    if (config?.autoPlay && hasAutoPlayed !== exercise.id) {
      const timer = setTimeout(() => {
        config.autoPlay!();
        setHasAutoPlayed(exercise.id);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [exercise.id, config?.autoPlay, hasAutoPlayed]);

  if (!config) {
    return (
      <div className="text-center p-8">
        <p>Unknown exercise type: {exercise.exerciseType}</p>
      </div>
    );
  }

  const processWords = () => {
    let words = filterWords(solutionWords, distractorWords, config.language);
    if (config.needsCapitalization && exercise.solutions[0]) {
      words = capitalizeFirstWord(words, exercise.solutions[0]);
    }
    return words;
  };

  return (
    <ExerciseContainer
      exercise={exercise}
      onComplete={onComplete}
      onNext={onNext}
      title={config.title}
      promptSection={config.promptSection}
      words={processWords()}
      getSelectedText={(selectedWords) =>
        getSelectedText(selectedWords, config.language)
      }
      checkAnswerLogic={config.checkAnswerLogic}
      language={config.language}
    />
  );
}
