import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Import user routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//base
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

//user routes
app.use("/api/users", userRoutes); //register

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
