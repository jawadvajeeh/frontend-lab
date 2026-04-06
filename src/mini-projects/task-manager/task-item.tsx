import type { TaskItem } from "./types";
import { useTaskDispatchContext } from "./context";
import React from "react";
import { Button } from "@/components/ui/button";

type TaskItemProps = {
  taskItem: TaskItem;
};

function TaskListItem({ taskItem }: TaskItemProps) {
  const isCompleted = taskItem.status === "completed";
  const dispatch = useTaskDispatchContext();
  console.log(`Task Item ${taskItem.id} rendering..`);

  return (
    <div key={taskItem.id} className="w-full border p-4 space-y-4">
      <div className="flex justify-between">
        <div className="flex items-start gap-2">
          <input
            checked={isCompleted}
            onChange={() => {
              dispatch({
                type: "updated",
                payload: {
                  status: isCompleted ? "new" : "completed",
                  taskId: taskItem.id,
                },
              });
            }}
            type="checkbox"
            className="mt-1 block w-4 h-4"
          />
          <div className="flex flex-col">
            <p className="text-fs-sm font-semibold">{taskItem.title}</p>
            <p className="text-fs-sm">{taskItem.description}</p>
          </div>
        </div>

        <span className="text-fs-xs font-bold">
          {isCompleted ? "Completed" : "Active"}
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-fs-xs font-semibold bg-secondary px-2 py-1 rounded-lg">
          {taskItem.priority}
        </span>
        <div className="flex text-fs-xs ml-auto font-semibold">
          <Button variant={`ghost`} className="text-fs-xs">
            Edit
          </Button>
          <Button
            variant={`ghost`}
            className="text-fs-xs text-destructive"
            onClick={() =>
              dispatch({ type: "deleted", payload: { taskId: taskItem.id } })
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

const MemoizedTaskListItem = React.memo(TaskListItem);

export { TaskListItem, MemoizedTaskListItem };
