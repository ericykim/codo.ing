# Claude Instructions for Codo.ing

## UI Development Guidelines

When creating UI components, prioritize HeroUI components first:
- Use HeroUI components from `@heroui/react` for consistent design
- Follow HeroUI patterns and conventions
- Only create custom components when HeroUI doesn't provide the needed functionality

## Development Commands

- Jazz sync server: `bun run sync`
- Web development server: `bun run web`
- Electron desktop app: `bun run electron`
- Build: `bun nx build web`
- Code quality: `bun run lint` and `bun run format`

## Development Workflow

For full development, run these in separate terminals:
1. `bun run sync` - Start Jazz collaborative database (uses Node.js to avoid Bun SQLite issues)
2. `bun run web` - Start web app development server
3. `bun run electron` - Start Electron desktop wrapper (optional)

## Known Issues

- Jazz sync server requires Node.js due to native SQLite module compatibility with Bun
- The `bun run sync` command automatically uses Node.js internally

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
- Jazz collaborative database with local sync server
- Zod schema validation integrated with Jazz CoValues