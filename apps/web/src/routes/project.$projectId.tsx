import { Button, Checkbox, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useAuth } from '@clerk/clerk-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Group } from 'jazz-tools';
import { useCoState } from 'jazz-tools/react';
import { useCallback, useState } from 'react';
import { InviteButton } from '../components/InviteButton';
import { Task, TodoProject } from '../schema';

export const Route = createFileRoute('/project/$projectId')({
  component: ProjectView,
});

function ProjectView() {
  const { projectId } = Route.useParams();
  const [newTaskText, setNewTaskText] = useState('');
  const { isSignedIn } = useAuth();
  
  const project = useCoState(TodoProject, projectId, {
    resolve: {
      tasks: {
        $each: { text: {} },
      },
    },
  });

  const createTask = useCallback(() => {
    if (!project?.tasks || !newTaskText.trim()) return;

    const taskGroup = Group.create();
    const task = Task.create(
      {
        done: false,
        text: newTaskText.trim(),
        version: 1,
      },
      { owner: taskGroup },
    );

    project.tasks.$jazz.push(task);
    setNewTaskText('');
  }, [project?.tasks, newTaskText]);

  const deleteTask = useCallback(
    (task: any) => {
      if (!project?.tasks || !task) return;
      project.tasks.$jazz.remove((t) => t?.$jazz.id === task.$jazz.id);
    },
    [project?.tasks],
  );

  const toggleTask = useCallback(
    (task: any) => {
      if (task) {
        task.$jazz.set('done', !task.done);
      }
    },
    [],
  );


  if (!project) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold">{project.title}</h1>
        </div>
        <InviteButton value={project} valueHint="project" />
      </div>

      {isSignedIn && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Add new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            color="primary"
            disabled={!newTaskText.trim()}
          >
            Add Task
          </Button>
        </form>
      )}

      {!isSignedIn && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">
            You're viewing this project as a guest. Sign in to add tasks and collaborate.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Tasks ({project.tasks?.length || 0})
        </h2>
        
        {project.tasks && project.tasks.length > 0 ? (
          <Table aria-label="Todo tasks">
            <TableHeader>
              <TableColumn>DONE</TableColumn>
              <TableColumn>TASK</TableColumn>
              <TableColumn>CREATED BY</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {project.tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      isSelected={task?.done || false}
                      onValueChange={() => toggleTask(task)}
                      isDisabled={!isSignedIn}
                    />
                  </TableCell>
                  <TableCell>
                    <span className={task?.done ? 'line-through opacity-60' : ''}>
                      {task?.text?.toString() || 'Untitled task'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      You
                    </span>
                  </TableCell>
                  <TableCell>
                    {isSignedIn ? (
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => deleteTask(task)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <span className="text-gray-400 text-sm">Read-only</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">No tasks yet. Add one above to get started!</p>
        )}
      </div>
    </div>
  );
}