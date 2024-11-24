//server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import progressionRoutes from "./routes/progressionRoutes.js"; // Import progression routes
import mediaRoutes from "./routes/mediaRoutes.js"; // Import media routes
import poseRoutes from "./routes/poseRoutes.js"; // Import pose routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//base
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

//user routes
app.use("/users", userRoutes); //register

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
