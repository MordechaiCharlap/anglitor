import { supabase } from '@/lib/supabase';

export interface Unit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
  lessonGroups: Array<{
    id: number;
    name: string;
    completedLessons: number;
    emoji: string;
  }>;
}

const mockLessonGroups = [
  { id: 1, name: "Hello World!", completedLessons: 0, emoji: "👋" },
  { id: 2, name: "My Family", completedLessons: 0, emoji: "👨‍👩‍👧‍👦" },
  { id: 3, name: "Count & Time", completedLessons: 0, emoji: "🕐" },
  { id: 4, name: "Rainbow Colors", completedLessons: 0, emoji: "🌈" },
  { id: 5, name: "Daily Fun", completedLessons: 0, emoji: "🎯" },
  { id: 6, name: "Basic Complete", completedLessons: 0, emoji: "🏆" },
];

const colorGradients = [
  "from-pink-400 via-purple-500 to-indigo-500",
  "from-cyan-400 via-blue-500 to-purple-600",
  "from-green-400 via-emerald-500 to-teal-600",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-purple-400 via-pink-500 to-red-500",
];

export async function fetchUnits(): Promise<Unit[]> {
  try {
    const { data, error } = await supabase
      .from('units') // Database table for units
      .select('*')
      .order('orderIndex');

    if (error) {
      console.error('Error fetching units:', error);
      throw error;
    }

    return data?.map((unit, index) => ({
      id: unit.id,
      name: unit.name,
      emoji: "📚", // Default emoji for now
      color: "rainbow",
      bgGradient: colorGradients[index % colorGradients.length],
      description: unit.description || "Start your learning journey!",
      lessonGroups: mockLessonGroups,
    })) || [];
  } catch (error) {
    console.error('Failed to fetch units:', error);
    throw error;
  }
}