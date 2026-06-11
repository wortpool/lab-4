export const storageKey = "unidone.tasks";

export const columns = [
  { id: "planned", title: "Planned" },
  { id: "progress", title: "In progress" },
  { id: "done", title: "Done" },
];

export const defaultTasks = [
  {
    id: "task-build",
    title: "Налаштувати Vite build",
    priority: "high",
    status: "planned",
  },
  {
    id: "task-lint",
    title: "Запустити ESLint без помилок",
    priority: "medium",
    status: "progress",
  },
  {
    id: "task-env",
    title: "Показати режим через VITE_APP_STATUS",
    priority: "low",
    status: "done",
  },
];

export function parseTasks(savedTasks) {
  if (!savedTasks) {
    return defaultTasks;
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

export function getNextStatus(status) {
  const currentIndex = columns.findIndex((column) => column.id === status);

  if (currentIndex === -1) {
    return columns[0].id;
  }

  const nextIndex = currentIndex === columns.length - 1 ? 0 : currentIndex + 1;
  return columns[nextIndex].id;
}

export function createTask(title, priority) {
  return {
    id: `task-${Date.now()}`,
    title: title.trim(),
    priority,
    status: "planned",
  };
}
