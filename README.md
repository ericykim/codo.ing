# Codo.ing

A cross-platform collaborative note-taking application with Better-auth authentication and PostgreSQL database.

## Architecture

- **Web**: React 19 app with HeroUI design system, Better-auth authentication, TanStack Router
- **Desktop**: Electron app (✅ **implemented**) - loads web app as renderer
- **Mobile**: React Native with Expo (planned) - will use Tentap Editor
- **Backend**: Fastify API server with tRPC, PostgreSQL database with Drizzle ORM
- **Infrastructure**: SST for AWS deployment (planned)

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+

### Development

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Set up database**
   ```bash
   ./scripts/db-setup.sh
   ```

3. **Start development servers**
   ```bash
   # Terminal 1: Start tRPC package watcher
   bun run trpc
   
   # Terminal 2: Start API server
   bun run server
   
   # Terminal 3: Start web app
   bun run web
   ```
   
   The app will be available at http://localhost:4200

4. **Start the desktop app** (optional, requires web app to be running)
   ```bash
   # Terminal 4: Start desktop app  
   bun run electron
   ```

5. **Build for production**
   ```bash
   # tRPC package
   bun nx build trpc-server
   
   # API server
   bun nx build server
   
   # Web app
   bun nx build web
   
   # Desktop app
   bun nx build desktop
   ```

6. **Run E2E tests**
   ```bash
   bun nx e2e e2e
   ```

### Project Structure

```
apps/
├── web/           # React 19 web application (Vite)
├── desktop/       # Electron desktop app (✅ implemented)
├── server/        # Fastify API server (✅ implemented)
└── e2e/           # Cross-platform E2E tests

lib/
├── db/            # Database connection and utilities
├── schema/        # Drizzle ORM schema and migrations
└── trpc-server/   # tRPC router and procedures

scripts/
└── db-setup.sh    # Database initialization script

postgres/
└── init/          # PostgreSQL initialization scripts

llm/
├── CLAUDE.md      # Project context for AI
├── better-auth.md # Better-auth documentation
└── ElectricSQL.md # Legacy documentation
```

### Available Commands

**Development:**
- `bun run web` - Start web development server (localhost:4200)
- `bun run server` - Start API server (localhost:3333)
- `bun run trpc` - Start tRPC package watcher
- `bun run electron` - Start Electron desktop app
- `bun nx build web` - Build web app for production  
- `bun nx build server` - Build API server for production
- `bun nx build trpc-server` - Build tRPC package
- `bun nx build desktop` - Build desktop app for production

**Code Quality:**
- `bun run format` - Format code with Biome
- `bun run lint` - Run Biome linter  
- `bun nx test web` - Run unit tests
- `bun nx e2e e2e` - Run E2E tests

**Database:**
- `./scripts/db-setup.sh` - Set up PostgreSQL database
- `bun db:studio` - Open Drizzle Studio
- `bun db:generate` - Generate migrations
- `bun db:migrate` - Apply migrations

**Utilities:**
- `bun nx graph` - View dependency graph
- `bun nx sync` - Sync workspace configurations
- `bunx nx-mcp` - Start MCP server for AI integration

## Roadmap

**✅ Completed:**
- [x] Initial Nx monorepo setup with Bun
- [x] Biome integration for code quality (replaced Prettier/ESLint)
- [x] React 19 foundation with TanStack Router for type-safe routing
- [x] HeroUI design system with Tailwind CSS integration
- [x] Better-auth authentication with email/password and Google OAuth
- [x] PostgreSQL database with Docker setup
- [x] Drizzle ORM for type-safe database operations
- [x] Fastify API server with tRPC integration
- [x] Electron desktop app implementation
- [x] MCP server integration for AI development
- [x] TypeScript configuration across all projects
- [x] Cross-platform development workflow
- [x] Authentication middleware and route protection

**🚧 Next Steps:**
- [ ] Implement rich text editor (Block Notes for web)
- [ ] Add React Native mobile app with Expo
- [ ] Implement Tentap Editor (mobile)
- [ ] Create shared packages for business logic
- [ ] Add user dashboard and note management features

**📋 Future:**
- [ ] SST infrastructure setup
- [ ] Auto-updater for Electron app
- [ ] Mobile app store deployment
- [ ] Performance optimizations

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

**Core:**
- **Monorepo**: Nx 21 with Bun package manager
- **Web**: React 19, TypeScript, Vite, TanStack Router
- **UI**: HeroUI design system with Tailwind CSS
- **Auth**: Better-auth (email/password + Google OAuth)
- **Backend**: Fastify API server with tRPC
- **Database**: PostgreSQL with Drizzle ORM
- **Desktop**: Electron with nx-electron
- **Mobile**: React Native with Expo (planned)

**Development:**
- **Code Quality**: Biome (formatting & linting) - NO ESLint/Prettier
- **Testing**: Vitest (unit), Playwright (E2E)
- **AI Integration**: Nx MCP Server for Claude Code

**Planned:**
- **Rich Text**: Block Notes (web), Tentap Editor (mobile)
- **Infrastructure**: SST (AWS deployment)

## Mobile Integration Plan

### Rich Text Editor Strategy

**Tentap Editor** has been selected for React Native based on:
- Similar API to Block Notes
- TypeScript-first development
- Extensible plugin system
- ProseMirror foundation (same as Block Notes)

### Example Integration (Ready for Implementation)

```typescript
// packages/editor-shared/types.ts
export interface UniversalEditorContent {
  type: 'doc';
  content: Block[];
}

export interface Block {
  type: 'paragraph' | 'heading' | 'bulletList';
  content?: InlineContent[];
  attrs?: Record<string, any>;
}

// packages/editor-web/BlockNotesEditor.tsx  
import { BlockNoteEditor } from '@blocknote/react';
import type { UniversalEditorContent } from '@codo.ing/editor-shared';

export const WebEditor = ({ content, onChange }) => (
  <BlockNoteEditor
    initialContent={content}
    onEditorContentChange={(editor) => {
      onChange(editor.document);
    }}
  />
);

// packages/editor-mobile/TentapEditor.tsx
import { RichText, useEditorBridge } from '@10play/tentap-editor';
import type { UniversalEditorContent } from '@codo.ing/editor-shared';

export const MobileEditor = ({ content, onChange }) => {
  const editor = useEditorBridge({
    initialContent: content,
    onChange: (newContent) => onChange(newContent),
  });

  return <RichText editor={editor} />;
};

// Ready for your database schema
// Electric-SQL, Drizzle, Prisma, or your preferred solution
```

This architecture ensures:
- **Unified data model** across all platforms
- **Database-agnostic design** ready for any backend
- **Platform-optimized editors** while maintaining consistency
- **Clean separation** between UI and data layers