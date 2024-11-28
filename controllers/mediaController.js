//mediaController.js
import db from "../db/dbConfig.js";
import { Media } from "../models/Media.js";

// Fetch all media for a specific user and pose
export const fetchMediaByUserAndPose = async (req, res) => {
  const { user_id, pose_id } = req.query;

  if (!user_id || !pose_id) {
    return res.status(400).json({ error: "User ID and Pose ID are required." });
  }

  try {
    const media = await Media.getByUserAndPose(user_id, pose_id);

    // Return an empty array instead of a 404 for no results
    if (!media.length) {
      console.log(
        `No media found for user_id: ${user_id}, pose_id: ${pose_id}`
      );
      return res.status(200).json([]);
    }

    res.status(200).json(media);
  } catch (err) {
    console.error("Error fetching user-pose media:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch media for the user and pose." });
  }
};

// Add a new media record (used in file upload handling) and update the progression status
export const addMediaRecord = async (req, res) => {
  const trx = await db.transaction(); // Start a transaction
  try {
    const { user_id, pose_id } = req.body;

    if (!user_id || !pose_id || !req.filePath) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Fetch the progression_id dynamically
    const progression = await trx("progressions")
      .where({ user_id, pose_id })
      .select("id")
      .first();

    if (!progression) {
      await trx.rollback();
      return res.status(404).json({
        error: "No progression found for the provided user and pose.",
      });
    }

    // Create the media record in the database
    const mediaRecord = await trx("media").insert({
      progression_id: progression.id,
      user_id,
      pose_id,
      custom_media: req.filePath, // Relative file path from middleware
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Update the progression status to "Completed"
    const updated = await trx("progressions")
      .where({ user_id, pose_id })
      .update({ status: "Completed", updated_at: db.fn.now() });

    if (updated === 0) {
      await trx.rollback();
      return res.status(404).json({
        error: "Failed to update progression status.",
      });
    }

    await trx.commit(); // Commit the transaction
    res.status(201).json({
      message: "Media record created and progression updated.",
      media: mediaRecord,
    });
  } catch (err) {
    await trx.rollback(); // Rollback the transaction on error
    console.error(
      "Error creating media record or updating progression:",
      err.message
    );
    res
      .status(500)
      .json({ error: "Failed to create media record or update progression." });
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
