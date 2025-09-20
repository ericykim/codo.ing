# Codo.ing Project Context

## Project Overview
This is a cross-platform collaborative note-taking application built with Jazz (CRDT-based sync) and Block Notes (rich text editor).

## Technology Stack
- **Monorepo**: Nx with Bun package manager
- **Web**: React 19, TypeScript, Vite
- **Code Quality**: Biome (formatting & linting) - NO Prettier or ESLint
- **Testing**: Vitest, Playwright
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
- The web app is at `apps/web/`
- E2E tests are at `apps/e2e/`
- When running lint/typecheck, use the commands above

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

## Next Steps in Roadmap
- [ ] Add Jazz for collaboration and sync
- [ ] Implement Block Notes editor
- [ ] Add React Native mobile app
- [ ] Add Electron desktop app
- [ ] SST infrastructure setup