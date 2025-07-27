"use client";

import { Card, Text } from "@/components";
import { Subject } from "./Subject";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useState } from "react";

interface LanguageRoadProps {
  isCompact?: boolean;
}

export function LanguageRoad({ isCompact = false }: LanguageRoadProps) {
  const { theme } = useTheme();
  const [selectedLesson, setSelectedLesson] = useState<{
    name: string;
    emoji: string;
    x: number;
    y: number;
  } | null>(null);

  // Mock data for subjects and lessons
  const subjects = [
    {
      id: "basic",
      name: "Basic Adventure",
      emoji: "🌟",
      color: "rainbow",
      bgGradient: "from-pink-400 via-purple-500 to-indigo-500",
      description: "Start your English journey here!",
      lessonGroups: [
        { id: 1, name: "Hello World!", completedLessons: 0, emoji: "👋" },
        { id: 2, name: "My Family", completedLessons: 0, emoji: "👨‍👩‍👧‍👦" },
        { id: 3, name: "Count & Time", completedLessons: 0, emoji: "🕐" },
        { id: 4, name: "Rainbow Colors", completedLessons: 0, emoji: "🌈" },
        { id: 5, name: "Daily Fun", completedLessons: 0, emoji: "🎯" },
        { id: 6, name: "Basic Complete", completedLessons: 0, emoji: "🏆" },
      ],
    },
    {
      id: "travel",
      name: "Travel Quest",
      emoji: "🗺️",
      color: "ocean",
      bgGradient: "from-cyan-400 via-blue-500 to-purple-600",
      description: "Explore the world with English!",
      lessonGroups: [
        { id: 1, name: "Sky High", completedLessons: 0, emoji: "✈️" },
        { id: 2, name: "Cozy Stay", completedLessons: 0, emoji: "🏨" },
        { id: 3, name: "Yummy Food", completedLessons: 0, emoji: "🍕" },
        { id: 4, name: "Find Your Way", completedLessons: 0, emoji: "🧭" },
        { id: 5, name: "Shopping Spree", completedLessons: 0, emoji: "🛍️" },
        { id: 6, name: "Travel Master", completedLessons: 0, emoji: "🌍" },
      ],
    },
    {
      id: "school",
      name: "School Heroes",
      emoji: "🎓",
      color: "forest",
      bgGradient: "from-green-400 via-emerald-500 to-teal-600",
      description: "Become a classroom champion!",
      lessonGroups: [
        { id: 1, name: "School Stuff", completedLessons: 0, emoji: "📚" },
        { id: 2, name: "Cool Subjects", completedLessons: 0, emoji: "🧪" },
        { id: 3, name: "Team Players", completedLessons: 0, emoji: "👥" },
        { id: 4, name: "Test Power", completedLessons: 0, emoji: "📝" },
        { id: 5, name: "Fun Events", completedLessons: 0, emoji: "🎉" },
        { id: 6, name: "School Legend", completedLessons: 0, emoji: "🎓" },
      ],
    },
  ];

  const handleLessonClick = (event: React.MouseEvent, lessonGroup: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedLesson({
      name: lessonGroup.name,
      emoji: lessonGroup.emoji,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  if (isCompact) {
    // Compact version for mobile - card format
    return (
      <Link href="/language-road">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <div className="text-center p-4">
            <Text
              variant="h3"
              className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
            >
              🌈 Language Adventure
            </Text>
            <Text variant="small" color="muted" className="mb-4">
              Your epic English learning journey
            </Text>

            {/* Mini preview */}
            <div className="flex justify-center gap-2 mb-3">
              {subjects.slice(0, 3).map((subject) => (
                <div
                  key={subject.id}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${subject.bgGradient} flex items-center justify-center text-white text-sm`}
                >
                  {subject.emoji}
                </div>
              ))}
            </div>

            <Text variant="caption" color="muted">
              Tap to start your adventure! →
            </Text>
          </div>
        </Card>
      </Link>
    );
  }

  // Full version for desktop sidebar
  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <Text
          variant="h2"
          className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          🌈 Language Adventure
        </Text>
        <Text variant="small" color="secondary">
          Your learning journey
        </Text>
      </div>

      {/* Vertical Road - Compact */}
      <div className="relative">
        {/* Subjects - Compact Vertical Layout */}
        <div className="space-y-32">
          {subjects.map((subject, subjectIndex) => (
            <Subject
              key={subject.id}
              subject={subject}
              subjectIndex={subjectIndex}
              totalSubjects={subjects.length}
              onLessonClick={handleLessonClick}
              isCompact={isCompact}
            />
          ))}
        </div>
      </div>
      {/* Lesson Popup */}
      {selectedLesson && (
        <>
          {/* Backdrop to close popup */}
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setSelectedLesson(null)}
          />

          {/* Popup */}
          <div
            className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: selectedLesson.x,
              top: selectedLesson.y,
            }}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              } border-2 shadow-2xl backdrop-blur-sm`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedLesson.emoji}</span>
                <Text
                  variant="small"
                  className="font-semibold whitespace-nowrap"
                >
                  {selectedLesson.name}
                </Text>
              </div>

              {/* Arrow pointing down */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${
                  theme === "dark" ? "border-t-gray-800" : "border-t-white"
                }`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
