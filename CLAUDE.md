# Claude Instructions for Codo.ing

## UI Development Guidelines

When creating UI components, prioritize HeroUI components first:
- Use HeroUI components from `@heroui/react` for consistent design
- Follow HeroUI patterns and conventions
- Only create custom components when HeroUI doesn't provide the needed functionality

## Development Commands

- Development server: `bun nx serve web`
- Build: `bun nx build web`
- Code quality: `bun run lint` and `bun run format`

## Architecture Notes

- Nx monorepo with Bun package manager
- React 19 with TypeScript
- TanStack Router for routing
- HeroUI design system with Tailwind CSS
- Clerk authentication
- Electron desktop wrapper
- Biome for code formatting and linting (no ESLint)