"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Screen, Container, Text, Button } from "@/components";
import { ExerciseRenderer, Word } from "@/components/exercises";
import { fetchExercisesByIds, prepareExerciseData, Exercise } from "@/services/exerciseService";
import { useUnits } from "@/contexts/UnitsContext";
import { useExercises } from "@/contexts/ExerciseContext";

interface ExerciseData {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const { units, loading: unitsLoading } = useUnits();
  const { getShuffledExerciseIds } = useExercises();

  const [allExerciseData, setAllExerciseData] = useState<ExerciseData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [complete, setComplete] = useState(false);

  const unitIndex = parseInt(params.unitIndex as string) - 1;
  const stepIndex = parseInt(params.stepIndex as string) - 1;  
  const lessonIndex = parseInt(params.lessonIndex as string) - 1;

  useEffect(() => {
    if (unitsLoading || !units?.length) return;

    const loadLesson = async () => {
      try {
        setLoading(true);
        
        // Get pre-shuffled exercise IDs
        const exerciseIds = getShuffledExerciseIds(unitIndex, stepIndex, lessonIndex);
        
        if (!exerciseIds.length) {
          setError("Lesson not found");
          return;
        }

        // Fetch all exercises first
        const fetchedExercises = await fetchExercisesByIds(exerciseIds);
        
        if (!fetchedExercises.length) {
          setError("No exercises found");
          return;
        }

        // Prepare first exercise immediately for fast start
        const firstExerciseData = await prepareExerciseData(fetchedExercises[0]);
        setAllExerciseData([firstExerciseData]);
        setLoading(false);

        // Load remaining exercises in background
        if (fetchedExercises.length > 1) {
          for (let i = 1; i < fetchedExercises.length; i++) {
            const exerciseData = await prepareExerciseData(fetchedExercises[i]);
            setAllExerciseData(prev => [...prev, exerciseData]);
          }
        }
        
      } catch (err) {
        setError("Failed to load lesson");
        setLoading(false);
      }
    };

    loadLesson();
  }, [unitIndex, stepIndex, lessonIndex, units, unitsLoading, getShuffledExerciseIds]);

  const handleComplete = (correct: boolean) => {
    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
  };

  const handleNext = () => {
    if (currentIndex < allExerciseData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setComplete(true);
    }
  };

  const handleRetry = async () => {
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setComplete(false);
    
    // Simply shuffle the existing data
    const shuffled = shuffleArray(allExerciseData);
    setAllExerciseData(shuffled);
  };

  if (loading) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2">Loading...</Text>
        </Container>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2" className="text-red-500">{error}</Text>
          <Button variant="primary" onClick={() => router.push("/")} className="mt-4">
            Home
          </Button>
        </Container>
      </Screen>
    );
  }

  if (complete) {
    const percentage = Math.round((score.correct / score.total) * 100);
    const passed = percentage >= 60;

    return (
      <Screen>
        <Container className="py-8 text-center max-w-md mx-auto">
          <div className={`p-8 rounded-2xl ${passed ? "bg-green-100 dark:bg-green-900/20" : "bg-yellow-100 dark:bg-yellow-900/20"}`}>
            <div className="text-6xl mb-4">{passed ? "🎉" : "📚"}</div>
            <Text variant="h1" className="mb-4">Lesson Complete!</Text>
            <Text variant="h2" className="mb-6">Score: {score.correct}/{score.total} ({percentage}%)</Text>
            
            <div className="space-y-4">
              {passed ? (
                <Button variant="primary" onClick={() => {
                  const nextLessonIndex = lessonIndex + 1;
                  const unit = units?.[unitIndex];
                  const step = unit?.steps[stepIndex];
                  
                  if (step && nextLessonIndex < step.lessons.length) {
                    router.push(`/lesson/${unitIndex + 1}/${stepIndex + 1}/${nextLessonIndex + 1}`);
                  } else {
                    router.push("/language-road");
                  }
                }} className="w-full">
                  Next Lesson
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleRetry} className="w-full">
                  Try Again
                </Button>
              )}
              <Button variant="secondary" onClick={() => router.push("/")} className="w-full">
                Home
              </Button>
            </div>
          </div>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      <Container className="py-4">
        {/* Progress bar - always stays visible */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <Text variant="body" color="secondary">
              {currentIndex + 1} of {allExerciseData.length}
            </Text>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${
                  allExerciseData.length > 0 
                    ? (6.25 + (currentIndex / allExerciseData.length) * 93.75) // Start at 1/16, fill by current exercise
                    : 6.25
                }%` 
              }}
            />
          </div>
        </div>

        {/* Exercise content */}
        {allExerciseData[currentIndex] && (
          <ExerciseRenderer
            exercise={allExerciseData[currentIndex].exercise}
            solutionWords={allExerciseData[currentIndex].solutionWords}
            distractorWords={allExerciseData[currentIndex].distractorWords}
            onComplete={handleComplete}
            onNext={handleNext}
          />
        )}

        {/* Score - always stays visible */}
        <div className="mt-6 text-center">
          <Text variant="small" color="muted">
            Score: {score.correct}/{score.total}
          </Text>
        </div>
      </Container>
    </Screen>
  );
}