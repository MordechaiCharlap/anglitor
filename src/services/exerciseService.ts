import { supabase } from '@/lib/supabase';

export interface Exercise {
  id: string;
  exerciseType: string;
  sentence: string;
  solutions: string[];
  solutionWordIds: string[];
  voice: "male" | "female";
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  textEn: string;
  textHe: string;
  partOfSpeech?: string;
  baseWordId?: string;
  isName: boolean;
  gender?: string;
  number?: string;
}

// Fetch exercises by IDs
export async function fetchExercisesByIds(exerciseIds: string[]): Promise<Exercise[]> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .in('id', exerciseIds);

    if (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
}

// Fetch words by IDs
export async function fetchWordsByIds(wordIds: string[]): Promise<Word[]> {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .in('id', wordIds);

    if (error) {
      console.error('Error fetching words:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch words:', error);
    throw error;
  }
}

// Fetch distractor words (same amount as solution words, excluding same baseWordId)
export async function fetchDistractorWords(
  solutionWords: Word[], 
  count: number = solutionWords.length,
  exerciseType?: string
): Promise<Word[]> {
  try {
    // Get baseWordIds from solution words to exclude
    const excludeBaseWordIds = solutionWords
      .map(word => word.baseWordId || word.id)
      .filter(Boolean);
    
    // Get solution word IDs to exclude
    const excludeWordIds = solutionWords.map(word => word.id);

    const { data, error } = await supabase
      .from('words')
      .select('*')
      .not('id', 'in', `(${excludeWordIds.join(',')})`)
      .not('baseWordId', 'in', `(${excludeBaseWordIds.join(',')})`)
      .limit(count * 5) // Get more than needed to allow for filtering
      .order('id'); // Random order would be better, but this works

    if (error) {
      console.error('Error fetching distractor words:', error);
      throw error;
    }

    let filteredWords = data || [];

    // Filter words based on exercise type to ensure they have required text fields
    if (exerciseType) {
      filteredWords = filteredWords.filter(word => {
        switch (exerciseType) {
          case 'translateEnToHe':
          case 'listenEnToTextEn':
            // Need both English and Hebrew text
            return word.textEn && word.textEn.trim() !== '' && 
                   word.textHe && word.textHe.trim() !== '';
          case 'translateHeToEn':
            // Need both Hebrew and English text  
            return word.textHe && word.textHe.trim() !== '' && 
                   word.textEn && word.textEn.trim() !== '';
          case 'listenEnToTextHe':
            // Need both English (for audio) and Hebrew (for word bank)
            return word.textEn && word.textEn.trim() !== '' && 
                   word.textHe && word.textHe.trim() !== '';
          default:
            // For unknown exercise types, require both fields
            return word.textEn && word.textEn.trim() !== '' && 
                   word.textHe && word.textHe.trim() !== '';
        }
      });
    }

    // Shuffle and take only the needed count
    const shuffled = filteredWords.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Failed to fetch distractor words:', error);
    throw error;
  }
}

// Shuffle array helper
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Prepare exercise data with words
export async function prepareExerciseData(exercise: Exercise) {
  try {
    // Fetch solution words
    const solutionWords = await fetchWordsByIds(exercise.solutionWordIds);
    
    // Fetch distractor words (same amount as solution words, filtered by exercise type)
    const distractorWords = await fetchDistractorWords(
      solutionWords, 
      solutionWords.length, 
      exercise.exerciseType
    );
    
    console.log(`📝 Exercise ${exercise.exerciseType}: Got ${solutionWords.length} solution words, ${distractorWords.length} distractor words`);
    
    return {
      exercise,
      solutionWords,
      distractorWords
    };
  } catch (error) {
    console.error('Failed to prepare exercise data:', error);
    throw error;
  }
}