import type { TaskItem, TaskPriority, TaskStatus } from "./types";

export type TaskAction =
  | {
      type: "created";
      payload: {
        title: string;
        description: string;
        priority: TaskPriority;
      };
    }
  | {
      type: "deleted";
      payload: {
        taskId: string;
      };
    }
  | {
      type: "updated";
      payload: {
        taskId: string;
        title?: string;
        description?: string;
        priority?: TaskPriority;
        status?: TaskStatus;
      };
    };

export function taskReducer(tasks: TaskItem[], action: TaskAction): TaskItem[] {
  const { type } = action;
  switch (type) {
    case "created":
      return [
        {
          id: crypto.randomUUID(),
          status: "new",
          title: action.payload.title,
          description: action.payload.description,
          priority: action.payload.priority,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...tasks,
      ];
    case "deleted":
      return tasks.filter((task) => task.id !== action.payload.taskId);
    case "updated":
      return tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, ...action.payload, updatedAt: new Date() };
        } else {
          return task;
        }
      });
    default:
      throw new Error(`Unhandled ${type satisfies never}`);
  }
}
