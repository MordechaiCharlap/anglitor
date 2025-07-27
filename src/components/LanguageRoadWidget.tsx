"use client";

import { Card, Text } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useState } from "react";

interface LanguageRoadWidgetProps {
  isCompact?: boolean;
}

export default function LanguageRoadWidget({ isCompact = false }: LanguageRoadWidgetProps) {
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
      ]
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
      ]
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
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "rainbow":
        return {
          text: "text-pink-400",
          bg: "bg-gradient-to-r from-pink-500 to-purple-600",
          border: "border-pink-400",
          shadow: "shadow-pink-500/25"
        };
      case "ocean":
        return {
          text: "text-cyan-400",
          bg: "bg-gradient-to-r from-cyan-500 to-blue-600",
          border: "border-cyan-400",
          shadow: "shadow-cyan-500/25"
        };
      case "forest":
        return {
          text: "text-emerald-400",
          bg: "bg-gradient-to-r from-emerald-500 to-green-600",
          border: "border-emerald-400",
          shadow: "shadow-emerald-500/25"
        };
      default:
        return {
          text: "text-gray-400",
          bg: "bg-gray-500",
          border: "border-gray-400",
          shadow: "shadow-gray-500/25"
        };
    }
  };

  const LessonGroupCircle = ({ 
    completedLessons, 
    color, 
    emoji, 
    size = "normal",
    lessonName,
    onClick
  }: { 
    completedLessons: number; 
    color: string; 
    emoji: string;
    size?: "small" | "normal";
    lessonName: string;
    onClick: (event: React.MouseEvent) => void;
  }) => {
    const colorClasses = getColorClasses(color);
    const progress = (completedLessons / 4) * 100;
    const isCompleted = completedLessons === 4;
    const circleSize = size === "small" ? "w-12 h-12" : "w-16 h-16";
    const emojiSize = size === "small" ? "text-sm" : "text-lg";
    const progressRadius = size === "small" ? "24" : "32";
    const progressCircumference = size === "small" ? "151" : "201";
    
    return (
      <div 
        className={`relative ${circleSize} mx-auto transform transition-all duration-300 hover:scale-110 cursor-pointer`}
        onClick={onClick}
      >
        {/* Outer glow effect */}
        <div className={`absolute inset-0 ${circleSize} rounded-full ${isCompleted ? colorClasses.bg : ''} opacity-20 blur-md`}></div>
        
        {/* Main circle */}
        <div className={`relative ${circleSize} rounded-full border-2 ${
          isCompleted 
            ? `${colorClasses.border} bg-gradient-to-br ${colorClasses.bg.replace('bg-gradient-to-r', '')} shadow-lg ${colorClasses.shadow}`
            : theme === "dark" ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"
        } flex items-center justify-center transition-all duration-300`}>
          
          {/* Progress ring */}
          {!isCompleted && progress > 0 && (
            <svg className={`absolute inset-0 ${circleSize} transform -rotate-90`} viewBox={`0 0 ${size === "small" ? "48" : "64"} ${size === "small" ? "48" : "64"}`}>
              <circle
                cx={size === "small" ? "24" : "32"}
                cy={size === "small" ? "24" : "32"}
                r={progressRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${progress * (parseFloat(progressCircumference) / 100)} ${progressCircumference}`}
                className={colorClasses.text}
                strokeLinecap="round"
              />
            </svg>
          )}
          
          {/* Center content */}
          <div className="text-center z-10">
            {isCompleted ? (
              <div className={`${size === "small" ? "text-lg" : "text-xl"} animate-bounce`}>⭐</div>
            ) : (
              <div>
                <div className={`${emojiSize} mb-1`}>{emoji}</div>
                {!isCompact && (
                  <div className={`text-xs font-bold ${colorClasses.text}`}>
                    {completedLessons}/4
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Sparkle effects for completed lessons */}
        {isCompleted && (
          <>
            <div className="absolute -top-1 -right-1 text-yellow-400 animate-pulse text-sm">✨</div>
            <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-pulse delay-300 text-sm">✨</div>
          </>
        )}
      </div>
    );
  };

  if (isCompact) {
    // Compact version for mobile - card format
    return (
      <Link href="/language-road">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <div className="text-center p-4">
            <Text variant="h3" className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              🌈 Language Adventure
            </Text>
            <Text variant="small" color="muted" className="mb-4">
              Your epic English learning journey
            </Text>
            
            {/* Mini preview */}
            <div className="flex justify-center gap-2 mb-3">
              {subjects.slice(0, 3).map((subject) => (
                <div key={subject.id} className={`w-8 h-8 rounded-full bg-gradient-to-br ${subject.bgGradient} flex items-center justify-center text-white text-sm`}>
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
        <Text variant="h2" className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          🌈 Language Adventure
        </Text>
        <Text variant="small" color="secondary">
          Your learning journey
        </Text>
      </div>

      {/* Vertical Road - Compact */}
      <div className="relative">
        {/* Main road line */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} rounded-full`}></div>
        
        {/* Subjects - Compact Vertical Layout */}
        <div className="space-y-8">
          {subjects.map((subject, subjectIndex) => {
            const colorClasses = getColorClasses(subject.color);
            
            return (
              <div key={subject.id} className="relative">
                {/* Subject Header - Compact */}
                <div className="relative z-10 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${subject.bgGradient} shadow-lg transform hover:scale-105 transition-all duration-300`}>
                    <div className="text-center text-white">
                      <div className="text-2xl mb-1">{subject.emoji}</div>
                      <Text variant="small" className="text-white font-bold">
                        {subject.name}
                      </Text>
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <div className="text-xs">0/20</div>
                        <div className="text-sm">🏆</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Groups - Circles Only */}
                <div className="space-y-6 ml-2">
                  {subject.lessonGroups.map((lessonGroup, index) => {
                    const isLastInSubject = index === subject.lessonGroups.length - 1;
                    
                    return (
                      <div key={lessonGroup.id} className="relative flex justify-center">
                        {/* Connecting line to next lesson */}
                        {!isLastInSubject && (
                          <div className={`absolute left-1/2 transform -translate-x-1/2 top-12 w-0.5 h-6 ${theme === "dark" ? "bg-gray-600" : "bg-gray-400"} z-0`}></div>
                        )}
                        
                        {/* Lesson Circle - Small */}
                        <LessonGroupCircle 
                          completedLessons={lessonGroup.completedLessons} 
                          color={subject.color}
                          emoji={lessonGroup.emoji}
                          size="small"
                          lessonName={lessonGroup.name}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setSelectedLesson({
                              name: lessonGroup.name,
                              emoji: lessonGroup.emoji,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Connecting line to next subject */}
                {subjectIndex < subjects.length - 1 && (
                  <div className={`absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-0.5 h-8 ${theme === "dark" ? "bg-gray-600" : "bg-gray-400"} z-0`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action */}
      <Link href="/language-road">
        <div className="mt-8 p-3 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-center cursor-pointer hover:scale-105 transition-transform">
          <div className="text-2xl mb-1">🎯</div>
          <Text variant="small" className="text-white font-bold">
            View Full Road
          </Text>
        </div>
      </Link>

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
              top: selectedLesson.y 
            }}
          >
            <div className={`px-4 py-2 rounded-2xl ${theme === "dark" ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"} border-2 shadow-2xl backdrop-blur-sm`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedLesson.emoji}</span>
                <Text variant="small" className="font-semibold whitespace-nowrap">
                  {selectedLesson.name}
                </Text>
              </div>
              
              {/* Arrow pointing down */}
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${theme === "dark" ? "border-t-gray-800" : "border-t-white"}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}