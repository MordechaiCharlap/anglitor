"use client";

import { Screen, Container, Card, Text, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { speakEnglish } from "@/lib/voice";
import { themes } from "@/styles/theme";
import Link from "next/link";

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
      {/* Desktop Layout - Non-scrollable */}
      <div className="hidden lg:flex lg:flex-col lg:h-screen">
        {/* Desktop Header */}
        <div className={`${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-b`}>
          <Container className="py-6">
            <div className="text-center">
              <Text variant="h1" className="mb-2">
                Let's learn English! 📚
              </Text>
              <Text variant="body" color="secondary" className="mb-4">
                Get to know the English writing system
              </Text>
              <Link href="/lesson">
                <Button variant="primary" className="px-6 py-2">
                  LEARN THE LETTERS
                </Button>
              </Link>
            </div>
          </Container>
        </div>

        {/* Desktop Content - Fits in remaining space */}
        <Container className="flex-1 flex flex-col justify-center max-w-full px-6 py-8">
          {/* Alphabet Section */}
          <div className="mb-6">
            <div className="grid grid-cols-10 xl:grid-cols-13 gap-3">
              {Object.entries(letterProgress).map(([letter, progress]) => (
                <div
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className="cursor-pointer"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 aspect-square flex items-center justify-center">
                    <div className="w-full px-1">
                      {/* Letter Display */}
                      <div className="flex flex-row justify-center gap-0.5 mb-1">
                        <Text variant="h2" className="text-3xl lg:text-4xl font-bold">
                          {letter}
                        </Text>
                        <Text variant="h2" className="text-3xl lg:text-4xl font-bold">
                          {letter.toLowerCase()}
                        </Text>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        } rounded-full h-1 mb-1`}
                      >
                        <div
                          className={`${getProgressColor(
                            progress
                          )} h-1 rounded-full transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {/* Progress Percentage */}
                      <Text
                        variant="caption"
                        className={`text-xs ${getProgressTextColor(progress)}`}
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
            <Text variant="h3" className="mb-4 text-center">
              Special Characters
            </Text>
            <div className="grid grid-cols-8 lg:grid-cols-10 xl:grid-cols-13 gap-3">
              {specialCombinations.map(({ combo, progress, sound }) => (
                <div
                  key={combo}
                  onClick={() => handleSpecialComboClick(combo, sound)}
                  className="cursor-pointer"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 aspect-square flex items-center justify-center">
                    <div className="w-full px-1">
                      {/* Combination Display - Same as letter cards */}
                      <div className="flex flex-row justify-center gap-0.5 mb-1">
                        <Text variant="h2" className="text-3xl lg:text-4xl font-bold">
                          {combo}
                        </Text>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        } rounded-full h-1 mb-1`}
                      >
                        <div
                          className={`${getProgressColor(
                            progress
                          )} h-1 rounded-full transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {/* Progress Percentage */}
                      <Text
                        variant="caption"
                        className={`text-xs ${getProgressTextColor(progress)}`}
                      >
                        {progress}%
                      </Text>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Layout - Scrollable with sticky button */}
      <div className="lg:hidden">
        {/* Mobile Header - Scrolls away */}
        <div className={`${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-b`}>
          <Container className="py-6">
            <div className="text-center">
              <Text variant="h1" className="mb-2">
                Let's learn English! 📚
              </Text>
              <Text variant="body" color="secondary" className="mb-4">
                Get to know the English writing system
              </Text>
            </div>
          </Container>
        </div>

        {/* Sticky Button */}
        <div className={`sticky top-0 z-30 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-b`}>
          <Container className="py-3">
            <div className="text-center">
              <Link href="/lesson">
                <Button variant="primary" className="px-6 py-2">
                  LEARN THE LETTERS
                </Button>
              </Link>
            </div>
          </Container>
        </div>

        {/* Mobile Content - Scrollable */}
        <Container className="max-w-full px-2 sm:px-4 md:px-6 pb-8 pt-4">
          {/* Alphabet Section */}
          <div className="mb-8">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4">
              {Object.entries(letterProgress).map(([letter, progress]) => (
                <div
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className="cursor-pointer"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 aspect-square flex items-center justify-center">
                    <div className="w-full px-1">
                      {/* Letter Display */}
                      <div className="flex flex-row justify-center gap-0.5 mb-1">
                        <Text variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold">
                          {letter}
                        </Text>
                        <Text variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold">
                          {letter.toLowerCase()}
                        </Text>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        } rounded-full h-1 mb-1`}
                      >
                        <div
                          className={`${getProgressColor(
                            progress
                          )} h-1 rounded-full transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {/* Progress Percentage */}
                      <Text
                        variant="caption"
                        className={`text-xs ${getProgressTextColor(progress)}`}
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
          <div className="mb-8">
            <Text variant="h3" className="mb-4 text-center">
              Special Characters
            </Text>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4">
              {specialCombinations.map(({ combo, progress, sound }) => (
                <div
                  key={combo}
                  onClick={() => handleSpecialComboClick(combo, sound)}
                  className="cursor-pointer"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 aspect-square flex items-center justify-center">
                    <div className="w-full px-1">
                      {/* Combination Display - Same as letter cards */}
                      <div className="flex flex-row justify-center gap-0.5 mb-1">
                        <Text variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold">
                          {combo}
                        </Text>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        } rounded-full h-1 mb-1`}
                      >
                        <div
                          className={`${getProgressColor(
                            progress
                          )} h-1 rounded-full transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {/* Progress Percentage */}
                      <Text
                        variant="caption"
                        className={`text-xs ${getProgressTextColor(progress)}`}
                      >
                        {progress}%
                      </Text>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Screen>
  );
}
