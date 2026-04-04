export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "new" | "completed";

export type Task = {
  title: string;
  description: string;
  priority: TaskPriority;
};

export type TaskMetaData = {
  id: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskItem = Task & TaskMetaData;
