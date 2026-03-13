import Tasks from "../model/Tasks.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;
  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    } //2025-08-04
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Tasks.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.error("lỗi khi gọi getAllTask", error);
    res.status(500).json({ message: "lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const tasks = new Tasks({ title });

    const newTask = await tasks.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("lỗi khi gọi createTask", error);
    res.status(500).json({ message: "lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completeAt } = req.body;
    const updateTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completeAt,
      },
      { new: true },
    );
    if (!updateTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(updateTask);
  } catch (error) {
    console.error("lỗi khi gọi UpdateTask", error);
    res.status(500).json({ message: "lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "nhiệm vụ không tồn tại" });
    }

    res.status(200).json(deleteTask);
  } catch (error) {
    console.error("lỗi khi gọi deleteTask", error);
    res.status(500).json({ message: "lỗi hệ thống" });
  }
};
