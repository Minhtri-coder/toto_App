import { FillterType } from "@/lib/data";
import { Filter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const TaskAndfilters = ({
  completedTaskCount = 0,
  activeTaskCount = 0,
  fillter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center bg-transparent">
      <div className="flex items-center gap-2">
        <div className="flex items-center px-2   py-1.5 text-sm font-medium text-blue-600 bg-blue-50/60 border border-blue-100/50 rounded-lg">
          {activeTaskCount} đang làm
        </div>
        <div className="flex items-center px-2 py-1.5 text-sm font-medium text-green-600 bg-green-50/60 border border-green-100/50 rounded-lg">
          {completedTaskCount} hoàn thành
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {Object.keys(FillterType).map((type) => {
          const isActive = fillter === type;
          return (
            <Button
              key={type}
              onClick={() => setFilter(type)}
              variant={isActive ? "gadient" : "ghost"}
              className={`
                flex items-center gap-2 px-4 py-2 transition-all duration-300
                ${
                  isActive
                    ? "shadow-md scale-105"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }
              `}
            >
              <Filter
                className={`size-4 ${isActive ? "text-white" : "text-slate-400"}`}
              />
              <span className="font-medium">{FillterType[type]}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskAndfilters;
