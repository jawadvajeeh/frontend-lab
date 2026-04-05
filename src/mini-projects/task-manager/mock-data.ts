import type { TaskItem } from "./types";

export const initialTasks: TaskItem[] = [
  {
    id: "1a2b3c",
    title: "Fix login bug",
    description: "Resolve issue with authentication redirect",
    priority: "high",
    status: "new",
    createdAt: new Date("2026-04-01T10:15:00Z"),
    updatedAt: new Date("2026-04-01T10:15:00Z"),
  },
  {
    id: "4d5e6f",
    title: "Update dependencies",
    description: "Upgrade React and related packages",
    priority: "medium",
    status: "completed",
    createdAt: new Date("2026-03-28T08:00:00Z"),
    updatedAt: new Date("2026-03-29T09:30:00Z"),
  },
  {
    id: "7g8h9i",
    title: "Design dashboard UI",
    description: "Create wireframes for admin dashboard",
    priority: "high",
    status: "new",
    createdAt: new Date("2026-04-02T14:20:00Z"),
    updatedAt: new Date("2026-04-02T14:20:00Z"),
  },
  {
    id: "j1k2l3",
    title: "Write unit tests",
    description: "Add tests for task reducer logic",
    priority: "low",
    status: "completed",
    createdAt: new Date("2026-03-25T12:00:00Z"),
    updatedAt: new Date("2026-03-26T15:45:00Z"),
  },
  {
    id: "m4n5o6",
    title: "Implement dark mode",
    description: "Add theme toggle and persist preference",
    priority: "medium",
    status: "new",
    createdAt: new Date("2026-04-03T09:10:00Z"),
    updatedAt: new Date("2026-04-03T09:10:00Z"),
  },
];
