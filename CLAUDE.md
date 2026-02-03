# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start development server at localhost:3000
npm run build     # Build production bundle
npm start         # Start production server (requires build first)
npm run lint      # Run ESLint
```

### Docker Development

```bash
docker-compose up --build    # Start all services (db + webapp)
docker-compose down          # Stop all services
docker-compose logs -f       # View logs
```

## Technology Stack

- **Next.js 16** with App Router (directory-based routing in `app/`)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS 4** for styling
- **shadcn/ui** for UI components
- **Prisma** for database ORM
- **Geist font family** (sans-serif and monospace)

## Architecture

### Folder Structure
```
app/           # Next.js App Router pages and layouts
actions/       # Server Actions (use "use server" directive)
components/    # React components
  └── ui/      # shadcn/ui components
lib/           # Utilities (prisma.ts, utils.ts)
services/      # Business logic layer
types/         # TypeScript type definitions
constants/     # Application constants
prisma/        # Prisma schema and migrations
docker/        # Docker configuration
  └── local/   # Local development Dockerfile
```

### Data Flow Pattern
```
Page (Server Component) → Action → Service → Prisma → Database
```

- **Pages** call Server Actions directly
- **Actions** (`actions/`) are thin wrappers with `"use server"`
- **Services** (`services/`) contain business logic and Prisma queries
- **Prisma client** singleton in `lib/prisma.ts`

### Conventions
- Server components are the default; use `"use client"` directive for client components
- Path alias `@/*` maps to the project root
- Dark mode is handled via CSS variables and `prefers-color-scheme`
- Images use Next.js `Image` component for optimization
