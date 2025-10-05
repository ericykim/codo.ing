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

### Database Tools
- Database studio: `bun db:studio` - **Note**: Ignore CompressionStream errors, studio still works at https://local.drizzle.studio
- Generate migrations: `bun db:generate`
- Apply migrations: `bun db:migrate`
- Reset database: `bun db:reset` (drops all tables and re-runs migrations)

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

## Reference Documentation

**IMPORTANT**: When working on Better-auth related features, ALWAYS reference the comprehensive documentation in `/llm/better-auth.md` first. This file contains the complete Better-auth documentation with proper implementation patterns, API usage, and OAuth flows.

**CRITICAL**: For ANY Better-auth questions or issues, first consult `/llm/better-auth.md` before implementing solutions. This ensures proper implementation following Better-auth best practices.

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
- Better-auth authentication (✅ migrated from Clerk)
- Electron desktop wrapper
- Biome for code formatting and linting (no ESLint)
- PostgreSQL database with Docker setup and Drizzle ORM
- Fastify API server with tRPC
- TanStack Query for client-side data fetching
- Zod schema validation for environment variables and API
- Drizzle ORM for type-safe database operations

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
- `BETTER_AUTH_SECRET` - Better-auth secret key
- `BETTER_AUTH_URL` - Better-auth base URL (default: http://localhost:3333)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

### Environment Validation
Server uses `apps/server/src/lib/env.ts` for Zod-based environment variable validation:
```typescript
import { env, DATABASE_URL } from './lib/env';
// Automatically validates and provides typed environment variables
```

### tRPC API
- Server router: `lib/trpc-server/src/trpc.ts`
- Client hooks: `apps/web/src/trpc.ts`
- API endpoint: `http://localhost:3333/trpc`
- Health check: `http://localhost:3333/health`
- Authentication: All tRPC procedures require valid session

### Usage Example
```typescript
// In React components
import { trpc } from '../trpc';

function MyComponent() {
  const { data, isLoading } = trpc.test.getHello.useQuery({ name: 'World' });
  
  return <div>{data?.greeting}</div>;
}
```

## Database Setup

### Manual Setup
1. Start PostgreSQL: `docker compose up -d postgres`
2. Database credentials are loaded from `apps/server/.env` file
3. Connection string: Uses `DATABASE_URL` environment variable

### Database Management
- Schema definition: `lib/schema/src/models/` (Drizzle schema files)
- Initialize/modify schema: Add SQL files to `postgres/init/` or create Drizzle migrations
- Access database: `docker compose exec postgres psql -U $POSTGRES_USER -d $POSTGRES_DB`
- Stop database: `docker compose down postgres`

## Authentication System (Better-auth)

### Migration Status
✅ **COMPLETED**: Successfully migrated from Clerk to Better-auth for improved control and flexibility.
See `CLERK_TO_BETTER_AUTH_MIGRATION.md` for migration history and reference.

### Better-auth Configuration
- **Email/Password**: Primary authentication method
- **Google SSO**: Social authentication option
- **Database**: PostgreSQL with Better-auth schema
- **Sessions**: Cookie-based session management
- **Route Protection**: TanStack Router guards for auth/unauth routes

### Authentication Flow
```
Unauthenticated users → /signin page
Sign in (email/password or Google) → / (index route)
Protected routes require authentication
Session persists across page reloads/browser sessions
```

### Route Structure
- `/signin` - Sign in page (unauthenticated only)
- `/signup` - Sign up page (unauthenticated only)  
- `/` - Index route (authenticated only)
- All other routes - Protected (authenticated only)

### Server API Endpoints
- `/api/auth/*` - All Better-auth endpoints (signin, signup, signout, session, etc.)
- `/api/auth/sign-in/email` - Email/password signin
- `/api/auth/sign-up/email` - Email/password signup
- `/api/auth/sign-in/google` - Google OAuth signin
- `/api/auth/sign-out` - Logout endpoint
- `/api/auth/session` - Session validation
- `/trpc/*` - All tRPC routes (authenticated procedures only)

### Environment Variables (Better-auth)
```bash
# Better-auth Configuration
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3333
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Authentication Components
- Use HeroUI components for consistent design
- Better-auth client hooks for authentication state
- TanStack Router integration for route protection
- Proper loading states and error handling

### Development Notes
- Better-auth server config: `apps/server/src/lib/better-auth.ts`
- Better-auth client: `apps/web/src/lib/auth.ts`
- Auth hooks: `apps/web/src/hooks/useAuth.ts`, `apps/web/src/hooks/useSession.ts`
- Authentication components: `apps/web/src/components/auth/SignIn.tsx`, `apps/web/src/components/auth/SignUp.tsx`
- Route components: `apps/web/src/routes/signin.tsx`, `apps/web/src/routes/signup.tsx`
- Database schema: `lib/schema/src/models/auth.ts` (Better-auth tables)
- All tRPC procedures moved to authenticated middleware
- Cross-platform testing required (browser + Electron)