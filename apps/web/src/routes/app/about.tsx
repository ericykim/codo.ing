import { createFileRoute } from '@tanstack/react-router';
import { Card, CardBody, CardHeader } from '@heroui/react';

export const Route = createFileRoute('/app/about')({
  component: About,
});

function About() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">About Codo.ing</h1>
        <p className="text-gray-600 text-lg">
          A cross-platform collaborative note-taking application designed for modern developers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Technology Stack</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                React 19 with TanStack Router
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                TypeScript for type safety
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Vite for fast development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Better-auth for authentication
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                PostgreSQL with Drizzle ORM
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                tRPC for type-safe APIs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Electron for desktop app
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Features</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Real-time collaboration
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Cross-platform support
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Rich text editing (coming soon)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Code syntax highlighting
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Team workspaces
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Mobile app (planned)
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Development Architecture</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-gray-600">
              Codo.ing is built as a modern monorepo using Nx, providing excellent 
              developer experience with hot reloading, type safety, and modular architecture.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Architecture Highlights:</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Nx monorepo for scalable development</li>
                <li>• Better-auth for secure authentication</li>
                <li>• tRPC for end-to-end type safety</li>
                <li>• HeroUI for consistent design system</li>
                <li>• Drizzle ORM for database operations</li>
                <li>• Docker for development database</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}