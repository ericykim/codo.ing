import { Button, Input } from '@heroui/react';
import { Group } from 'jazz-tools';
import { useAccount } from 'jazz-tools/react';
import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { TodoAccount, TodoProject } from '../schema';

export function NewProjectForm() {
  const [title, setTitle] = useState('');
  const { me } = useAccount(TodoAccount, {
    resolve: { root: { projects: { $each: { $onError: null } } } },
  });
  const navigate = useNavigate();

  const projects = me?.root?.projects;

  const createProject = useCallback(
    (projectTitle: string) => {
      if (!projects || !projectTitle.trim()) return;

      const projectGroup = Group.create();

      const project = TodoProject.create(
        {
          title: projectTitle.trim(),
          tasks: [],
        },
        { owner: projectGroup },
      );

      projects?.$jazz.push(project);
      setTitle('');
      navigate({ to: `/project/${project.$jazz.id}` });
    },
    [projects, navigate],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(title);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <Input
        label="Create New Project"
        placeholder="New project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="submit" 
        color="primary"
        disabled={!title.trim()}
      >
        Create
      </Button>
    </form>
  );
}