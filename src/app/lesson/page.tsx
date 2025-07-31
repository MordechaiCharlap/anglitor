"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Screen, Container, Text, Button } from "@/components";
import { ExerciseRenderer } from "@/components/exercises";
import {
  fetchExercisesByIds,
  prepareExerciseData,
  shuffleArray,
  Exercise,
  Word,
} from "@/services/exerciseService";
import { useTheme } from "@/contexts/ThemeContext";

interface ExerciseData {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
}

export default function LessonPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [allExerciseData, setAllExerciseData] = useState<ExerciseData[]>([]);
  const [currentExerciseData, setCurrentExerciseData] =
    useState<ExerciseData | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [lessonComplete, setLessonComplete] = useState(false);

  // Get lesson data from URL parameters
  const lessonId = searchParams.get("lessonId");
  const exerciseIds = searchParams.get("exerciseIds")?.split(",") || [];

  // Load and shuffle exercises on mount
  useEffect(() => {
    const loadExercises = async () => {
      if (!lessonId || exerciseIds.length === 0) {
        setError("Missing lesson or exercise data");
        setLoading(false);
        return;
      }

      console.log(
        "🔄 Loading exercises for lesson:",
        lessonId,
        "with exercise IDs:",
        exerciseIds
      );

      try {
        setLoading(true);

        // Fetch exercises from database
        const exercises = await fetchExercisesByIds(exerciseIds);
        console.log("✅ Fetched exercises:", exercises);

        // Shuffle exercises for random order
        const shuffledExercises = shuffleArray(exercises);
        console.log("🔀 Shuffled exercises:", shuffledExercises);

        // Prepare all exercise data upfront
        console.log("🔄 Preparing all exercise data...");
        const exerciseDataPromises = shuffledExercises.map(exercise => 
          prepareExerciseData(exercise)
        );
        const allPreparedData = await Promise.all(exerciseDataPromises);
        console.log("✅ All exercise data prepared:", allPreparedData);

        setAllExercises(shuffledExercises);
        setAllExerciseData(allPreparedData);
        setCurrentExerciseData(allPreparedData[0] || null);
      } catch (err) {
        console.error("❌ Failed to load exercises:", err);
        setError("Failed to load lesson exercises");
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [lessonId, exerciseIds.join(",")]);

  // Update current exercise data when index changes
  useEffect(() => {
    if (allExerciseData.length > 0 && currentExerciseIndex < allExerciseData.length) {
      setCurrentExerciseData(allExerciseData[currentExerciseIndex]);
    }
  }, [allExerciseData, currentExerciseIndex]);

  const handleExerciseComplete = (correct: boolean) => {
    console.log("Exercise completed:", {
      correct,
      currentIndex: currentExerciseIndex,
    });

    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      total: score.total + 1,
    };
    setScore(newScore);
  };

  const handleNextExercise = () => {
    // Move to next exercise or complete lesson
    if (currentExerciseIndex < allExercises.length - 1) {
      console.log("Moving to next exercise");
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      // Lesson complete
      console.log("Lesson complete");
      setLessonComplete(true);
    }
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  const handleRetryLesson = async () => {
    console.log("handleRetryLesson called");
    setCurrentExerciseIndex(0);
    setScore({ correct: 0, total: 0 });
    setLessonComplete(false);
    setCurrentExerciseData(null);

    // Re-shuffle exercises and prepare data again
    const shuffledExercises = shuffleArray(allExercises);
    const exerciseDataPromises = shuffledExercises.map(exercise => 
      prepareExerciseData(exercise)
    );
    const allPreparedData = await Promise.all(exerciseDataPromises);
    
    setAllExercises(shuffledExercises);
    setAllExerciseData(allPreparedData);
    setCurrentExerciseData(allPreparedData[0] || null);
  };

  if (loading) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2" className="mb-4">
            Loading Lesson...
          </Text>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </Container>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2" className="mb-4 text-red-500">
            Error Loading Lesson
          </Text>
          <Text variant="body" className="mb-6">
            {error}
          </Text>
          <Button variant="primary" onClick={handleReturnHome}>
            Return Home
          </Button>
        </Container>
      </Screen>
    );
  }

  if (allExercises.length === 0 && !loading) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2" className="mb-4">
            No Exercises Found
          </Text>
          <Text variant="body" className="mb-6">
            This lesson doesn't have any exercises yet.
          </Text>
          <Button variant="primary" onClick={handleReturnHome}>
            Return Home
          </Button>
        </Container>
      </Screen>
    );
  }

  if (lessonComplete) {
    const percentage = Math.round((score.correct / score.total) * 100);
    const isPassing = percentage >= 60;

    return (
      <Screen>
        <Container className="py-8 text-center max-w-md mx-auto">
          <div
            className={`p-8 rounded-2xl ${
              isPassing
                ? "bg-green-100 dark:bg-green-900/20"
                : "bg-yellow-100 dark:bg-yellow-900/20"
            }`}
          >
            <div className="text-6xl mb-4">{isPassing ? "🎉" : "📚"}</div>

            <Text variant="h1" className="mb-4">
              Lesson Complete!
            </Text>

            <Text variant="h2" className="mb-6">
              Score: {score.correct}/{score.total} ({percentage}%)
            </Text>

            <Text variant="body" className="mb-8" color="secondary">
              {isPassing
                ? "Excellent work! You've mastered this lesson."
                : "Good effort! Practice makes perfect."}
            </Text>

            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={handleReturnHome}
                className="w-full"
              >
                Continue Learning
              </Button>

              {!isPassing && (
                <Button
                  variant="secondary"
                  onClick={handleRetryLesson}
                  className="w-full"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Screen>
    );
  }

  // Show loading while preparing current exercise
  if (!currentExerciseData) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2" className="mb-4">
            Loading Exercise...
          </Text>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      <Container className="py-4">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <Text variant="body" color="secondary">
              {currentExerciseIndex + 1} of {allExercises.length}
            </Text>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentExerciseIndex / allExercises.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Current Exercise */}
        <ExerciseRenderer
          exercise={currentExerciseData.exercise}
          solutionWords={currentExerciseData.solutionWords}
          distractorWords={currentExerciseData.distractorWords}
          onComplete={handleExerciseComplete}
          onNext={handleNextExercise}
        />

        {/* Score Display */}
        <div className="mt-6 text-center">
          <Text variant="small" color="muted">
            Score: {score.correct}/{score.total}
          </Text>
        </div>
      </Container>
    </Screen>
  );
}
