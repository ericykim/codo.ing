import { createFileRoute } from "@tanstack/react-router";
import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { trpc } from "../trpc";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  // Temporary: No auth state (allow access to all routes)
  const { data: greeting, isLoading } = trpc.test.hello.useQuery({
    name: "World",
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-blue-900">Codo.ing</h1>
        <p className="text-gray-600">
          A cross-platform collaborative note-taking application
        </p>
        <div className="mt-2 text-sm text-red-500">
          If you see colors and styling, Tailwind is working!
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Welcome to Codo.ing</h2>
        <p className="text-gray-600">
          Authentication system migration in progress. All routes are
          temporarily accessible.
        </p>
        <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            🚧 Currently migrating from Clerk to Better-auth. Authentication
            features coming soon.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">
            Database integration ready for your preferred data solution.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">tRPC Test</h2>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <p className="text-green-600 font-medium">{greeting?.greeting}</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
