//server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import progressionRoutes from "./routes/progressionRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import poseRoutes from "./routes/poseRoutes.js";
import { configureFileUpload } from "./middleware/fileUploadMiddleware.js";

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(configureFileUpload); // File upload middleware

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from the uploads folder
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Base endpoint
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// API Routes
app.use("/users", userRoutes);
app.use("/progressions", progressionRoutes);
app.use("/media", mediaRoutes);
app.use("/poses", poseRoutes);

// Server setup
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
