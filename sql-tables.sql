CREATE TABLE "users" (
  "id" UUID REFERENCES auth.users PRIMARY KEY,
  "username" TEXT UNIQUE,
  "displayName" TEXT,
  "email" TEXT,
  "streakCount" INTEGER DEFAULT 0,
  "totalXp" INTEGER DEFAULT 0,
  "currentLevel" INTEGER DEFAULT 1,
  "currentLeagueId" INTEGER DEFAULT 1,
  "isPrivate" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);