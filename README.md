# VectorChat

An AI-powered data chat platform that allows users to upload company data files and have intelligent conversations with an AI assistant that can answer questions based on that data.

## Features

- **AI Chat Interface**: Real-time conversations with an AI assistant
- **Data Management**: Upload and process company data files (.txt)
- **Vector Database**: Semantic search using Pinecone
- **Knowledge Base**: Intelligent responses based on uploaded documents
- **Chat History**: Persistent conversation management
- **Authentication**: Secure admin access
- **Responsive Design**: Works on mobile and desktop

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1
- **State Management**: Zustand
- **AI/ML**: LangChain, HuggingFace models
- **Vector Database**: Pinecone
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

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
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard and chat pages
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable components
├── lib/               # Utilities and configurations
├── store/             # State management
├── types/             # TypeScript type definitions
└── styles/            # Component styles
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# Pinecone
PINECONE_API_KEY=
PINECONE_INDEX_NAME=

# AI/ML
HUGGINGFACE_API_KEY=
HUGGINGFACE_MODEL_NAME=

# App Configuration
NEXT_PUBLIC_APP_NAME=VectorChat
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered data chat platform
```

## Development Workflow

This project follows a strict pull request workflow:

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features (e.g., `feature/chat-interface`)
- `bugfix/*` - Bug fixes (e.g., `bugfix/auth-error`)
- `hotfix/*` - Critical production fixes

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