"use client";

import {
  Screen,
  Container,
  Text,
} from "@/components";
import { LanguageRoad } from "@/components/home";

export default function Home() {
  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Text variant="h1" className="mb-2">
            🏠 Your Learning Journey
          </Text>
          <Text variant="body" color="secondary">
            Follow the path to English mastery
          </Text>
        </div>

        {/* Language Road Widget - Full Layout */}
        <div className="w-full max-w-4xl mx-auto">
          <LanguageRoad isCompact={false} />
        </div>
      </Container>
    </Screen>
  );
}
