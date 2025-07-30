import { supabase } from '@/lib/supabase';

interface LessonData {
  id: string;
  unitId: string;
  stepIndex: number;
  lessonIndex: number;
  title: string | null;
  exercises: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
  steps: Array<{
    id: string;
    name: string;
    completedLessons: number;
    emoji: string;
    stepIndex: number;
    lessons: Array<{
      id: string;
      title: string | null;
      lessonIndex: number;
      exercises: string[];
    }>;
  }>;
}

const colorGradients = [
  "from-pink-400 via-purple-500 to-indigo-500",
  "from-cyan-400 via-blue-500 to-purple-600",
  "from-green-400 via-emerald-500 to-teal-600",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-purple-400 via-pink-500 to-red-500",
];

const unitEmojis = ["🌟", "👋", "🍕"];

const stepEmojis: Record<number, string> = {
  0: "👋",
  1: "👨‍👩‍👧‍👦", 
  2: "🕐",
  3: "🌈",
  4: "🎯",
  5: "🏆",
};

export async function fetchUnits(): Promise<Unit[]> {
  try {
    // Fetch units
    const { data: unitsData, error: unitsError } = await supabase
      .from('units')
      .select('*')
      .order('orderIndex');

    if (unitsError) {
      console.error('Error fetching units:', unitsError);
      throw unitsError;
    }

    if (!unitsData) {
      return [];
    }

    // Fetch lessons for all units
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*, exercises')
      .order('stepIndex, lessonIndex');

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
      throw lessonsError;
    }

    // Group lessons by unit and stepIndex
    const lessonsByUnit = (lessonsData || []).reduce((acc, lesson) => {
      if (!acc[lesson.unitId]) {
        acc[lesson.unitId] = {};
      }
      if (!acc[lesson.unitId][lesson.stepIndex]) {
        acc[lesson.unitId][lesson.stepIndex] = [];
      }
      acc[lesson.unitId][lesson.stepIndex].push(lesson);
      return acc;
    }, {} as Record<string, Record<number, LessonData[]>>);

    return unitsData.map((unit, index) => {
      const unitLessons = lessonsByUnit[unit.id] || {};
      
      // Convert each stepIndex into a step
      const steps = Object.entries(unitLessons).map(([stepIndex, lessons]) => {
        const stepNum = parseInt(stepIndex);
        const typedLessons = lessons as LessonData[];
        return {
          id: `${unit.id}-step-${stepIndex}`,
          name: `Step ${stepNum + 1}`, // Generic name for now
          completedLessons: 0, // TODO: Calculate from user progress
          emoji: stepEmojis[stepNum] || "📚",
          stepIndex: stepNum,
          lessons: typedLessons.map((lesson: LessonData) => ({
            id: lesson.id,
            title: lesson.title,
            lessonIndex: lesson.lessonIndex,
            exercises: lesson.exercises || [],
          })),
        };
      }).sort((a, b) => a.stepIndex - b.stepIndex);

      return {
        id: unit.id,
        name: unit.name,
        emoji: unitEmojis[index] || "📚",
        color: "rainbow",
        bgGradient: colorGradients[index % colorGradients.length],
        description: unit.description || "Start your learning journey!",
        steps,
      };
    });
  } catch (error) {
    console.error('Failed to fetch units:', error);
    throw error;
  }
}