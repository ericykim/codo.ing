# Claude Instructions for Codo.ing

## UI Development Guidelines

When creating UI components, prioritize HeroUI components first:
- Use HeroUI components from `@heroui/react` for consistent design
- Follow HeroUI patterns and conventions
- Only create custom components when HeroUI doesn't provide the needed functionality

## Development Commands

- Web development server: `bun run web`
- Electron desktop app: `bun run electron`
- Build: `bun nx build web`
- Code quality: `bun run lint` and `bun run format`

## Development Workflow

For full development, run these in separate terminals:
1. `bun run web` - Start web app development server
2. `bun run electron` - Start Electron desktop wrapper (optional)

## Tailwind CSS + HeroUI Setup

- Uses Tailwind CSS v4 with official Vite plugin
- HeroUI theme configured via `tailwind.config.ts`
- No separate CSS imports needed - HeroUI uses Tailwind utilities

## Architecture Notes

- Nx monorepo with Bun package manager
- React 19 with TypeScript
- TanStack Router for routing
- HeroUI design system with Tailwind CSS v4
- Clerk authentication
- Electron desktop wrapper
- Biome for code formatting and linting (no ESLint)
- Ready for your preferred database solution (Electric-SQL, Supabase, etc.)
- Zod schema validation ready for integration