import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/books.js";
import magazineRoutes from "./routes/magazines.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3434;

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/magazines", magazineRoutes);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Mongo connection error:", err));
