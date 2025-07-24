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

## Lesson Types

Same as before (Word Bank, Fill in the Blank, Match Words, Scrabble, Multiplayer Games)

> ✅ Note: All UI and logic will be implemented for the web with drag/tap interactions replaced by mouse/touch equivalents as needed.

## Word Database Rules

_(No changes needed — these are logic and content design rules that apply to both web and native)_

## App Styling System

### Design System: Dark Purple Gradient

The app uses a consistent Dark Purple Gradient design system throughout all pages and components.

#### Color Palette

- **Background**: Linear gradient (`#1a1a2e` → `#16213e` → `#0f3460`)
- **Card Background**: `#3d4278`
- **Primary Button**: `#8B5CF6`
- **Secondary Button**: `#EC4899`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A78BFA`
- **Border Color**: `#2c3057`

#### Design Principles

- **Responsive Layout**: Use responsive containers for web layout (flex/grid)
- **Card Style**: Cards use `backgroundColor: #3d4278`, `border: 0.3px solid #2c3057`, border radius
- **Typography**: Use theme-based font sizes and consistent text colors
- **Shadows**: Subtle `box-shadow` for depth
- **Border Radius**: 12px for cards, 16px for layout containers, 20px+ for buttons

#### File Structure

- **Styles**: `styles/theme.ts` - Global theme constants
- **Components**: `components/` - All reusable UI components
- **Usage**: Import theme and components; never hardcode styles

### Available Components

All components follow the Dark Purple Gradient design system and should be imported from the `components/` folder:

#### Core Components

- **Card** - Div with proper padding, shadow, border radius
- **Button** - Themed primary/secondary variants
- **Text** - Themed typography components
- **Input** - Themed form input field
- **Avatar** - Circular profile image
- **FloatingButton** - Sticky floating action button
- **BottomNavigation** - Bottom navigation bar (for responsive web layout)

#### Layout Components

- **Screen** - Full-height section wrapper with gradient background
- **Container** - Inner responsive div with padding

### Development Rules

#### Component Creation Rule

**MANDATORY**: When adding a new component, you MUST:

1. Add it to the component list in this CLAUDE.md
2. Follow the Dark Purple Gradient design system
3. Import from `styles/theme.ts` for all tokens (colors, spacing)
4. Never hardcode colors or design tokens

#### Styling Rules

1. **Always use the theme**: Import colors from `styles/theme.ts`
2. **Use container padding**: Apply margin/padding in layout wrappers
3. **Consistent borders**: All cards/components use theme border color
4. **Typography hierarchy**: Follow primary/secondary rules
5. **No inline styles**: Use styled-components, Tailwind, or CSS modules

#### Component Usage

- Import all UI components from `components/`
- Use `<Screen>` wrapper for each main view
- Use `<Card>` for content blocks
- Apply global theme
- Follow consistent design patterns

---
