import { useId, useState } from "react";
import type { Task, TaskPriority } from "./types";
import { useTaskDispatchContext } from "./context";

function TaskInput() {
  // accessibility ids
  const taskTitleId = useId();
  const taskDescId = useId();
  const taskPriorityId = useId();
  // state
  const [taskInput, setTaskInput] = useState<Task>({
    title: "",
    description: "",
    priority: "low",
  });
  const dispatch = useTaskDispatchContext();
  const { title, description, priority } = taskInput;
  function resetTaskInput() {
    setTaskInput({ description: "", priority: "low", title: "" });
  }
  function handleTaskInputChange<K extends keyof Task>(key: K, value: Task[K]) {
    setTaskInput((prevTaskInput) => ({ ...prevTaskInput, [key]: value }));
  }
  function handleSubmit() {
    if (title.trim() !== "" && description.trim() !== "") {
      dispatch({ type: "created", payload: { description, title, priority } });
      resetTaskInput();
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor={taskTitleId}>Title</label>
            <input
              id={taskTitleId}
              type="text"
              value={title}
              onChange={(e) => handleTaskInputChange("title", e.target.value)}
              className="block border"
              placeholder="Task title"
            />
          </div>
          <div>
            <label htmlFor={taskDescId}>Description</label>
            <input
              id={taskDescId}
              type="text"
              value={description}
              onChange={(e) =>
                handleTaskInputChange("description", e.target.value)
              }
              className="block border"
              placeholder="Task description"
            />
          </div>
          <div>
            <label htmlFor={taskPriorityId}>Priority</label>
            <select
              id={taskPriorityId}
              value={priority}
              onChange={(e) =>
                handleTaskInputChange(
                  "priority",
                  e.target.value as TaskPriority,
                )
              }
              className="block border"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button className="bg-primary text-primary-foreground p-2 text-fs-sm">
          Create task
        </button>
      </form>
    </div>
  );
}

export { TaskInput };
