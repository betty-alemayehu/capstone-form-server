//mediaController.js
import db from "../db/dbConfig.js";
import { Media } from "../models/Media.js";
import { deleteFile } from "../utils/fileUtils.js";
import cloudinary from "../utils/cloudinary.js";

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
      custom_media: req.filePath, // Use the Cloudinary URL
      public_id: req.publicId, // Store the Cloudinary public ID for management
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
    // Fetch the media record to get the Cloudinary public ID
    const mediaRecord = await Media.getById(id);
    if (!mediaRecord) {
      return res.status(404).json({ error: "Media record not found." });
    }

    const { user_id, pose_id, public_id } = mediaRecord;

    // Delete the file from Cloudinary
    const deleteResult = await cloudinary.uploader.destroy(public_id);
    console.log("Cloudinary delete result:", deleteResult);

    // Delete the media record from the database
    await Media.delete(id);

    // Check if any other custom media exists for the same user and pose
    const remainingMedia = await db("media")
      .where({ user_id, pose_id })
      .select("id");

    if (remainingMedia.length === 0) {
      // If no custom media exists, update progression status to "In Progress"
      await db("progressions")
        .where({ user_id, pose_id })
        .update({ status: "In Progress", updated_at: db.fn.now() });
    }

    res.status(200).json({
      message: "Media record deleted and progression updated successfully.",
    });
  } catch (error) {
    console.error("Error deleting media record:", error.message);
    res
      .status(500)
      .json({ error: "Failed to delete media record and update progression." });
  }
};
