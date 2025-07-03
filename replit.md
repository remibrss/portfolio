# Portfolio Website - Dylan Chau

## Overview

This is a personal portfolio website for Dylan Chau, a 20-year-old IT technician passionate about new technologies, sports, and automobiles. The application is built as a modern full-stack web application using React for the frontend and Express.js for the backend, with a PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth animations
- **Build Tool**: Vite for development and build processes

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based session storage
- **Development**: Hot module replacement with Vite integration

### Key Components

#### Database Schema
- **portfolio_data**: Personal information (name, title, description, contact details)
- **education**: Educational background with institutions and periods
- **skills**: Technical skills with proficiency percentages and icons
- **certifications**: Professional certifications with images and links
- **users**: User authentication system (username/password)

#### Frontend Components
- **Navigation**: Fixed navigation with smooth scrolling
- **Hero Section**: Main landing section with animated introduction
- **About Section**: Personal description with call-to-action buttons
- **Education Section**: Timeline-based educational journey
- **Skills Section**: Interactive skill showcase with progress indicators
- **Certifications Section**: Certificate gallery with external links
- **Footer**: Contact information and social media links

#### Storage Layer
- **Database Storage**: PostgreSQL with Drizzle ORM for production
- **Memory Storage**: In-memory fallback for development/testing
- **Interface Pattern**: IStorage interface for storage abstraction

## Data Flow

1. **Frontend Request**: React components make API calls using TanStack Query
2. **Backend Processing**: Express.js routes handle API requests
3. **Database Operations**: Storage interface abstracts database operations
4. **Response Handling**: JSON responses with proper error handling
5. **UI Updates**: React components update based on query results

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: TypeScript-first ORM
- **@radix-ui/***: Headless UI components
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight routing

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves static files from Express server
- **Database**: Requires `DATABASE_URL` environment variable

### Scripts
- `dev`: Start development server with hot reload
- `build`: Build both frontend and backend for production
- `start`: Start production server
- `db:push`: Push database schema changes

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```