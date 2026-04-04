import { createContext, useContext } from "react";
import type { TaskItem } from "./types";
import type { TaskAction } from "./reducer";

type TaskContextType = TaskItem[];

type TaskDispatchContextType = React.ActionDispatch<[action: TaskAction]>;

export const TasksContext = createContext<TaskContextType | null>(null);
export const TaskDispatchContext =
  createContext<TaskDispatchContextType | null>(null);

export const useTaskContext = () => {
  const ctxt = useContext(TasksContext);
  if (!ctxt) throw new Error(`No Context`);
  return ctxt;
};

export const useTaskDispatchContext = () => {
  const ctxt = useContext(TaskDispatchContext);
  if (!ctxt) throw new Error(`No Context`);
  return ctxt;
};
