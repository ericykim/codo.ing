import { createFileRoute } from "@tanstack/react-router";
import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { trpc } from "../../trpc";
import { useSession } from "../../hooks/useSession";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: session } = useSession();
  const { data: greeting, isLoading } = trpc.test.hello.useQuery({
    name: session?.user?.name || "Developer",
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-blue-900">
          Welcome back, {session?.user?.name || session?.user?.email}!
        </h1>
        <p className="text-gray-600">
          Your collaborative workspace is ready. Start creating and sharing your notes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-gray-600">
          This is your personal dashboard where you can manage your notes, 
          collaborate with others, and organize your thoughts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardBody>
              <h3 className="font-semibold mb-2">Recent Notes</h3>
              <p className="text-sm text-gray-600">Your recently edited notes will appear here.</p>
            </CardBody>
          </Card>
          
          <Card className="p-4">
            <CardBody>
              <h3 className="font-semibold mb-2">Shared with You</h3>
              <p className="text-sm text-gray-600">Notes that others have shared with you.</p>
            </CardBody>
          </Card>
          
          <Card className="p-4">
            <CardBody>
              <h3 className="font-semibold mb-2">Team Activity</h3>
              <p className="text-sm text-gray-600">Recent activity from your team members.</p>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">API Connection Test</h2>
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