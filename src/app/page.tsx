"use client";

import {
  Screen,
  Container,
  Card,
  Text,
  Button,
  Avatar,
  ThemeToggle,
} from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";
import Link from "next/link";
import { useSpeak } from "@/lib/voice";

export default function Home() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const speakEnglish = useSpeak();

  // Mock user data - replace with real data later
  const letterProgress = 0; // 0% - starting fresh
  const wordsLearned = 0;
  const totalXP = 0;

  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Text variant="h1" className="mb-2">
              Learning Dashboard
            </Text>
            <Text variant="body" color="secondary">
              Keep up the great work! 🎉
            </Text>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Avatar src="" alt="User" size="md" />
          </div>
        </div>

        {/* Learning Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Letters Progress */}
          <Link href="/letters">
            <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Text variant="h3" className="text-blue-400 mb-2">
                  📖 Letters
                </Text>
                <Text variant="small" color="muted">
                  Letter sounds learned
                </Text>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${letterProgress}%` }}
                ></div>
              </div>

              <Text variant="h2" className="text-blue-400 mb-1">
                {letterProgress}%
              </Text>
              <Text variant="caption" color="muted">
                0 of 26 letters mastered
              </Text>
            </Card>
          </Link>

          {/* Words Learned */}
          <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <Text variant="h3" className="text-green-400 mb-2">
                📝 Words
              </Text>
              <Text variant="small" color="muted">
                Words in your vocabulary
              </Text>
            </div>

            <Text variant="h2" className="text-green-400 mb-1">
              {wordsLearned}
            </Text>
            <Text variant="caption" color="muted">
              Ready to start learning!
            </Text>
          </Card>

          {/* Total XP */}
          <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <Text variant="h3" className="text-purple-400 mb-2">
                ⭐ Total XP
              </Text>
              <Text variant="small" color="muted">
                Experience points earned
              </Text>
            </div>

            <Text variant="h2" className="text-purple-400 mb-1">
              {totalXP.toLocaleString()}
            </Text>
            <Text variant="caption" color="muted">
              Level 1 - Let's begin!
            </Text>
          </Card>
        </div>

        {/* Games Section */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <Text variant="h3">🎮 Games & Activities</Text>
            <Button variant="secondary" className="text-sm">
              View All Games
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Word Bank Game */}
            <div
              className={`p-4 ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-50"
              } rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="text-center">
                <Text variant="h3" className="text-blue-400 mb-2">
                  🏦
                </Text>
                <Text variant="small" className="mb-2">
                  Word Bank
                </Text>
                <Text variant="h3" className="text-blue-400 mb-1">
                  1,240
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
            </div>

            {/* Fill in the Blank */}
            <div
              className={`p-4 ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-50"
              } rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="text-center">
                <Text variant="h3" className="text-green-400 mb-2">
                  📝
                </Text>
                <Text variant="small" className="mb-2">
                  Fill Blanks
                </Text>
                <Text variant="h3" className="text-green-400 mb-1">
                  890
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
            </div>

            {/* Match Words */}
            <div
              className={`p-4 ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-50"
              } rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="text-center">
                <Text variant="h3" className="text-purple-400 mb-2">
                  🔗
                </Text>
                <Text variant="small" className="mb-2">
                  Match Words
                </Text>
                <Text variant="h3" className="text-purple-400 mb-1">
                  675
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
            </div>

            {/* Scrabble */}
            <div
              className={`p-4 ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-50"
              } rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="text-center">
                <Text variant="h3" className="text-orange-400 mb-2">
                  🔤
                </Text>
                <Text variant="small" className="mb-2">
                  Scrabble
                </Text>
                <Text variant="h3" className="text-orange-400 mb-1">
                  1,567
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <Text variant="h3" className="mb-4">
              🎯 Start Learning
            </Text>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body" className="mb-2">
                  Begin with vowel sounds (A, E, I, O, U)
                </Text>
                <Text variant="caption" color="muted">
                  20 exercises • 10-15 minutes
                </Text>
              </div>
              <Link href="/lesson">
                <Button variant="primary">Start Lesson</Button>
              </Link>
            </div>
          </Card>

          <Card>
            <Text variant="h3" className="mb-4">
              🏆 Recent Achievements
            </Text>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <Text variant="small">Letter Master</Text>
                  <Text variant="caption" color="muted">
                    Learned all vowel sounds
                  </Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <Text variant="small">Speed Reader</Text>
                  <Text variant="caption" color="muted">
                    Read 20 words in 60 seconds
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Screen>
  );
}
