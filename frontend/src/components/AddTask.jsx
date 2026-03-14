import React, { useState } from "react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/axios";

function AddTask({ handleNewTaskAdded }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`nhiệm vụ ${newTaskTitle} đã được thêm vào`);
        handleNewTaskAdded();
      } catch (error) {
        console.log("lỗi xảy ra khi thêm task");
        toast.error("lỗi xảy ra khi thêm nhiệm vụ mới");
        setNewTaskTitle("");
      }
    } else {
      toast.error("bạn cần nhập nội dung của nhiệm vụ");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="cần phâi làm gì"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="darkGlass"
          size="xl"
          className="px-8"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
}

export default AddTask;
