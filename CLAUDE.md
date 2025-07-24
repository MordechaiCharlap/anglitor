# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anglitor is a React Native mobile application built with Expo Router. It is a English-language learning app for Hebrew speakers, with authentication, users data, lessons, and gamification features (levels, XP, streaks, leagues).

## App Design Principles

The app should be seamless, addictive, animated as much as possible, and full of positive reinforcement to create an engaging learning experience.

## Development Commands

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start the development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint
- `npm run reset-project` - Move starter code to app-example and create blank app directory

## Architecture

### Core Technologies

- **React Native** with Expo (~53.0.17)
- **Expo Router** for file-based navigation with typed routes
- **TypeScript** with strict mode enabled
- **Supabase** for backend services (authentication and database)
- **React Context** for state management

### Project Structure

**Authentication Flow:**

- `contexts/AuthContext.tsx` - Handles Supabase authentication state and methods
- `contexts/UserContext.tsx` - Manages user profile data from the database
- Authentication screens: `app/signin.tsx`, `app/register.tsx`, `app/emailConfirmation.tsx`

**Navigation:**

- File-based routing with `expo-router`
- Tab navigation in `app/(tabs)/` with home, leaderboard, and profile screens
- Root layout wraps the app with AuthProvider and UserProvider contexts

**Database Integration:**

- All sql tables data is in database_tables.sql in the root folder.

**Key Features:**

- User authentication with email/password
- Profile creation with username and display name
- Gamification elements (XP, levels, streaks, leagues)
- Private/public profile settings
- Lesson system (based on `app/lesson.tsx`)

### Configuration

- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)
- **ESLint**: Uses Expo's flat config
- **Environment Variables**: Requires `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- **Platform Support**: iOS, Android, and Web with Metro bundler

### Development Notes

- The app uses React Context providers for global state management rather than Redux
- Authentication state is automatically synced with Supabase auth changes
- User profile data is fetched when authentication is confirmed
- The project structure separates concerns with dedicated folders for contexts, utils, and components

## Lesson Types

### 1. Word-Bank Translation

Interactive sentence building where users translate between Hebrew and English in both directions by selecting words from a word bank (Duolingo-style). Features:

- Hebrew → English: See Hebrew sentence, build English translation
- English → Hebrew: See English sentence, build Hebrew translation
- First clicked word jumps to sentence start
- Subsequent words append to the end of the sentence
- Clicking an already-selected word returns it to the word bank
- Remaining words automatically close gaps in the sentence
- No feedback until user clicks continue/check button

### 2. Fill in the Blank

Users complete English sentences by selecting the missing word from a word bank. Features:

- English sentence with one word missing (shown as blank space)
- Multiple word options to choose from
- Immediate feedback upon word selection

### 3. Match Words

Two-column word matching between Hebrew and English vocabulary. Features:

- Left column: Hebrew words (5± words)
- Right column: English words (5± words)
- Users connect matching word pairs by tapping
- Immediate feedback when a pair is selected

### 4. Scrabble-Style Word Building

Letter arrangement game where users spell specific requested words using provided letters. Features:

- Row of empty squares representing the word length
- Set of scrambled letters below the squares
- App requests specific words the user has already learned
- User drags/taps letters to fill squares and spell the requested word
- Optional timer for added challenge
- Only uses words from user's learned vocabulary

### 5. Multiplayer Mini-Games

Real-time competitive games where two players are matched together. Features:

- Matchmaking system: Users wait for another player to join
- Game options include Connect 4 and other classic games
- Turn-based gameplay with learning challenges
- Each turn requires completing a language exercise before making a game move
- Current exercise: Match 4 Hebrew words to 4 English words within 10 seconds
- Success allows the player to make their game move (e.g., drop piece in Connect 4)
- Failure passes the turn to the opponent
- Combines competitive gaming with language learning reinforcement

## Word Database Rules

These rules ensure words are structured for optimal child language learning:

### Core Rules

**1. Standalone Word Priority**: Meaningful words should always be saved individually

- ✅ "bread", "red", "woman", "house", "apple"
- ❌ "some bread", "very red", "big house"

**2. Singular Before Plural**: Plurals always come after singulars, never same level or before

- Level gap determined by context, not automatic +1
- Exception: Singular-only words ("glasses", "scissors", "people")

**3. Chunking Only When Necessary**: Two-word phrases only when individual words are meaningless alone

- ✅ "I have", "he is", "you are" (because isolated "have", "is", "are" confuse children)
- ❌ "open door", "red car", "my house" (all components work independently)

**4. Component Dependency**: For phrases, all standalone components must be learned first at lower difficulty levels

- Cannot learn "I have" without first learning "I"
- Cannot learn "they want" without first learning "they"
- Ensures building blocks exist before combinations

**5. Difficulty Progression**: Phrase components should exist in easier levels than the phrase itself

### Learning Optimization Rules

**6. Concrete Before Abstract**: Physical, tangible concepts before abstract ideas

- "apple", "car", "house" before "love", "freedom", "idea"
- Things children can see/touch before concepts they need to understand

**7. High Frequency First**: Common daily words before rare vocabulary

- "water", "food", "mom" before "microscope", "philosophy", "archaeology"

**8. Immediate Usability**: Words children can use right away in real situations

- "hungry", "tired", "bathroom" before academic or specialized terms

### Technical Implementation

**9. Hebrew→English Word Bank Splitting**: Phrases stored as single entries are automatically split for Hebrew→English exercises

- Database: "thank you" → "תודה"
- Hebrew→English lesson: "תודה" requires selecting ["thank", "you"] from word bank
- English→Hebrew lesson: "thank you" stays as one chunk

**10. Manual Lesson Creation**: All lesson questions and exercises are hand-crafted, not auto-generated

- Ensures quality, context-appropriate learning experiences
- Avoids nonsensical auto-generated combinations
- Allows pedagogically sound word combinations and contexts

### Word Storage Philosophy

Keep the database structure simple - store words as they should be learned, let lesson logic handle the complexity. No complex relational fields unless absolutely necessary for core functionality.

## App Styling System

### Design System: Dark Purple Gradient

The app uses a consistent Dark Purple Gradient design system throughout all screens and components.

#### Color Palette

- **Background**: Linear gradient (`#1a1a2e` → `#16213e` → `#0f3460`)
- **Card Background**: `#3d4278` (purple-gray cards)
- **Primary Button**: `#8B5CF6` (vibrant purple)
- **Secondary Button**: `#EC4899` (bright pink)
- **Text Primary**: `#FFFFFF` (white)
- **Text Secondary**: `#A78BFA` (light purple)
- **Border Color**: `#2c3057` (subtle card borders)

