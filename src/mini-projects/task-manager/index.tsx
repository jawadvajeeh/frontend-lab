import { useReducer } from "react";
import { TaskInput } from "./task-input";
import { TaskList } from "./task-list";
import { taskReducer } from "./reducer";
import { TaskDispatchContext, TasksContext } from "./context";

function TaskManager() {
  // state
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TasksContext.Provider value={tasks}>
      <TaskDispatchContext value={dispatch}>
        <div className="w-full mt-4 space-y-4">
          {/*Task input*/}
          <TaskInput />
          {/*Task List*/}
          <div>
            <h2>Task List</h2>
            <TaskList />
          </div>
        </div>
      </TaskDispatchContext>
    </TasksContext.Provider>
  );
}

export { TaskManager };
