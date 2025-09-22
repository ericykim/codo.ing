import { co, z } from 'jazz-tools';

// Task schema with done status, text, and version
export const Task = co.map({
  done: z.boolean(),
  text: co.plainText(),
  version: z.literal(1),
}).withMigration((task) => {
  // Migration logic for handling text field and version
  if (!task.version) {
    const textRef = task.$jazz.refs.text;
    if (!textRef) {
      task.$jazz.set('text', task.text);
    }
    task.$jazz.set('version', 1);
  }
});

// Project schema with title and list of tasks
export const TodoProject = co.map({
  title: z.string(),
  tasks: co.list(Task),
});

// Account root schema with list of projects
export const TodoAccountRoot = co.map({
  projects: co.list(TodoProject),
});

// Account schema with profile and root
export const TodoAccount = co
  .account({
    profile: co.profile(),
    root: TodoAccountRoot,
  })
  .withMigration(async (account) => {
    // Initialize account root if not set
    if (!account.$jazz.has('root')) {
      account.$jazz.set('root', {
        projects: [],
      });
    }
  });