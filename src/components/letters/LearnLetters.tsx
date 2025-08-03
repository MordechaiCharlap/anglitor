"use client";

import { Container, Text, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";

export function LearnLetters() {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-b`}>
      <Container className="py-6">
        <div className="text-center">
          <Text variant="h1" className="mb-2">
            Let&apos;s learn English! 📚
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
  );
}