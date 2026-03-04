# eSIM E-commerce

An e-commerce platform for purchasing eSIM data plans, built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Next.js 16** — App Router with server components
- **React 19** — with TypeScript (strict mode)
- **Tailwind CSS 4** — styling with shadcn/ui components
- **Prisma 7** — PostgreSQL ORM
- **Zod** — schema validation
- **React Hook Form** — form handling

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### Docker Development (recommended)

```bash
docker compose up -d --build # Start PostgreSQL + webapp
docker compose down          # Stop all services
docker compose logs -f       # View logs
```

The app runs at [http://localhost:3000](http://localhost:3000) with PostgreSQL on port 5433.

### Database

```bash
npx prisma migrate dev       # Run migrations
npx prisma db seed            # Seed sample data
npm run prisma:generate       # Regenerate Prisma client
```

## Project Structure

```
app/               # Next.js pages and layouts
features/          # Business domains (vertical slices)
  └── <domain>/
      ├── actions/       # Server Actions
      ├── components/    # Domain-specific UI
      ├── hooks/         # Client logic
      ├── services/      # Business logic + Prisma queries
      └── types.ts
shared/            # Domain-agnostic shared code
  ├── ui/          # shadcn/ui primitives
  ├── components/  # App-level shared components
  ├── hooks/       # Shared React hooks
  └── utils/       # Pure utility functions
lib/db/            # Prisma client singleton
prisma/            # Schema and migrations
docker/            # Docker configuration
```
