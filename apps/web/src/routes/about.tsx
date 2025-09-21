import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <h1>About Codo.ing</h1>
      <p>A cross-platform collaborative note-taking application.</p>
      <h2>Technology Stack</h2>
      <ul className="list-disc list-inside">
        <li>React 19 with TanStack Router</li>
        <li>TypeScript</li>
        <li>Vite</li>
        <li>Electron for desktop</li>
        <li>Jazz for collaboration (coming soon)</li>
        <li>Block Notes for rich text editing (coming soon)</li>
      </ul>
    </div>
  );
}
