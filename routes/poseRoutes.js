//poseRoutes.js
import express from "express";
import { fetchPoseById } from "../controllers/poseController.js";

const router = express.Router();

// Route to fetch a pose by ID
router.get("/:id", fetchPoseById);

export default router;
