# Codo.ing

A cross-platform collaborative note-taking application built with Jazz and Block Notes.

## Architecture

- **Web**: React app with Block Notes editor
- **Mobile**: React Native (planned)  
- **Desktop**: Electron (planned)
- **Sync**: Jazz for real-time collaboration and offline-first data sync
- **Infrastructure**: SST for AWS deployment

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+

### Development

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Start the web app**
   ```bash
   bun nx serve web
   ```
   
   The app will be available at http://localhost:4200

3. **Build for production**
   ```bash
   bun nx build web
   ```

4. **Run E2E tests**
   ```bash
   bun nx e2e e2e
   ```

### Project Structure

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

### Available Commands

- `bun nx serve web` - Start development server
- `bun nx build web` - Build for production  
- `bun nx test web` - Run unit tests
- `bun run format` - Format code with Biome
- `bun run lint` - Run Biome linter  
- `bun nx e2e e2e` - Run E2E tests
- `bun nx graph` - View dependency graph

## Roadmap

- [x] Initial Nx monorepo setup
- [x] Biome integration for code quality
- [ ] Add Jazz for collaboration and sync
- [ ] Implement Block Notes editor
- [ ] Add React Native mobile app
- [ ] Add Electron desktop app  
- [ ] SST infrastructure setup
- [ ] Cross-platform shared components

## MCP (Model Context Protocol) Integration

This workspace includes an Nx MCP server that provides AI tools with deep understanding of your monorepo:

### Features
- **Project Graph**: Complete workspace structure and dependencies
- **Task Runner**: Execute Nx commands and view running tasks  
- **Generators**: Access to Nx generators for code scaffolding
- **Documentation**: Context-aware Nx documentation lookup
- **CI Integration**: Access to Nx Cloud pipeline data (when connected)

### Usage with Claude Code
The MCP server is pre-configured and will automatically start when needed. No additional setup required!

### Manual Usage
```bash
# Start MCP server manually (for other AI tools)
bunx nx-mcp

# Or with custom port for HTTP/SSE transport
bunx nx-mcp --transport sse --port 9921
```

## Technology Stack

- **Monorepo**: Nx with Bun
- **Web**: React 19, TypeScript, Vite
- **Code Quality**: Biome (formatting & linting)
- **Testing**: Vitest, Playwright
- **AI Integration**: Nx MCP Server
- **Collaboration**: Jazz (CRDT-based sync)
- **Rich Text**: Block Notes
- **Infrastructure**: SST (AWS)