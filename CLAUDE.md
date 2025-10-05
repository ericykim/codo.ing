# Claude Instructions for Codo.ing

## UI Development Guidelines

When creating UI components, prioritize HeroUI components first:
- Use HeroUI components from `@heroui/react` for consistent design
- Follow HeroUI patterns and conventions
- Only create custom components when HeroUI doesn't provide the needed functionality

## Development Commands

### Individual Services (Hot Reloading Enabled)
- Web development server: `bun run web` (port 4200)
- API server: `bun run server` (port 3333) 
- tRPC package watcher: `bun run trpc` (builds on file changes)
- Electron desktop app: `bun run electron`


### Build Commands
- Build web: `bun nx build web`
- Build server: `bun nx build server`
- Build tRPC: `bun nx build trpc-server`

### Code Quality
- Lint & format: `bun run lint` and `bun run format`
- Database setup: `./scripts/db-setup.sh` or `docker compose up -d postgres`

## Development Workflow

For full development, run these in separate terminals:
1. `./scripts/db-setup.sh` - Start PostgreSQL database
2. `bun run trpc` - Start tRPC package watcher (hot reloads on changes)
3. `bun run server` - Start API server (port 3333, hot reloads on changes)
4. `bun run web` - Start web app (port 4200, hot reloads on changes)
5. `bun run electron` - Start Electron desktop wrapper (optional)

### Hot Reloading Features
- **tRPC Package**: Auto-rebuilds on file changes, server restarts automatically
- **API Server**: Auto-restarts on code changes with Bun's `--watch` 
- **Web App**: Vite HMR with instant updates for React components
- **Type Safety**: Changes in tRPC routes immediately reflected in web app

## Tailwind CSS + HeroUI Setup

- Uses Tailwind CSS v4 with official Vite plugin
- HeroUI theme configured via `tailwind.config.ts`
- No separate CSS imports needed - HeroUI uses Tailwind utilities

## Import Guidelines

When writing imports, follow these conventions:
- **Shared packages**: Use package names like `@codoing/trpc-server` instead of relative paths
- **App-specific code**: Keep local imports like `./lib/env` for app-specific configurations
- **External packages**: Always use the full package name (e.g., `@heroui/react`, `@tanstack/react-query`)
- **Avoid relative lib imports**: Don't use `../lib/` or `./lib/` for shared functionality that should be packaged

## Architecture Notes

- Nx monorepo with Bun package manager
- React 19 with TypeScript
- TanStack Router for routing
- HeroUI design system with Tailwind CSS v4
- Clerk authentication
- Electron desktop wrapper
- Biome for code formatting and linting (no ESLint)
- PostgreSQL database with Docker setup
- Fastify API server with tRPC
- TanStack Query for client-side data fetching
- Zod schema validation for environment variables and API

## Database Setup

### Quick Start
1. Copy `.env.example` to `.env` and update values if needed
2. Run `./scripts/db-setup.sh` to automatically set up PostgreSQL with Docker

## API Server Setup

The API server is located in `apps/server/` and uses Fastify with tRPC.

### Environment Variables
Server configuration is managed through environment variables in `apps/server/.env`:
- `POSTGRES_DB` - Database name (default: codoing)
- `POSTGRES_USER` - Database user (default: postgres)
- `POSTGRES_PASSWORD` - Database password (default: postgres)
- `POSTGRES_HOST` - Database host (default: localhost)
- `POSTGRES_PORT` - Database port (default: 5432)
- `DATABASE_URL` - Full connection string (auto-generated if not provided)
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)

### Environment Validation
Server uses `apps/server/src/lib/env.ts` for Zod-based environment variable validation:
```typescript
import { env, DATABASE_URL } from './lib/env';
// Automatically validates and provides typed environment variables
```

### tRPC API
- Server router: `apps/server/src/lib/trpc.ts`
- Client hooks: `apps/web/src/lib/trpc.ts`
- API endpoint: `http://localhost:3000/trpc`
- Health check: `http://localhost:3000/health`

### Usage Example
```typescript
// In React components
import { trpc } from '../lib/trpc';

function MyComponent() {
  const { data, isLoading } = trpc.hello.useQuery({ name: 'World' });
  const { data: users } = trpc.getUsers.useQuery();
  
  return <div>{data?.greeting}</div>;
}
```

## Database Setup

### Manual Setup
1. Start PostgreSQL: `docker compose up -d postgres`
2. Database credentials are loaded from `apps/server/.env` file
3. Connection string: Uses `DATABASE_URL` environment variable

### Database Management
- Initialize/modify schema: Add SQL files to `postgres/init/`
- Access database: `docker compose exec postgres psql -U $POSTGRES_USER -d $POSTGRES_DB`
- Stop database: `docker compose down postgres`