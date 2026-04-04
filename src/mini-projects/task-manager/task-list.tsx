import { useTaskContext } from "./context";
import { MemoizedTaskListItem } from "./task-item";

function TaskList() {
  const tasks = useTaskContext();
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const activeTasksCount = totalTasksCount - completedTasksCount;
  return (
    <>
      {tasks.length === 0 ? (
        <div className="space-y-4">
          <span className="text-fs-xs">No Tasks</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-fs-xs flex gap-2">
            <p>Total Tasks: {totalTasksCount}</p>
            <p>
              Completed Tasks:
              {completedTasksCount}
            </p>
            <p>Active Tasks: {activeTasksCount}</p>
          </div>
          {tasks.map((task) => (
            <MemoizedTaskListItem key={task.id} taskItem={task} />
          ))}
        </div>
      )}
    </>
  );
}

export { TaskList };
