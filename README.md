# Codo.ing

A cross-platform collaborative note-taking application built with Jazz for real-time collaboration and rich text editing.

## Architecture

- **Web**: React 19 app with "Hello World" foundation
- **Desktop**: Electron app (✅ **implemented**) - loads web app as renderer
- **Mobile**: React Native with Expo (planned) - will use Tentap Editor
- **Sync**: Jazz for real-time collaboration and offline-first data sync (planned)
- **Infrastructure**: SST for AWS deployment (planned)

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

3. **Start the desktop app** (requires web app to be running)
   ```bash
   # Terminal 1: Start web app
   bun nx serve web
   
   # Terminal 2: Start desktop app  
   bun nx serve desktop
   ```

4. **Build for production**
   ```bash
   # Web app
   bun nx build web
   
   # Desktop app
   bun nx build desktop
   ```

5. **Run E2E tests**
   ```bash
   bun nx e2e e2e
   ```

### Project Structure

```
apps/
├── web/           # React 19 web application (Vite)
├── desktop/       # Electron desktop app (✅ implemented)
├── e2e/           # Cross-platform E2E tests
├── mobile/        # React Native with Expo (planned)
└── server/        # Jazz sync server (planned)

packages/
├── shared/        # Shared business logic (planned)
├── ui/            # Cross-platform design system (planned)
├── editor-web/    # Block Notes integration (planned)
├── editor-mobile/ # Tentap Editor integration (planned)
└── jazz-schemas/  # Jazz data models (planned)

llm/
├── CLAUDE.md      # Project context for AI
└── llms-full.txt  # Jazz documentation
```

### Available Commands

**Development:**
- `bun nx serve web` - Start web development server (localhost:4200)
- `bun nx serve desktop` - Start Electron desktop app
- `bun nx build web` - Build web app for production  
- `bun nx build desktop` - Build desktop app for production

**Code Quality:**
- `bun run format` - Format code with Biome
- `bun run lint` - Run Biome linter  
- `bun nx test web` - Run unit tests
- `bun nx e2e e2e` - Run E2E tests

**Utilities:**
- `bun nx graph` - View dependency graph
- `bun nx sync` - Sync workspace configurations
- `bunx nx-mcp` - Start MCP server for AI integration

## Roadmap

**✅ Completed:**
- [x] Initial Nx monorepo setup with Bun
- [x] Biome integration for code quality (replaced Prettier/ESLint)
- [x] Clean "Hello World" foundation apps
- [x] Electron desktop app implementation
- [x] MCP server integration for AI development
- [x] TypeScript configuration across all projects

**🚧 Next Steps:**
- [ ] Add Jazz for collaboration and sync
- [ ] Implement Block Notes editor (web)
- [ ] Add React Native mobile app with Expo
- [ ] Implement Tentap Editor (mobile)
- [ ] Create shared packages for business logic
- [ ] Cross-platform UI component library

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
- **Web**: React 19, TypeScript, Vite
- **Desktop**: Electron with nx-electron
- **Mobile**: React Native with Expo (planned)

**Development:**
- **Code Quality**: Biome (formatting & linting)
- **Testing**: Vitest (unit), Playwright (E2E)
- **AI Integration**: Nx MCP Server for Claude Code

**Planned:**
- **Collaboration**: Jazz (CRDT-based sync with offline support)
- **Rich Text**: Block Notes (web), Tentap Editor (mobile)
- **Infrastructure**: SST (AWS deployment)

## Mobile Integration Plan

### Rich Text Editor Strategy

**Tentap Editor** has been selected for React Native based on:
- Similar API to Block Notes
- TypeScript-first development
- Extensible plugin system
- ProseMirror foundation (same as Block Notes)

### Example Integration

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

// packages/jazz-schemas/Note.ts
import { CoMap, co } from 'jazz-tools';
import type { UniversalEditorContent } from '@codo.ing/editor-shared';

export class Note extends CoMap {
  title = co.string;
  content = co.json<UniversalEditorContent>();
  updatedAt = co.number;
  createdBy = co.ref(User);
}
```

This architecture ensures:
- **Unified data model** across all platforms
- **Jazz sync compatibility** with the same schemas
- **Platform-optimized editors** while maintaining consistency
- **Gradual migration path** from simple to rich text editing