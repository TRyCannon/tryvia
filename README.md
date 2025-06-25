# TRYVIA - Live Trivia Game

A lightweight, fun trivia website that displays live trivia questions with automatic timing. Questions show for 15 seconds to read and think, then answers are revealed for 10 seconds with explanations and fun facts.

## Features

- 🎯 **Live Trivia Questions** - Automatic rotation with timed reveals
- ⏱️ **Smart Timing** - 15 seconds for questions, 10 seconds for answers
- 🎨 **Beautiful UI** - Vibrant animations and smooth transitions
- 📱 **Responsive Design** - Works great on all devices
- 🗃️ **PostgreSQL Database** - Persistent storage with Drizzle ORM
- 📚 **Question History** - Previous 2 questions remain visible
- 🎮 **Interactive Controls** - Pause/play and sound toggle

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- TanStack Query for state management
- Wouter for routing
- Radix UI components

### Backend
- Express.js with TypeScript
- PostgreSQL with Neon serverless
- Drizzle ORM for database operations
- Node.js 20 runtime

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (or use Neon)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tryvia.git
cd tryvia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy and configure your database URL
DATABASE_URL=your_postgresql_connection_string
```

4. Push database schema:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Database Setup

The application uses PostgreSQL with Drizzle ORM. The schema includes:

- **trivia_questions** - Stores question data with categories, options, correct answers, explanations, and fun facts
- **users** - User authentication schema (prepared for future features)

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and configurations
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API route definitions
│   ├── db.ts        # Database connection
│   └── storage.ts   # Data access layer
├── shared/          # Shared types and schemas
│   └── schema.ts    # Drizzle database schema
└── package.json     # Dependencies and scripts
```

## API Endpoints

- `GET /api/trivia/questions` - Fetch all trivia questions
- `GET /api/trivia/questions/:id` - Fetch specific question by ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

The application is configured for deployment on platforms like Replit, Vercel, or any Node.js hosting service.

For Replit deployment:
1. Connect your GitHub repository
2. Set up environment variables
3. Use the "Deploy" button in Replit

## Live Demo

Visit [tryvia.io](https://tryvia.io) to see the live application.