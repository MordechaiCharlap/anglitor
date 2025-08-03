"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Screen, Container, Text, Button } from "@/components";
import { ExerciseRenderer, Word } from "@/components/exercises";
import { fetchExercisesByIds, prepareExerciseData, shuffleArray, Exercise } from "@/services/exerciseService";
import { useUnits } from "@/contexts/UnitsContext";

interface ExerciseData {
  exercise: Exercise;
  solutionWords: Word[];
  distractorWords: Word[];
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const { units, loading: unitsLoading } = useUnits();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentData, setCurrentData] = useState<ExerciseData | null>(null);
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

    let cancelled = false;

    const loadLesson = async () => {
      if (cancelled) return;
      try {
        setLoading(true);
        
        const unit = units[unitIndex];
        const step = unit?.steps[stepIndex];
        const lesson = step?.lessons[lessonIndex];
        
        if (!lesson?.exercises?.length) {
          setError("Lesson not found");
          return;
        }

        const fetchedExercises = await fetchExercisesByIds(lesson.exercises);
        const shuffledExercises = shuffleArray(fetchedExercises);
        setExercises(shuffledExercises);

        // Prepare first exercise
        const firstData = await prepareExerciseData(shuffledExercises[0]);
        
        if (!cancelled) {
          setCurrentData(firstData);
        }
        
      } catch (err) {
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
    
    return () => {
      cancelled = true;
    };
  }, [unitIndex, stepIndex, lessonIndex, unitsLoading, units]);

  const handleComplete = (correct: boolean) => {
    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
  };

  const handleNext = async () => {
    if (currentIndex < exercises.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      
      const nextData = await prepareExerciseData(exercises[nextIndex]);
      setCurrentData(nextData);
    } else {
      setComplete(true);
    }
  };

  const handleRetry = async () => {
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setComplete(false);
    
    const shuffled = shuffleArray(exercises);
    setExercises(shuffled);
    
    const firstData = await prepareExerciseData(shuffled[0]);
    setCurrentData(firstData);
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

  if (!currentData) {
    return (
      <Screen>
        <Container className="py-8 text-center">
          <Text variant="h2">Loading Exercise...</Text>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      <Container className="py-4">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <Text variant="body" color="secondary">
              {currentIndex + 1} of {exercises.length}
            </Text>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / exercises.length) * 100}%` }}
            />
          </div>
        </div>

        <ExerciseRenderer
          exercise={currentData.exercise}
          solutionWords={currentData.solutionWords}
          distractorWords={currentData.distractorWords}
          onComplete={handleComplete}
          onNext={handleNext}
        />

        <div className="mt-6 text-center">
          <Text variant="small" color="muted">
            Score: {score.correct}/{score.total}
          </Text>
        </div>
      </Container>
    </Screen>
  );
}