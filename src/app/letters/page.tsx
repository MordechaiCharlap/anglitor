"use client";

import { Screen, Container, Card, Text, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { speakEnglish } from "@/lib/voice";
import { themes } from "@/styles/theme";

export default function LettersPage() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  // Mock progress data - replace with real data later
  const letterProgress = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    P: 0,
    Q: 0,
    R: 0,
    S: 0,
    T: 0,
    U: 0,
    V: 0,
    W: 0,
    X: 0,
    Y: 0,
    Z: 0,
  };

  const specialCombinations = [
    { combo: "SH", progress: 0, sound: "sh" },
    { combo: "CH", progress: 0, sound: "ch" },
    { combo: "TH", progress: 0, sound: "th" },
    { combo: "PH", progress: 0, sound: "f" },
    { combo: "GH", progress: 0, sound: "silent" },
    { combo: "CK", progress: 0, sound: "k" },
    { combo: "NG", progress: 0, sound: "ng" },
    { combo: "WH", progress: 0, sound: "w" },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    if (progress >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getProgressTextColor = (progress: number) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 60) return "text-yellow-400";
    if (progress >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const handleLetterClick = (letter: string) => {
    speakEnglish(letter);
  };

  const handleSpecialComboClick = (combo: string, sound: string) => {
    if (sound === "silent") {
      speakEnglish("silent");
    } else {
      speakEnglish(sound);
    }
  };

  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            📖 Letters & Sounds
          </Text>
          <Text variant="body" color="secondary">
            Master each letter sound to unlock word lessons
          </Text>
        </div>

        {/* Alphabet Section */}
        <div className="mb-12">
          <Text variant="h2" className="mb-6">
            English Alphabet
          </Text>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {Object.entries(letterProgress).map(([letter, progress]) => (
              <div
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className="cursor-pointer"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <div className="py-2">
                    {/* Letter Display */}
                    <div className="flex flex-row justify-center gap-0.5">
                      <Text variant="h1" className="mb-3 text-4xl font-bold">
                        {letter}
                      </Text>
                      <Text variant="h1" className="mb-3 text-4xl font-bold">
                        {letter.toLowerCase()}
                      </Text>
                    </div>

                    {/* Progress Bar */}
                    <div
                      className={`w-full ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-2 mb-2`}
                    >
                      <div
                        className={`${getProgressColor(
                          progress
                        )} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Progress Percentage */}
                    <Text
                      variant="caption"
                      className={getProgressTextColor(progress)}
                    >
                      {progress}%
                    </Text>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Special Combinations Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <Text variant="h2" className="mb-2">
                Special Letter Combinations
              </Text>
              <Text variant="body" color="secondary">
                Master these common English sound patterns
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialCombinations.map(({ combo, progress, sound }) => (
              <div
                key={combo}
                onClick={() => handleSpecialComboClick(combo, sound)}
                className="cursor-pointer"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <div className="py-4">
                    {/* Combination Display */}
                    <Text variant="h2" className="mb-2 text-3xl font-bold">
                      {combo}
                    </Text>

                    {/* Sound Description */}
                    <Text variant="small" color="muted" className="mb-4">
                      sounds like "{sound}"
                    </Text>

                    {/* Progress Bar */}
                    <div
                      className={`w-full ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-3 mb-3`}
                    >
                      <div
                        className={`${getProgressColor(
                          progress
                        )} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex items-center justify-between">
                      <Text
                        variant="caption"
                        className={getProgressTextColor(progress)}
                      >
                        {progress}%
                      </Text>
                      <Text variant="caption" color="muted">
                        {progress >= 80
                          ? "Mastered"
                          : progress >= 60
                          ? "Good"
                          : progress >= 40
                          ? "Learning"
                          : "Starting"}
                      </Text>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <Card className="mt-12">
          <div className="text-center py-6">
            <Text variant="h3" className="mb-4">
              🎯 Ready to Practice?
            </Text>
            <Text variant="body" color="secondary" className="mb-6">
              Choose letters you want to focus on and start practicing!
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary">Practice Weak Letters</Button>
              <Button variant="secondary">Review All Letters</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Screen>
  );
}
