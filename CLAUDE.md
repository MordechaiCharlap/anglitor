# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anglitor is a web application for Hebrew speakers to learn English, with authentication, user data, structured lessons, and gamification features (levels, XP, streaks, leagues).

## App Design Principles

The app should be seamless, addictive, animated as much as possible, and full of positive reinforcement to create an engaging learning experience.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start the development server (e.g., using Vite, Next.js, or similar)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Architecture

### Core Technologies

- **React** (with Vite or Next.js)
- **TypeScript** with strict mode enabled
- **Supabase** for backend services (authentication and database)
- **React Context** for state management

### Project Structure

**Authentication Flow:**

- `contexts/AuthContext.tsx` - Handles Supabase authentication state and methods
- `contexts/UserContext.tsx` - Manages user profile data from the database
- Authentication pages: `pages/signin.tsx`, `pages/register.tsx`, `pages/email-confirmation.tsx`

**Navigation:**

- **React Router** (or file-based routing with **Next.js**)
- Route structure for `/home`, `/leaderboard`, `/profile`, etc.
- App wrapper includes AuthProvider and UserProvider context providers

**Database Integration:**

- Yet to be filled

**Key Features:**

- User authentication with email/password
- Profile creation with username and display name
- Gamification elements (XP, levels, streaks, leagues)
- Private/public profile settings
- Lesson system (example: `pages/lesson.tsx`)

### Configuration

- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)
- **ESLint**: Standard configuration for React + TS
- **Environment Variables**: Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- **Platform Support**: Modern web browsers

### Development Notes

- Global state is managed with React Context, not Redux
- Authentication state is automatically synced with Supabase auth changes
- User profile data is fetched after authentication
- Project is modularized with separate folders for contexts, components, and utilities

#### Component Organization Rule

**Key principle:** Break down complex pages into smaller, manageable component files for better organization, even if components are only used on that specific page.

**Component locations:** 
- **Page-specific components:** Create `components/[page-name]/` folder for components that are specific to that page, including an `index.ts` file that exports all components from that folder
- **Reusable components:** Put components that can be used across multiple pages in the main `components/` folder
- **When to create components:** Break down pages when there are too many lines, when mapping the same component repeatedly, or when trying to break down complex components/pages

The page file (`src/app/[page-name]/page.tsx`) imports from the appropriate folder based on component scope.

## Lesson Types

### Letter-Based Learning (Foundation)

Before users learn to translate words, they must first learn to read. The app follows a structured approach:

#### 1. Letter Recognition & Phonics
- **Letter Introduction**: Each English letter with visual and audio
- **Letter Sounds**: Phonetic pronunciation for each letter
- **Letter Combinations**: Common combinations (th, ch, sh, etc.)
- **Progress Tracking**: Percentage completion for all letter sounds

#### 2. Word Building Progression
- Start with simple 3-letter words using learned letters
- Progress to more complex words as letter knowledge increases
- **Prerequisites**: Users must know letter sounds before word lessons

### Interactive Lesson Types

- **Word Bank**: Drag and drop words to correct categories
- **Fill in the Blank**: Complete sentences with missing words
- **Match Words**: Connect English words with Hebrew translations
- **Scrabble**: Build words using available letters
- **Multiplayer Games**: Compete with other learners

> ✅ Note: All UI and logic will be implemented for the web with drag/tap interactions replaced by mouse/touch equivalents as needed.

## Word Database Rules

_(No changes needed — these are logic and content design rules that apply to both web and native)_

## App Styling System

### Design System: Clean Dark/Light Mode

The app supports both dark and light modes with a clean, minimalistic design inspired by modern applications for a premium feel.

### Development Rules

#### Styling Technology
- **Tailwind CSS** - Use Tailwind classes for all styling
- **Theme Context** - Use `useTheme()` hook for dark/light mode switching
- **Theme System** - Import theme objects from `styles/theme.ts`
- **Responsive Layout** - Use responsive containers (flex/grid) for web layout
- **Components Folder** - All reusable UI components in `components/` folder

#### Component Reuse Rule
**MANDATORY**: Always reuse existing components from the `components/` folder instead of recreating UI elements in each page. This eliminates code duplication and maintains consistency.

#### Available Components
Import these reusable components from `components/`:
- **Card** - Clean container with subtle borders and shadows (theme-aware)
- **Button** - Primary/secondary button variants (theme-aware)
- **Text** - Typography components with proper hierarchy (theme-aware)
- **Input** - Form input fields (theme-aware)
- **Avatar** - User profile images
- **Screen** - Full-height page wrapper (theme-aware background)
- **Container** - Responsive content wrapper
- **ThemeToggle** - Dark/light mode toggle button

#### Design Principles
- **Clean & Minimalistic** - Remove unnecessary elements, focus on content
- **Premium Feel** - Subtle shadows, proper spacing, clean typography
- **Theme Support** - Support both dark and light modes seamlessly
- **Consistent Spacing** - Use Tailwind spacing scale consistently
- **Automatic Theme Detection** - Respects user's system preference by default

#### Styling Rules
1. **No inline styles** - Use Tailwind classes only, never inline styles
2. **Use theme context** - Always use `useTheme()` hook and theme objects for colors
3. **Use container padding** - Apply margin/padding in layout wrappers (Screen, Container)
4. **Consistent borders** - All cards/components use theme-aware border colors
5. **Typography hierarchy** - Use Text component with proper color props (primary/secondary/muted)

#### Component Usage
- Import all UI components from `components/`
- Use `<Screen>` wrapper for each main view (handles theme background)
- Use `<Card>` for content blocks (automatically theme-aware)
- Use `<Container>` for responsive content areas
- Use `<ThemeToggle>` for theme switching functionality
- Always import `useTheme()` when using theme-dependent styling
- Follow consistent design patterns across all pages

---
