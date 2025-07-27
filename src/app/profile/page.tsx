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

export default function ProfilePage() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  // Mock user data - replace with real data later
  const wordsLearned = 0;
  const totalXP = 0;
  const englishLevel = 0;
  const streak = 0;
  const lessonsCompleted = 0;

  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Text variant="h1" className="mb-2">
              👤 Profile
            </Text>
            <ThemeToggle />
          </div>
          <Text variant="body" color="secondary">
            Track your learning progress and achievements
          </Text>
        </div>

        {/* Profile Info */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">
            <Avatar src="" alt="User" size="lg" />
            <div className="text-center md:text-left">
              <Text variant="h2" className="mb-2">
                English Learner
              </Text>
              <Text variant="body" color="secondary" className="mb-4">
                Learning English • Started today
              </Text>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Edit Profile</Button>
                <Button variant="secondary">Settings</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total XP */}
          <Card className="text-center">
            <div className="p-6">
              <Text variant="h3" className="text-purple-400 mb-2">
                ⭐ Total XP
              </Text>
              <Text variant="h1" className="text-purple-400 mb-2">
                {totalXP.toLocaleString()}
              </Text>
              <Text variant="caption" color="muted">
                Experience Points
              </Text>
            </div>
          </Card>

          {/* Words Learned */}
          <Card className="text-center">
            <div className="p-6">
              <Text variant="h3" className="text-green-400 mb-2">
                📝 Words Learned
              </Text>
              <Text variant="h1" className="text-green-400 mb-2">
                {wordsLearned}
              </Text>
              <Text variant="caption" color="muted">
                Vocabulary Size
              </Text>
            </div>
          </Card>

          {/* Current Streak */}
          <Card className="text-center">
            <div className="p-6">
              <Text variant="h3" className="text-orange-400 mb-2">
                🔥 Current Streak
              </Text>
              <Text variant="h1" className="text-orange-400 mb-2">
                {streak}
              </Text>
              <Text variant="caption" color="muted">
                Days in a row
              </Text>
            </div>
          </Card>

          {/* English Level */}
          <Card className="text-center">
            <div className="p-6">
              <Text variant="h3" className="text-yellow-400 mb-2">
                🇺🇸 English Level
              </Text>
              <Text variant="h1" className="text-yellow-400 mb-2">
                {englishLevel}
              </Text>
              <Text variant="caption" color="muted">
                Current Level
              </Text>
            </div>
          </Card>

          {/* Lessons Completed */}
          <Card className="text-center">
            <div className="p-6">
              <Text variant="h3" className="text-blue-400 mb-2">
                📚 Lessons Done
              </Text>
              <Text variant="h1" className="text-blue-400 mb-2">
                {lessonsCompleted}
              </Text>
              <Text variant="caption" color="muted">
                Completed Lessons
              </Text>
            </div>
          </Card>

          {/* Games Played */}
          <Card className="text-center">
            <div className="p-6">
              <Text variant="h3" className="text-pink-400 mb-2">
                🎮 Games Played
              </Text>
              <Text variant="h1" className="text-pink-400 mb-2">
                0
              </Text>
              <Text variant="caption" color="muted">
                Total Games
              </Text>
            </div>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="mb-8">
          <div className="p-6">
            <Text variant="h2" className="mb-6">
              🏆 Achievements
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Achievement */}
              <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="text-4xl">🎉</div>
                <div>
                  <Text variant="h3" className="mb-1">
                    Welcome Aboard!
                  </Text>
                  <Text variant="body" color="secondary">
                    Started your English learning journey
                  </Text>
                  <Text variant="caption" color="muted">
                    Earned today
                  </Text>
                </div>
              </div>

              {/* Locked Achievement */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-60">
                <div className="text-4xl">🔒</div>
                <div>
                  <Text variant="h3" className="mb-1">
                    Letter Master
                  </Text>
                  <Text variant="body" color="secondary">
                    Learn all vowel sounds (A, E, I, O, U)
                  </Text>
                  <Text variant="caption" color="muted">
                    Progress: 0/5
                  </Text>
                </div>
              </div>

              {/* Locked Achievement */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-60">
                <div className="text-4xl">🔒</div>
                <div>
                  <Text variant="h3" className="mb-1">
                    Speed Reader
                  </Text>
                  <Text variant="body" color="secondary">
                    Read 20 words in under 60 seconds
                  </Text>
                  <Text variant="caption" color="muted">
                    Best time: --
                  </Text>
                </div>
              </div>

              {/* Locked Achievement */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-60">
                <div className="text-4xl">🔒</div>
                <div>
                  <Text variant="h3" className="mb-1">
                    Word Champion
                  </Text>
                  <Text variant="body" color="secondary">
                    Learn your first 100 words
                  </Text>
                  <Text variant="caption" color="muted">
                    Progress: 0/100
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Progress */}
        <Card>
          <div className="p-6">
            <Text variant="h2" className="mb-6">
              📈 Learning Progress
            </Text>
            <div className="space-y-6">
              {/* Letters Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text variant="body">Letter Recognition</Text>
                  <Text variant="caption" color="muted">0%</Text>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              {/* Words Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text variant="body">Vocabulary Building</Text>
                  <Text variant="caption" color="muted">0%</Text>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              {/* Pronunciation Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text variant="body">Pronunciation</Text>
                  <Text variant="caption" color="muted">0%</Text>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Screen>
  );
}