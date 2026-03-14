import React from "react";
import TaskEmptyStake from "./TaskEmptyStake";
import TaskCard from "./TaskCard";

function TaskList({ fillterTasks, fillter, handeTaskChanged }) {
  if (!fillterTasks || fillterTasks.length == 0) {
    return <TaskEmptyStake filter={fillter} />;
  }

  return (
    <div className="space-y-3">
      {fillterTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handeTaskChanged={handeTaskChanged}
        />
      ))}
    </div>
  );
}

export default TaskList;
