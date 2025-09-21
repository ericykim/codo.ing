# Codo.ing Project Context

## Project Overview
This is a cross-platform collaborative note-taking application built with Jazz (CRDT-based sync) and Block Notes (rich text editor).

## Technology Stack
- **Monorepo**: Nx with Bun package manager
- **Web**: React 19, TypeScript, Vite, TanStack Router
- **UI**: HeroUI design system with Tailwind CSS
- **Auth**: Clerk (authentication & user management) ✅ IMPLEMENTED
- **Code Quality**: Biome (formatting & linting) - NO Prettier or ESLint
- **Testing**: Vitest, Playwright
- **Desktop**: Electron wrapper ✅ IMPLEMENTED
- **Collaboration**: Jazz (CRDT-based sync) - planned
- **Rich Text**: Block Notes - planned
- **Infrastructure**: SST (AWS) - planned

## Development Commands
- `bun nx serve web` - Start development server
- `bun nx build web` - Build for production
- `bun run format` - Format with Biome
- `bun run lint` - Lint with Biome
- `bun nx e2e e2e` - Run E2E tests

## Important Notes
- Always use Bun, never npm
- Use Biome for all formatting and linting (no Prettier/ESLint)
- The web app is at `apps/web/` with simplified structure (no `/app` directory)
- The desktop app is at `apps/desktop/` (Electron wrapper)
- E2E tests are at `apps/e2e/`
- HeroUI components are used for UI (no separate UI package needed)
- TanStack Router config is at workspace root (`tsr.config.json`)
- Clerk authentication is fully configured with HeroUI integration
- When running lint/typecheck, use the commands above

## Code Quality Rules
**NEVER ADD ESLINT** - This project uses Biome exclusively for formatting and linting.

If ESLint is accidentally added:
1. Immediately remove ESLint dependencies: `bun remove @nx/eslint-plugin eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks typescript-eslint`
2. Delete all `eslint.config.*` files
3. Remove ESLint plugin from `nx.json` plugins array
4. Keep only Biome configuration in `biome.json`
5. Use Biome scripts: `bun run format`, `bun run lint`, `bun run lint:fix`

## Cross-Platform Compatibility
**CRITICAL**: Always ensure web app works in both browser AND Electron
- Test both `bun nx serve web` (browser) and `bun nx serve desktop` (Electron)
- Electron loads web app from localhost:4200 in dev mode
- File paths, routing, and APIs must work in both environments
- Consider Electron-specific features (file system, notifications) but gracefully degrade

## Project Structure
```
apps/
├── web/           # React web application
├── e2e/           # Cross-platform E2E tests
├── mobile/        # React Native app (planned)
├── desktop/       # Electron app (planned)
└── server/        # Jazz sync server (planned)

packages/
├── shared/        # Shared business logic (planned)
├── ui/            # Design system (planned)
└── jazz-schemas/  # Jazz data models (planned)
```

## Jazz Integration
- Use the `llms-full.txt` file in the project root to learn Jazz API and patterns
- Jazz is our chosen CRDT-based collaboration and sync solution
- Focus on offline-first, real-time collaboration capabilities

## Current Implementation Status
✅ **Completed:**
- [x] Nx monorepo with Bun package manager
- [x] React 19 web app with TypeScript and Vite
- [x] TanStack Router for type-safe client-side routing
- [x] HeroUI design system with Tailwind CSS
- [x] Clerk authentication (Sign In/Sign Up/User Management)
- [x] Electron desktop app (wraps web app)
- [x] Biome code quality tooling (replaced ESLint/Prettier)
- [x] Cross-platform development workflow
- [x] MCP server integration for AI development

## Next Steps in Roadmap
- [ ] Add Jazz for collaboration and sync
- [ ] Implement Block Notes rich text editor
- [ ] Add React Native mobile app with Expo
- [ ] Create shared business logic packages
- [ ] SST infrastructure setup