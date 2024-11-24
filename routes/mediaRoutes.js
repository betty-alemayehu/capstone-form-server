//mediaRoutes.js
import express from "express";
import {
  fetchLatestMedia,
  fetchMediaByUserAndPose,
  addMediaRecord,
  deleteMediaRecord,
} from "../controllers/mediaController.js";
import {
  configureFileUpload,
  handleFileUpload,
} from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

// Upload media (handled in the upload route)
router.post("/upload", handleFileUpload, addMediaRecord);

// Fetch the latest media for a progression
router.get("/latest", fetchLatestMedia);

// Fetch media by user and pose
router.get("/user-pose", fetchMediaByUserAndPose);

// Update a media record
router.post(
  "/upload",
  configureFileUpload, // Configure file upload middleware
  handleFileUpload, // Handle file processing and attach filePath to req
  addMediaRecord // Create media record in the database
);
// Delete a media record
router.delete("/:id", deleteMediaRecord);

export default router;
