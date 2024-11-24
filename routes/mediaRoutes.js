//mediaRoutes.js
import express from "express";
import {
  fetchLatestMedia,
  fetchMediaByUserAndPose,
} from "../controllers/mediaController.js";

const router = express.Router();

// Route to fetch the most recent media for a progression
router.get("/latest", fetchLatestMedia);

// Route to fetch all media for a specific user and pose
router.get("/user-pose", fetchMediaByUserAndPose);

export default router;
