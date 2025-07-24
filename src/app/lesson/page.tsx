"use client";

import { useState, useEffect } from "react";
import { Screen, Container, Card, Text, Button, Modal } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";
import { useSpeak, playCelebrationSound } from "@/lib/voice";

interface Exercise {
  id: number;
  letter: string;
  hebrewTranslation: string;
  options: string[];
  correctAnswer: string;
}

export default function LessonPage() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const speakHebrew = useSpeak("he-IL");
  const speakEnglish = useSpeak("en-US");
  const playCelebration = playCelebrationSound();

  // Hebrew vowel representations: א + helper letter + punctuation
  const vowelTranslations = {
    A: "אָה", // Alef + Hey with Kamatz for "ah" sound
    E: "אֶה", // Alef + Hey with Segol for "eh" sound
    I: "אִי", // Alef + Yod with Hiriq for "ee" sound
    O: "אוֹ", // Alef + Vav with Holam for "oh" sound
    U: "אוּ", // Alef + Vav with Shuruq for "oo" sound
  };

  // All 5 Hebrew vowel options for 4-choice answers
  const allHebrewVowels = ["אָה", "אֶה", "אִי", "אוֹ", "אוּ"];

  // Generate 20 exercises (4 per vowel)
  const generateExercises = (): Exercise[] => {
    const vowels = ["A", "E", "I", "O", "U"];
    const exercises: Exercise[] = [];

    // Create 4 exercises per vowel (20 total)
    vowels.forEach((vowel, vowelIndex) => {
      for (let i = 0; i < 4; i++) {
        const correctTranslation =
          vowelTranslations[vowel as keyof typeof vowelTranslations];

        // Create wrong options from all Hebrew vowels except the correct one
        const wrongOptions = allHebrewVowels.filter(
          (v) => v !== correctTranslation
        );
        // Shuffle and take exactly 3 wrong options for 4 total choices
        const shuffledWrongOptions = wrongOptions.sort(
          () => Math.random() - 0.5
        );
        const selectedWrongOptions = shuffledWrongOptions.slice(0, 3);

        const options = [correctTranslation, ...selectedWrongOptions].sort(
          () => Math.random() - 0.5
        );

        exercises.push({
          id: vowelIndex * 4 + i + 1,
          letter: vowel,
          hebrewTranslation: correctTranslation,
          options,
          correctAnswer: correctTranslation,
        });
      }
    });

    // Shuffle exercises for random order
    return exercises.sort(() => Math.random() - 0.5);
  };

  const [exercises] = useState<Exercise[]>(generateExercises());
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showFloatingTab, setShowFloatingTab] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const voices = speechSynthesis.getVoices();
  console.log(voices);
  const currentExercise = exercises[currentExerciseIndex];

  // Auto-play letter sound when exercise loads
  useEffect(() => {
    if (currentExercise) {
      const timer = setTimeout(() => {
        speakEnglish(currentExercise.letter);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentExercise, speakEnglish]);

  const handleLetterClick = () => {
    setShowFloatingTab(true);
    speakEnglish(currentExercise.letter);

    // Hide floating tab after 3 seconds
    setTimeout(() => {
      setShowFloatingTab(false);
    }, 3000);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentExercise.correctAnswer) {
      setScore(score + 1);
      // Play celebration sound for correct answers
      setTimeout(() => playCelebration(), 200);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowFloatingTab(false);
    } else {
      setIsComplete(true);
    }
  };

  const restartLesson = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setShowFloatingTab(false);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <Screen>
        <Container className="py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <Text variant="h1" className="mb-4">
                🎉 Lesson Complete!
              </Text>
              <Text variant="h2" className="text-green-400 mb-4">
                {score}/{exercises.length} Correct
              </Text>
              <Text variant="body" color="secondary" className="mb-6">
                {score >= 16
                  ? "Excellent work!"
                  : score >= 12
                  ? "Good job!"
                  : "Keep practicing!"}
              </Text>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" onClick={restartLesson}>
                  Try Again
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      <Container className="py-4 h-screen flex flex-col">
        <button onClick={() => speakHebrew("תפוח")}>🔊 עברית</button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Text variant="h2">📚 Vowel Sounds Lesson</Text>
            <Text variant="body" color="secondary">
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </Text>
          </div>
          <div className="text-right">
            <Text variant="small" color="muted">
              Score
            </Text>
            <Text variant="h3" className="text-green-400">
              {score}/{exercises.length}
            </Text>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          } rounded-full h-2 mb-4`}
        >
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentExerciseIndex + 1) / exercises.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto flex-1 flex flex-col">
          {/* Letter Display */}
          <Card className="text-center relative mb-4 flex-shrink-0">
            <div className="py-6">
              <Text variant="small" color="muted" className="mb-4">
                Click the letter to hear its sound
              </Text>

              <button
                onClick={handleLetterClick}
                className={`text-7xl font-bold mb-4 ${currentTheme.hover} rounded-2xl p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
              >
                {currentExercise.letter}
              </button>

              <Text variant="h3" color="secondary">
                How do you write this vowel sound in Hebrew?
              </Text>
            </div>

            {/* Floating Tab */}
            {showFloatingTab && (
              <div
                className={`absolute top-4 right-4 ${currentTheme.cardBackground} ${currentTheme.border} border rounded-lg p-6 shadow-lg animate-pulse`}
              >
                <Text variant="h1" className="text-blue-400 mb-2 text-5xl">
                  {currentExercise.hebrewTranslation}
                </Text>
                <Text variant="caption" color="muted">
                  Hebrew vowel
                </Text>
              </div>
            )}
          </Card>

          {/* Answer Options - 4 Large Cards */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {currentExercise.options.map((option, index) => (
              <div
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(option)}
                className={`cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-xl ${
                  showFeedback ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <Card
                  className={`h-full ${
                    showFeedback
                      ? option === currentExercise.correctAnswer
                        ? "ring-4 ring-green-500 bg-green-50 dark:bg-green-900/30"
                        : selectedAnswer === option
                        ? "ring-4 ring-red-500 bg-red-50 dark:bg-red-900/30"
                        : "hover:opacity-70"
                      : selectedAnswer === option
                      ? "ring-4 ring-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "hover:shadow-lg hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600"
                  }`}
                >
                  <div className="p-4 text-center h-full flex flex-col justify-center">
                    <Text variant="h1" className="text-5xl">
                      {option}
                    </Text>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Feedback Modal */}
          <Modal isOpen={showFeedback} onClose={() => {}}>
            <div className="p-6 text-center">
              <div className="mb-6">
                {selectedAnswer === currentExercise.correctAnswer ? (
                  <div className="text-6xl mb-4">🎉</div>
                ) : (
                  <div className="text-6xl mb-4">🤔</div>
                )}
                <Text
                  variant="h2"
                  className={
                    selectedAnswer === currentExercise.correctAnswer
                      ? "text-green-600 dark:text-green-400 mb-4"
                      : "text-red-600 dark:text-red-400 mb-4"
                  }
                >
                  {selectedAnswer === currentExercise.correctAnswer
                    ? "Excellent!"
                    : "Not quite!"}
                </Text>
                <Text variant="body" color="secondary" className="mb-6">
                  The "{currentExercise.letter}" sound is written as "
                  <span
                    className="text-2xl font-bold text-blue-500 cursor-pointer hover:text-blue-400 transition-colors duration-200"
                    onClick={() =>
                      speakHebrew(currentExercise.hebrewTranslation)
                    }
                    title="Click to hear Hebrew pronunciation"
                  >
                    {currentExercise.hebrewTranslation}
                  </span>
                  " in Hebrew
                </Text>
              </div>
              <Button
                variant="primary"
                onClick={handleNextExercise}
                className="px-8 py-3 text-lg hover:scale-105 transition-transform duration-200"
              >
                {currentExerciseIndex === exercises.length - 1
                  ? "🏁 Finish Lesson"
                  : "➡️ Next Exercise"}
              </Button>
            </div>
          </Modal>
        </div>
      </Container>
    </Screen>
  );
}
