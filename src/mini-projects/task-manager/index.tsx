import { useEffect, useReducer } from "react";
import { TaskInput } from "./task-input";
import { TaskList } from "./task-list";
import { taskReducer } from "./reducer";
import { TaskDispatchContext, TasksContext } from "./context";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialTasks } from "./mock-data";

function TaskManager() {
  const { get, set } = useLocalStorage("tasks", initialTasks);
  // state
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    try {
      const stored = get();
      return stored;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    console.log("Effect runs");
    set(tasks);
  }, [tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        <div className="w-full mt-4 space-y-4">
          {/*Task input*/}
          <TaskInput />
          {/*Task List*/}
          <div>
            <h2>Task List</h2>
            <TaskList />
          </div>
        </div>
      </TaskDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export { TaskManager };
