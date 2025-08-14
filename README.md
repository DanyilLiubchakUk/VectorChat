# VectorChat

An AI-powered data chat platform that allows users to upload company data files and have intelligent conversations with an AI assistant that can answer questions based on that data.

## Features

-   **AI Chat Interface**: Real-time conversations with an AI assistant
-   **Data Management**: Upload and process company data files (.txt)
-   **Vector Database**: Semantic search using Pinecone
-   **Knowledge Base**: Intelligent responses based on uploaded documents
-   **Chat History**: Persistent conversation management
-   **Authentication**: Secure admin access with Firebase Auth
-   **Responsive Design**: Works on mobile and desktop
-   **Theme System**: Light/dark mode with system preference detection

## Tech Stack

-   **Frontend**: Next.js 15 with App Router
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4.1 with CSS-in-JS
-   **State Management**: Zustand
-   **UI Components**: shadcn/ui with custom design system
-   **AI/ML**: LangChain, HuggingFace models
-   **Vector Database**: Pinecone
-   **Authentication**: Firebase Auth with Admin SDK
-   **Database**: Firebase Firestore
-   **Deployment**: Vercel

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DanyilLiubchakUk/VectorChat.git
cd vector-chat
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages (signin, signup)
│   │   ├── signin/      # Sign in page and client component
│   │   └── signup/      # Sign up page and client component
│   ├── (dashboard)/     # Dashboard and chat pages
│   ├── api/             # API routes
│   │   ├── auth/        # Authentication status
│   │   ├── login/       # Login endpoint
│   │   ├── logout/      # Logout endpoint
│   │   └── upload/      # File upload endpoint
│   ├── globals.css      # Global styles with design tokens
│   ├── home/            # Home page
│   └── layout.tsx       # Root layout
├── components/
│   ├── auth/            # Reusable authentication components
│   ├── chat/            # Chat interface components
│   ├── dashboard/       # Dashboard components
│   ├── forms/           # Form components
│   ├── settings/        # Theme and settings components
│   └── ui/              # Base UI components (shadcn/ui)
├── hooks/               # Custom React hooks
├── lib/
│   ├── ai/              # AI/ML utilities
│   ├── database/        # Database utilities
│   ├── firebase/        # Firebase configuration
│   ├── utils/           # Utility functions
│   └── validations/     # Validation schemas
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── middleware.ts        # Route protection middleware
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Session
AUTH_COOKIE_NAME=vectorchat_session
USE_SECURE_COOKIES=true
```

## Firebase Setup

### Getting Firebase Client SDK Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click on the gear icon, next to "Project Overview" and select "Project settings"
4. Scroll down to "Your apps" section
5. Click "Add app" and select the web icon (</>)
6. Register your app with a nickname
7. Copy the configuration values:
    - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

### Getting Firebase Admin SDK Values

1. In Firebase Console, go to "Project settings"
2. Click on "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Extract the following values:
    - `project_id` → `FIREBASE_PROJECT_ID`
    - `client_email` → `FIREBASE_CLIENT_EMAIL`
    - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and newlines: \n)

### Enable Authentication Methods

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" authentication
3. Enable "Google" authentication (optional)
4. Add your domain to authorized domains if deploying

### Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users
5. On the Firestore Database tab, go to the "Rules" tab and update your Firestore security rules to only allow authorized requests. Change your rules from:
    ```
    allow read, write: if false;
    ```
    to:
    ```
    allow read, write: if request.auth != null;
    ```
    Click "Publish". This ensures only authenticated users can read or write to your Firestore database.
6. In the Firebase Console, go to the "Authentication" section, then click the "Settings" tab, and navigate to "Authorized domains". Make sure `localhost` (just type `localhost` without quotes or protocol) is listed for local development, as well as the domain where you will deploy your app. For example:

    ```
    localhost
    your-production-domain.com
    ```

## Development Workflow

This project follows a strict pull request workflow:

### Branch Strategy

-   `main` - Production-ready code
-   `develop` - Integration branch for features
-   `feature/*` - New features (e.g., `feature/chat-interface`)
-   `bugfix/*` - Bug fixes (e.g., `bugfix/auth-error`)
-   `hotfix/*` - Critical production fixes

### Pull Request Process

1. Create a feature branch from `develop`
2. Implement your changes with proper commits
3. Write tests for new functionality
4. Update documentation if needed
5. Create a pull request with detailed description
6. Code review and approval required
7. Merge to `develop` after approval
8. Deploy to staging for testing
9. Merge `develop` to `main` for production

### Commit Convention

```
feat: add user authentication
fix: resolve chat history loading issue
docs: update API documentation
style: improve button component styling
refactor: optimize vector search algorithm
test: add unit tests for data processing
chore: update dependencies
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Architecture

### Authentication Flow

-   Client-side Firebase Auth for user sign-in/sign-up
-   Server-side session cookies for persistent authentication
-   Middleware protection for all non-public routes
-   Secure token verification with Firebase Admin SDK

### Data Processing Pipeline

-   File upload validation (.txt only)
-   Text chunking with LangChain RecursiveCharacterTextSplitter
-   Vector embedding with Pinecone
-   Semantic search with reranking
-   LLM response generation with HuggingFace

### Component Architecture

-   Reusable authentication components following DRY principles
-   Theme-aware design system with CSS custom properties
-   Responsive layout with mobile-first approach
-   Accessibility-first component design
