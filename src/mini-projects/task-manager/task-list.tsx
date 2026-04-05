import { Text } from "@/components/ui/text";
import { useTaskContext } from "./context";
import { MemoizedTaskListItem } from "./task-item";
import { useState } from "react";
import type { TaskItem, TaskPriority } from "./types";

type Filter = null | "all" | "active" | "completed";
type SortBy = "default" | "createdAt-desc" | "createdAt-asc" | "priority";
const priorityOrder: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function sortTasks(tasks: TaskItem[], sortBy: SortBy): TaskItem[] {
  if (sortBy === "default") return tasks;

  const sorted = [...tasks];

  switch (sortBy) {
    case "createdAt-desc":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );

    case "createdAt-asc":
      return sorted.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );

    case "priority":
      return sorted.sort((a, b) => {
        const aPriority = a.priority ? priorityOrder[a.priority] : 0;
        const bPriority = b.priority ? priorityOrder[b.priority] : 0;
        return bPriority - aPriority;
      });

    default:
      return sorted;
  }
}

function getVisibleTasks(
  tasks: TaskItem[],
  filter: Filter,
  sortBy: SortBy,
): TaskItem[] {
  const filteredTasks = getFilteredTasks(tasks, filter);
  return getSortedTasks(filteredTasks, sortBy);
}

function getFilteredTasks(tasks: TaskItem[], filter: Filter): TaskItem[] {
  return tasks.filter((task) => {
    if (filter === "all" || filter === null) {
      return true;
    } else if (filter === "active") {
      return task.status === "new";
    } else {
      return task.status === "completed";
    }
  });
}

function getSortedTasks(tasks: TaskItem[], sortBy: SortBy): TaskItem[] {
  const sorted = [...tasks];
  return sortTasks(sorted, sortBy);
}

function TaskList() {
  const tasks = useTaskContext();
  const [activeFilter, setActiveFilter] = useState<Filter>(null);
  const [sortBy, setSortBy] = useState<SortBy>("default");

  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const activeTasksCount = totalTasksCount - completedTasksCount;
  const visibleTasks = getVisibleTasks(tasks, activeFilter, sortBy);

  function handleFilterChange(filter: Filter) {
    setActiveFilter((prevFilter) => {
      if (prevFilter === filter) return null;
      return filter;
    });
  }

  return (
    <>
      {tasks.length === 0 ? (
        <div className="space-y-4">
          <Text as="span" className="text-fs-xs">
            No Tasks.
          </Text>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-fs-xs">Filter:</Text>
              <div className="text-fs-xs flex gap-2">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`${activeFilter === "all" && "border-2"} px-2 py-1`}
                >
                  All {totalTasksCount}
                </button>
                <button
                  onClick={() => handleFilterChange("active")}
                  className={`${activeFilter === "active" && "border-2"} px-2 py-1`}
                >
                  Active {activeTasksCount}
                </button>
                <button
                  onClick={() => handleFilterChange("completed")}
                  className={`${activeFilter === "completed" && "border-2"} px-2 py-1`}
                >
                  Completed {completedTasksCount}
                </button>
              </div>
            </div>
            <div className="text-fs-xs">
              <Text className="text-fs-xs">Sort by:</Text>
              <select onChange={(e) => setSortBy(e.target.value as SortBy)}>
                <option value="default">Select</option>
                <option value="createdAt-desc">Newest</option>
                <option value="createdAt-asc">Oldest</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          {visibleTasks.map((task) => (
            <MemoizedTaskListItem key={task.id} taskItem={task} />
          ))}
        </div>
      )}
    </>
  );
}

export { TaskList };
