import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handeTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast("nhiệm vụ đã xoá");
      handeTaskChanged();
    } catch (error) {
      console.log("lỗi xảy ra khi xoá task", error);
      toast.error("lỗi xảy ra khi xoá nhiệm vụ");
    }
  };

  const updateTasks = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTitle,
      });
      toast.success(`nhiệm vụ đã đổi thành ${updateTitle}`);
      handeTaskChanged();
    } catch (error) {
      console.log("lỗi xảy ra khi update task", error);
      toast.error("lỗi xảy ra khi cập nhập nhiệm vụ");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completeAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completeAt: null,
        });
        toast.success(
          `${task.title} đã đổi ngược về trạng thái chưa hoàn thành`,
        );
      }
      handeTaskChanged();
    } catch (error) {
      console.log("lỗi xảy ra khi update task", error);
      toast.error("lỗi xảy ra khi cập nhập nhiệm vụ");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTasks();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiện thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0 flex flex-col items-start">
          {isEditting ? (
            <Input
              placeholder="bạn cần phải làm gì"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 "
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}

          {/* ngày tạo và hoàn thành*/}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completeAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completeAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* chỉnh và xóa*/}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* xóa*/}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
