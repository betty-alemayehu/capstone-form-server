//poseRoutes.js
import express from "express";
import { fetchAllPoses, fetchPoseById } from "../controllers/poseController.js";

const router = express.Router();

// Route to fetch all poses
router.get("/", fetchAllPoses);

// Route to fetch a pose by ID
router.get("/:id", fetchPoseById);

export default router;
