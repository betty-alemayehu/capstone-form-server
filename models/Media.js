//models/Media.js
import db from "../db/dbConfig.js";

// Get all media for a specific progression
export const getMediaByProgressionId = async (progressionId) => {
  return await db("media").where({ progression_id: progressionId }).select("*");
};

// Add a new media record
export const addMedia = async (mediaData) => {
  const [newMedia] = await db("media").insert(mediaData);
  return newMedia;
};

// Update an existing media record
export const updateMedia = async (id, updates) => {
  const [updatedMedia] = await db("media").where({ id }).update(updates);
  // .returning("*"); //doesn't exist in sql - how to return all?
  return updatedMedia;
};

// Delete a media record
export const deleteMedia = async (id) => {
  await db("media").where({ id }).del();
};

// Get all media for a specific user and pose
export const getMediaByUserAndPose = async (userId, poseId) => {
  return await db("media")
    .join("progressions", "media.progression_id", "=", "progressions.id")
    .where({
      "progressions.user_id": userId,
      "progressions.pose_id": poseId,
    })
    .select("media.*")
    .orderBy("media.created_at", "desc");
};
