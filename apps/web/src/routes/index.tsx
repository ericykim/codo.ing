import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1>Hello World</h1>
      <p>Welcome to Codo.ing - Your collaborative note-taking app</p>
      <p>This app works in both browser and Electron!</p>
    </div>
  );
}
