import express from "express";
import tasksRoute from "./routes/tasksRoute.js";
import { connectDB } from "./config/db.js";
import dotevn from "dotenv";
import cors from "cors";

dotevn.config();

const PORT = process.env.PORT || 5001;

const app = express();
//midware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", tasksRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng 5001 ${PORT}`);
  });
});
