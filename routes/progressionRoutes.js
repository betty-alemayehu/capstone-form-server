//progressionRoutes.js
import express from "express";
import {
  fetchAllProgressions,
  fetchUserProgressions,
  fetchProgressionById,
  updateProgression,
  getUserProgressionsWithMedia,
} from "../controllers/progressionController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch all progressions
router.get("/", fetchAllProgressions);

// Route to fetch progressions for a specific user
router.get("/user", verifyToken, fetchUserProgressions);

router.get("/user/:userId/media", getUserProgressionsWithMedia);

// Route to fetch a progression by ID
router.get("/:id", fetchProgressionById);

// Route to update a progression by user_id and pose_id
router.put("/", updateProgression);

export default router;