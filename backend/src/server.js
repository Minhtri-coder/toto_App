import express from "express";
import tasksRoute from "./routes/tasksRoute.js";
import { connectDB } from "./config/db.js";
import dotevn from "dotenv";
import cors from "cors";
import path from "path";

dotevn.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
//midware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", tasksRoute);

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

if (process.env.NODE_ENV === "production") {
  // Dùng ".." để nhảy ra khỏi thư mục backend
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng 5001 ${PORT}`);
  });
});
