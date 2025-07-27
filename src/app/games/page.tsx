"use client";

import {
  Screen,
  Container,
  Card,
  Text,
  Button,
} from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";
import Link from "next/link";

export default function GamesPage() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            🎮 Games & Activities
          </Text>
          <Text variant="body" color="secondary">
            Practice English through fun and engaging games
          </Text>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Word Bank Game */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-blue-400 mb-4 text-5xl">
                🏦
              </Text>
              <Text variant="h3" className="mb-2">
                Word Bank
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Organize words into categories and build your vocabulary
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-blue-400 mb-1">
                  1,240
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Fill in the Blank */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-green-400 mb-4 text-5xl">
                📝
              </Text>
              <Text variant="h3" className="mb-2">
                Fill in the Blanks
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Complete sentences with the correct missing words
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-green-400 mb-1">
                  890
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Match Words */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-purple-400 mb-4 text-5xl">
                🔗
              </Text>
              <Text variant="h3" className="mb-2">
                Match Words
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Connect English words with their Hebrew translations
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-purple-400 mb-1">
                  675
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Scrabble */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-orange-400 mb-4 text-5xl">
                🔤
              </Text>
              <Text variant="h3" className="mb-2">
                Word Builder
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Build words using available letters and score points
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-orange-400 mb-1">
                  1,567
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Memory Match */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-pink-400 mb-4 text-5xl">
                🧠
              </Text>
              <Text variant="h3" className="mb-2">
                Memory Match
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Match pairs of words and improve your memory
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-pink-400 mb-1">
                  425
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Speed Reading */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-red-400 mb-4 text-5xl">
                ⚡
              </Text>
              <Text variant="h3" className="mb-2">
                Speed Reading
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Read words as fast as you can and beat the clock
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-red-400 mb-1">
                  789
                </Text>
                <Text variant="caption" color="muted">
                  Best Score
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Pronunciation Challenge */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-center p-6">
              <Text variant="h2" className="text-cyan-400 mb-4 text-5xl">
                🎤
              </Text>
              <Text variant="h3" className="mb-2">
                Pronunciation
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                Practice pronouncing words and get instant feedback
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-cyan-400 mb-1">
                  92%
                </Text>
                <Text variant="caption" color="muted">
                  Best Accuracy
                </Text>
              </div>
              <Button variant="primary" className="w-full">
                Play Now
              </Button>
            </div>
          </Card>

          {/* Coming Soon */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 opacity-60">
            <div className="text-center p-6">
              <Text variant="h2" className="text-gray-400 mb-4 text-5xl">
                🚀
              </Text>
              <Text variant="h3" className="mb-2">
                More Games
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                More exciting games coming soon!
              </Text>
              <div className="mb-4">
                <Text variant="h3" className="text-gray-400 mb-1">
                  Coming Soon
                </Text>
                <Text variant="caption" color="muted">
                  Stay tuned
                </Text>
              </div>
              <Button variant="secondary" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </Card>
        </div>

        {/* Daily Challenge */}
        <Card className="mt-8">
          <div className="text-center py-8">
            <Text variant="h2" className="mb-4">
              🏆 Daily Challenge
            </Text>
            <Text variant="body" color="secondary" className="mb-6">
              Complete today's challenge to earn bonus XP and climb the leaderboard!
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary">Start Daily Challenge</Button>
              <Button variant="secondary">View Leaderboard</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Screen>
  );
}