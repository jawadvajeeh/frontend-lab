import type { TaskItem, TaskPriority } from "./types";
import { useTaskDispatchContext } from "./context";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeVariants } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";

type TaskItemProps = {
  taskItem: TaskItem;
};

function getVariantByPriotity(priority: TaskPriority): BadgeVariants {
  switch (priority) {
    case "low":
      return "safe";
    case "medium":
      return "attention";
    case "high":
      return "urgency";
    default:
      return "default";
  }
}

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
            <Text className="text-fs-sm font-semibold">{taskItem.title}</Text>
            <Text className="text-fs-xs">{taskItem.description}</Text>
          </div>
        </div>

        <Text
          as="span"
          className="text-fs-xs font-semibold text-muted-foreground"
        >
          {isCompleted ? "Completed" : "Active"}
        </Text>
      </div>

      <div className="flex items-center">
        <Badge variant={getVariantByPriotity(taskItem.priority)}>
          {taskItem.priority}
        </Badge>
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
