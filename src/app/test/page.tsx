"use client";

import {
  Screen,
  Container,
  Text,
} from "@/components";

export default function TestPage() {
  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Text variant="h1" className="mb-2">
            🎮 Button Test Lab
          </Text>
          <Text variant="body" color="secondary">
            Testing gamified button styles for maximum addiction
          </Text>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* 1. Duolingo Style - Green Gradient with Bounce */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Duolingo Style</Text>
            <button className="
              bg-gradient-to-b from-green-400 to-green-600 
              hover:from-green-300 hover:to-green-500
              text-white font-bold py-4 px-8 rounded-2xl
              shadow-lg hover:shadow-2xl
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-200 ease-out
              border-b-4 border-green-700 hover:border-green-600
              active:translate-y-0 active:border-b-2
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 2. Candy Crush Style - Purple Gradient with Sparkle */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Candy Crush Style</Text>
            <button className="
              bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600
              hover:from-purple-300 hover:via-pink-300 hover:to-purple-500
              text-white font-bold py-4 px-8 rounded-full
              shadow-xl hover:shadow-2xl
              transform hover:scale-110 hover:rotate-1
              transition-all duration-300 ease-out
              border-4 border-white
              relative overflow-hidden
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white before:to-transparent 
              before:opacity-20 before:translate-x-[-100%] 
              hover:before:translate-x-[100%] before:transition-transform before:duration-700
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 3. Pokemon GO Style - Blue 3D Button */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Pokemon GO Style</Text>
            <button className="
              bg-gradient-to-b from-blue-400 to-blue-700
              hover:from-blue-300 hover:to-blue-600
              text-white font-bold py-4 px-8 rounded-xl
              shadow-[0_6px_0_0_#1e40af,0_8px_20px_rgba(0,0,0,0.3)]
              hover:shadow-[0_4px_0_0_#1e40af,0_6px_25px_rgba(0,0,0,0.4)]
              transform hover:translate-y-1
              transition-all duration-150 ease-out
              active:translate-y-2 active:shadow-[0_2px_0_0_#1e40af,0_4px_15px_rgba(0,0,0,0.2)]
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 4. Clash Royale Style - Orange Cartoon Button */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Clash Royale Style</Text>
            <button className="
              bg-gradient-to-b from-orange-300 to-orange-600
              hover:from-orange-200 hover:to-orange-500
              text-white font-black py-4 px-8 rounded-2xl
              shadow-[0_8px_0_0_#c2410c,0_12px_25px_rgba(0,0,0,0.4)]
              hover:shadow-[0_6px_0_0_#c2410c,0_10px_30px_rgba(0,0,0,0.5)]
              transform hover:translate-y-1 hover:scale-105
              transition-all duration-200 ease-out
              border-4 border-yellow-300
              active:translate-y-3 active:shadow-[0_3px_0_0_#c2410c,0_5px_15px_rgba(0,0,0,0.3)]
              text-lg tracking-wider
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 5. Minecraft Style - Pixelated Green */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Minecraft Style</Text>
            <button className="
              bg-gradient-to-b from-emerald-400 to-emerald-700
              hover:from-emerald-300 hover:to-emerald-600
              text-white font-bold py-4 px-8
              shadow-[4px_4px_0_0_#065f46,0_8px_20px_rgba(0,0,0,0.3)]
              hover:shadow-[2px_2px_0_0_#065f46,0_6px_25px_rgba(0,0,0,0.4)]
              transform hover:translate-x-1 hover:translate-y-1
              transition-all duration-100 ease-out
              border-2 border-emerald-800
              font-mono text-sm tracking-wider
              active:translate-x-2 active:translate-y-2 active:shadow-none
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 6. Among Us Style - Red Rounded Button */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Among Us Style</Text>
            <button className="
              bg-gradient-to-b from-red-400 to-red-700
              hover:from-red-300 hover:to-red-600
              text-white font-bold py-5 px-10 rounded-full
              shadow-lg hover:shadow-2xl
              transform hover:scale-110 hover:rotate-2
              transition-all duration-250 ease-out
              border-4 border-red-900
              relative
              before:absolute before:inset-2 before:rounded-full 
              before:bg-gradient-to-b before:from-red-200 before:to-transparent 
              before:opacity-30
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 7. Subway Surfers Style - Rainbow Gradient */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Subway Surfers Style</Text>
            <button className="
              bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-green-400
              hover:from-pink-300 hover:via-purple-300 hover:via-blue-300 hover:to-green-300
              text-white font-black py-4 px-8 rounded-2xl
              shadow-xl hover:shadow-2xl
              transform hover:scale-105 hover:-translate-y-2
              transition-all duration-300 ease-out
              border-3 border-white
              animate-pulse hover:animate-none
              text-lg
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 8. Roblox Style - Bright Blue with Outline */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Roblox Style</Text>
            <button className="
              bg-gradient-to-b from-sky-400 to-sky-700
              hover:from-sky-300 hover:to-sky-600
              text-white font-bold py-4 px-8 rounded-lg
              shadow-[0_4px_0_0_#0369a1,0_8px_20px_rgba(0,0,0,0.3)]
              hover:shadow-[0_2px_0_0_#0369a1,0_6px_25px_rgba(0,0,0,0.4)]
              transform hover:translate-y-1
              transition-all duration-150 ease-out
              border-2 border-sky-800
              active:translate-y-2 active:shadow-[0_1px_0_0_#0369a1,0_4px_15px_rgba(0,0,0,0.2)]
              text-sm font-black tracking-wide
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 9. Fortnite Style - Neon Glow */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Fortnite Style</Text>
            <button className="
              bg-gradient-to-b from-cyan-400 to-blue-600
              hover:from-cyan-300 hover:to-blue-500
              text-white font-bold py-4 px-8 rounded-xl
              shadow-[0_0_20px_rgba(6,182,212,0.5),0_4px_0_0_#1e40af]
              hover:shadow-[0_0_30px_rgba(6,182,212,0.7),0_2px_0_0_#1e40af]
              transform hover:translate-y-1 hover:scale-105
              transition-all duration-200 ease-out
              border-2 border-cyan-300
              active:translate-y-2 active:shadow-[0_0_15px_rgba(6,182,212,0.4),0_1px_0_0_#1e40af]
              relative overflow-hidden
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white before:to-transparent 
              before:opacity-25 before:translate-x-[-100%] 
              hover:before:translate-x-[100%] before:transition-transform before:duration-500
            ">
              LEARN THE LETTERS
            </button>
          </div>

          {/* 10. Fall Guys Style - Pink Bouncy */}
          <div className="text-center">
            <Text variant="h3" className="mb-4">Fall Guys Style</Text>
            <button className="
              bg-gradient-to-b from-pink-300 to-pink-600
              hover:from-pink-200 hover:to-pink-500
              text-white font-black py-5 px-8 rounded-full
              shadow-lg hover:shadow-2xl
              transform hover:scale-125 
              transition-all duration-300 ease-out
              border-4 border-pink-800
              relative
              hover:animate-bounce
              text-lg tracking-wide
              before:absolute before:inset-1 before:rounded-full 
              before:bg-gradient-to-b before:from-pink-100 before:to-transparent 
              before:opacity-40
            ">
              LEARN THE LETTERS
            </button>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <Text variant="body" color="muted">
            Click any button to test the feel! 🎯
          </Text>
        </div>

      </Container>
    </Screen>
  );
}