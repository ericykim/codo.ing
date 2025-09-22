import { Link } from '@heroui/react';
import { useAuth } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router';
import { useAccount } from 'jazz-tools/react';
import { TodoAccount } from '../schema';
import { NewProjectForm } from '../components/NewProjectForm';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isSignedIn } = useAuth();
  const { me } = useAccount(TodoAccount, {
    resolve: { root: { projects: { $each: { $onError: null } } } },
  });

  const projects = me?.root?.projects;

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-blue-900">Todo Projects</h1>
        <p className="text-gray-600">Create and manage collaborative todo projects</p>
        <div className="mt-2 text-sm text-red-500">
          If you see colors and styling, Tailwind is working!
        </div>
      </div>

      {isSignedIn && <NewProjectForm />}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        {projects && projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project?.$jazz.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">{project?.title || 'Untitled'}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {project?.tasks?.length || 0} tasks
                </p>
                <Link 
                  href={`/project/${project?.$jazz.id}`}
                  className="text-primary hover:underline"
                >
                  Open Project →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No projects yet. Create one above to get started!</p>
        )}
      </div>
    </div>
  );
}
