import AddTask from "@/components/AddTask";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import TaskAndfilters from "@/components/TaskAndfilters";
import TaskList from "@/components/TaskList";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import api from "@/lib/axios";
import DatetimeFillter from "@/components/DatetimeFillter";
import TaskListPagination from "@/components/TaskListPagination";
import { visibleTaskLimit } from "@/lib/data";

function HomePage() {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTask();
  }, [dateQuery]);

  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("lỗi xảy ra khi truy xuất tasks", error);
      toast.error("lỗi xảy ra khi truy xuất task");
    }
  };

  const handleTaskChanged = () => {
    fetchTask();
  };

  const handleNext = (e) => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit,
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Purple Glow Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(173, 109, 244, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />
          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          {/* Thống kê và bộ lọc */}
          <TaskAndfilters
            fillter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <TaskList
            fillterTasks={visibleTask}
            fillter={filter}
            handeTaskChanged={handleTaskChanged}
          />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DatetimeFillter
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>
          <Footer
            activeTaskCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