#### Design Principles

- **Container Padding**: Use container padding instead of SafeAreaView padding (SafeAreaView padding doesn't work properly)
- **Card Style**: All cards have `backgroundColor: #3d4278`, `borderWidth: 0.3`, `borderColor: #2c3057`, rounded corners
- **Typography**: White primary text, light purple secondary text
- **Shadows**: Subtle shadows with proper elevation for depth
- **Border Radius**: 12px for cards, 16px for main components, 20px+ for buttons

#### File Structure

- **Styles**: `styles/theme.ts` - Global theme constants and styling system
- **Components**: `components/` - All reusable UI components
- **Usage**: Import theme and components, never hardcode colors or styles

### Available Components

All components follow the Dark Purple Gradient design system and should be imported from the `components/` folder:

#### Core Components

- **Card** - Standard card container with proper styling
- **Button** - Primary and secondary button variants
- **Text** - Styled text components (primary/secondary variants)
- **Input** - Text input with consistent theming
- **Avatar** - Circular avatar component
- **FloatingButton** - Floating action button (pink)
- **BottomNavigation** - Bottom tab navigation

#### Layout Components

- **Screen** - Main screen wrapper with gradient background
- **Container** - Content container with proper padding

### Development Rules

#### Component Creation Rule

**MANDATORY**: When adding any new component to the app, you MUST:

1. Add the component to this CLAUDE.md components list
2. Follow the Dark Purple Gradient design system
3. Import from `styles/theme.ts` for all colors and styling
4. Never hardcode colors, spacing, or design tokens

#### Styling Rules

1. **Always use the theme**: Import colors from `styles/theme.ts`
2. **Container padding**: Apply padding to containers, not SafeAreaView
3. **Consistent borders**: Cards use `borderWidth: 0.3` with theme border color
4. **Typography hierarchy**: Use theme text colors for primary/secondary content
5. **No inline styles**: Keep styles in StyleSheet objects or theme file

#### Component Usage

- Import all UI components from `components/`
- Use `<Screen>` wrapper for all main screens
- Use `<Card>` for all content containers
- Use theme colors for any custom styling
- Follow existing component patterns and props
