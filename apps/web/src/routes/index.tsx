import { useUser } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-blue-900">Codo.ing</h1>
        <p className="text-gray-600">A cross-platform collaborative note-taking application</p>
        <div className="mt-2 text-sm text-red-500">
          If you see colors and styling, Tailwind is working!
        </div>
      </div>

      {isSignedIn ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Welcome back, {user?.firstName || 'User'}!</h2>
          <p className="text-gray-600">Your collaborative workspace is ready.</p>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">
              Database integration coming soon. Jazz has been removed and ready for your preferred
              data solution.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Get Started</h2>
          <p className="text-gray-600">Sign in to access your collaborative workspace.</p>
        </div>
      )}
    </div>
  );
}
