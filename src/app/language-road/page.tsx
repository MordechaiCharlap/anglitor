"use client";

import { Screen, Container, Text, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";

export default function LanguageRoadPage() {
  const { theme } = useTheme();

  // Mock data for units and lessons - more playful!
  const units = [
    {
      id: "basic",
      name: "Basic Adventure",
      emoji: "🌟",
      color: "rainbow",
      bgGradient: "from-pink-400 via-purple-500 to-indigo-500",
      description: "Start your English journey here!",
      steps: [
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
      steps: [
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
      steps: [
        { id: 1, name: "School Stuff", completedLessons: 0, emoji: "📚" },
        { id: 2, name: "Cool Units", completedLessons: 0, emoji: "🧪" },
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

  const StepCircle = ({ 
    completedLessons, 
    color, 
    emoji, 
    isActive = true 
  }: { 
    completedLessons: number; 
    color: string; 
    emoji: string;
    isActive?: boolean;
  }) => {
    const colorClasses = getColorClasses(color);
    const progress = (completedLessons / 4) * 100;
    const isCompleted = completedLessons === 4;
    
    return (
      <div className={`relative w-20 h-20 mx-auto transform transition-all duration-300 hover:scale-110 ${isActive ? 'cursor-pointer' : 'opacity-50'}`}>
        {/* Outer glow effect */}
        <div className={`absolute inset-0 w-20 h-20 rounded-full ${isCompleted ? colorClasses.bg : ''} opacity-20 blur-md`}></div>
        
        {/* Main circle */}
        <div className={`relative w-20 h-20 rounded-full border-4 ${
          isCompleted 
            ? `${colorClasses.border} bg-gradient-to-br ${colorClasses.bg.replace('bg-gradient-to-r', '')} shadow-lg ${colorClasses.shadow}`
            : theme === "dark" ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"
        } flex items-center justify-center transition-all duration-300`}>
          
          {/* Progress ring */}
          {!isCompleted && progress > 0 && (
            <svg className="absolute inset-0 w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${progress * 2.26} 226`}
                className={colorClasses.text}
                strokeLinecap="round"
              />
            </svg>
          )}
          
          {/* Center content */}
          <div className="text-center z-10">
            {isCompleted ? (
              <div className="text-2xl animate-bounce">⭐</div>
            ) : (
              <div>
                <div className="text-lg mb-1">{emoji}</div>
                <div className={`text-xs font-bold ${colorClasses.text}`}>
                  {completedLessons}/4
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sparkle effects for completed lessons */}
        {isCompleted && (
          <>
            <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse">✨</div>
            <div className="absolute -bottom-2 -left-2 text-yellow-400 animate-pulse delay-300">✨</div>
          </>
        )}
      </div>
    );
  };

  return (
    <Screen>
      <Container className="py-8 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="secondary">← Back</Button>
            </Link>
            <div className="text-2xl">🎮</div>
          </div>
          <Text variant="h1" className="mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            🌈 Language Adventure
          </Text>
          <Text variant="body" color="secondary">
            Your epic English learning journey awaits!
          </Text>
        </div>

        {/* Vertical Road */}
        <div className="relative">
          {/* Main road line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} rounded-full`}></div>
          
          {/* Units - Vertical Layout */}
          <div className="space-y-16">
            {units.map((unit, unitIndex) => {
              const colorClasses = getColorClasses(unit.color);
              
              return (
                <div key={unit.id} className="relative">
                  {/* Unit Header Card */}
                  <div className="relative z-10 mb-8">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${unit.bgGradient} shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                      <div className="text-center text-white">
                        <div className="text-5xl mb-3 animate-bounce">{unit.emoji}</div>
                        <Text variant="h2" className="mb-2 text-white font-bold">
                          {unit.name}
                        </Text>
                        <Text variant="body" className="text-white/90">
                          {unit.description}
                        </Text>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <div className="text-sm font-semibold">0 / 20 lessons</div>
                          <div className="text-xl">🏆</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lesson Groups - Vertical Path */}
                  <div className="space-y-12 ml-4">
                    {unit.steps.map((step, index) => {
                      const isLastInUnit = index === unit.steps.length - 1;
                      const isLastUnit = unitIndex === units.length - 1;
                      
                      return (
                        <div key={step.id} className="relative flex items-center">
                          {/* Connecting line to next lesson */}
                          {!isLastInUnit && (
                            <div className={`absolute left-10 top-20 w-0.5 h-12 ${theme === "dark" ? "bg-gray-600" : "bg-gray-400"} z-0`}></div>
                          )}
                          
                          {/* Step Circle */}
                          <StepCircle 
                            completedLessons={step.completedLessons} 
                            color={unit.color}
                            emoji={step.emoji}
                          />
                          
                          {/* Lesson Info */}
                          <div className="ml-6 flex-1">
                            <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                              <Text variant="body" className="font-semibold mb-1">
                                {step.name}
                              </Text>
                              <div className="flex items-center gap-2">
                                <div className={`w-full h-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}>
                                  <div 
                                    className={`h-2 ${colorClasses.bg} rounded-full transition-all duration-500`}
                                    style={{ width: `${(step.completedLessons / 4) * 100}%` }}
                                  ></div>
                                </div>
                                <Text variant="caption" color="muted" className="text-xs">
                                  {step.completedLessons}/4
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Connecting line to next unit */}
                  {unitIndex < units.length - 1 && (
                    <div className={`absolute left-10 -bottom-8 w-0.5 h-16 ${theme === "dark" ? "bg-gray-600" : "bg-gray-400"} z-0`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fun Bottom Section */}
        <div className="mt-16 text-center">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
            <div className="text-4xl mb-3 animate-pulse">🎯</div>
            <Text variant="h3" className="text-white font-bold mb-2">
              Ready to Start?
            </Text>
            <Text variant="body" className="text-white/90">
              Tap any lesson to begin your adventure!
            </Text>
          </div>
        </div>
      </Container>
    </Screen>
  );
}