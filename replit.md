# TRYVIA - Live Trivia Game

## Overview

TRYVIA (tryvia.io) is a lightweight, fun trivia website that displays live trivia questions with automatic timing. Questions show for 15 seconds to read and think, then answers are revealed for 10 seconds with explanations and fun facts. The current question plus the previous 2 questions and answers remain visible for reference. Features a vibrant, animated UI with smooth transitions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom color scheme
- **UI Components**: Radix UI components via shadcn/ui
- **Animations**: Framer Motion for smooth transitions
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Database**: PostgreSQL with Neon serverless connection
- **Data Layer**: Drizzle ORM with schema validation
- **Storage**: DatabaseStorage class for persistent data
- **API**: RESTful endpoints for trivia operations

## Key Components

### Database Schema
- **trivia_questions**: Stores question data with categories, options, correct answers, explanations, and fun facts
- **users**: User authentication schema (prepared but not fully implemented)
- Uses Drizzle ORM with Zod schema validation

### Frontend Components
- **TriviaCard**: Main question display with animated transitions
- **PreviousQuestions**: Sidebar showing question history
- **Timer System**: Custom hook managing question and answer phases
- **UI Library**: Complete set of reusable components from shadcn/ui

### API Endpoints
- `GET /api/trivia/questions` - Fetch all trivia questions
- `GET /api/trivia/questions/:id` - Fetch specific question by ID

## Data Flow

1. **Application Start**: React Query fetches trivia questions from API
2. **Question Display**: TriviaCard renders current question with timer
3. **Timer Management**: Custom hook cycles between question/answer phases
4. **Question Progression**: Automatic advancement through questions
5. **History Tracking**: Previous questions displayed in sidebar

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **drizzle-orm**: Type-safe database ORM
- **framer-motion**: Animation library
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development
- Uses Vite dev server with HMR
- Express server runs on port 5000
- PostgreSQL module configured in Replit environment

### Production
- Vite builds static assets to `dist/public`
- Express server serves both API and static files
- ESBuild bundles server code for production
- Configured for Replit's autoscale deployment

### Database
- PostgreSQL database with Neon serverless connection
- Schema defined in `shared/schema.ts` with Drizzle ORM
- DatabaseStorage class handles all CRUD operations
- Trivia questions and user data persisted in database

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- June 24, 2025: Initial TRYVIA setup with live trivia system
- June 24, 2025: Added PostgreSQL database integration with Drizzle ORM
- June 24, 2025: Migrated from in-memory to persistent database storage
- June 24, 2025: Updated branding to "TRYVIA" throughout application
- June 24, 2025: Simplified UI by removing question numbers from all displays
- June 24, 2025: Enhanced phase indicator visibility with colored badges and better contrast