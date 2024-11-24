//server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import progressionRoutes from "./routes/progressionRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import poseRoutes from "./routes/poseRoutes.js";
import { configureFileUpload } from "./middleware/fileUploadMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(configureFileUpload); // Use file upload middleware

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from the uploads folder
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Base endpoint
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// User routes
app.use("/users", userRoutes);

// Progression routes
app.use("/progressions", progressionRoutes);

// Media routes
app.use("/media", mediaRoutes);

// Pose routes
app.use("/poses", poseRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
