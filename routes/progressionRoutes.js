//progressionRoutes.js
import express from "express";
import {
  fetchAllProgressions,
  fetchUserProgressions,
} from "../controllers/progressionController.js";

const router = express.Router();

// Route to fetch all progressions
router.get("/", fetchAllProgressions);

// Route to fetch progressions for a specific user
router.get("/user", fetchUserProgressions);

export default router;
