//mediaController.js
import path from "path";
import { Media } from "../models/Media.js";

// Fetch the most recent media for a progression
export const fetchLatestMedia = async (req, res) => {
  const { progression_id } = req.query;

  if (!progression_id) {
    return res.status(400).json({ error: "Progression ID is required." });
  }

  try {
    const media = await Media.getByProgressionId(progression_id);
    if (!media.length) {
      return res.status(200).json(null); // Return null if no media found
    }

    const latestMedia = media[0]; // The most recent media is the first item when ordered by `created_at`
    res.status(200).json(latestMedia);
  } catch (err) {
    console.error("Error fetching media:", err.message);
    res.status(500).json({ error: "Failed to fetch media." });
  }
};

// Fetch all media for a specific user and pose
export const fetchMediaByUserAndPose = async (req, res) => {
  const { user_id, pose_id } = req.query;

  // Validate required parameters
  if (!user_id || !pose_id) {
    return res.status(400).json({ error: "User ID and Pose ID are required." });
  }

  try {
    // Fetch media from the database
    const media = await Media.getByUserAndPose(user_id, pose_id);

    if (!media.length) {
      return res
        .status(404)
        .json({ message: "No media found for this pose and user." });
    }

    res.status(200).json(media);
  } catch (err) {
    console.error("Error fetching user-pose media:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch media for the user and pose." });
  }
};

// Add a new media record (used in file upload handling)
export const addMediaRecord = async (req, res) => {
  try {
    const { progression_id, user_id, pose_id } = req.body;

    if (!progression_id || !user_id || !pose_id || !req.filePath) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create the media record in the database
    const mediaRecord = await Media.create({
      progression_id,
      user_id,
      pose_id,
      custom_media: req.filePath, // Relative file path from middleware
      created_at: new Date(),
      updated_at: new Date(),
    });

    res
      .status(201)
      .json({ message: "Media record created.", media: mediaRecord });
  } catch (err) {
    console.error("Error creating media record:", err.message);
    res.status(500).json({ error: "Failed to create media record." });
  }
};

// Update a media record
export const updateMediaRecord = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedMedia = await Media.update(id, updates);
    if (!updatedMedia) {
      return res.status(404).json({ error: "Media record not found." });
    }

    res.status(200).json(updatedMedia);
  } catch (err) {
    console.error("Error updating media record:", err.message);
    res.status(500).json({ error: "Failed to update media record." });
  }
};

// Delete a media record
export const deleteMediaRecord = async (req, res) => {
  const { id } = req.params;

  try {
    await Media.delete(id);
    res.status(200).json({ message: "Media record deleted successfully." });
  } catch (err) {
    console.error("Error deleting media record:", err.message);
    res.status(500).json({ error: "Failed to delete media record." });
  }
};
