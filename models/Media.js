//models/Media.js
import db from "../db/dbConfig.js";

export const Media = {
  // Get all media for a specific progression
  getByProgressionId: async (progressionId) => {
    return db("media").where({ progression_id: progressionId }).select("*");
  },

  // Add a new media record
  create: async (mediaData) => {
    const [newMedia] = await db("media").insert(mediaData); // Works for PostgreSQL; remove for MySQL
    return newMedia;
  },

  // Update an existing media record
  update: async (id, updates) => {
    const updatedCount = await db("media").where({ id }).update(updates);
    if (updatedCount) {
      return db("media").where({ id }).first(); // Fetch the updated record
    }
    return null; // Return null if no record was updated
  },

  // Fetch a media record by ID
  getById: async (id) => {
    return db("media").where({ id }).first();
  },

  // Delete a media record by ID
  delete: async (id) => {
    return db("media").where({ id }).del();
  },

  // Get all media for a specific user and pose
  getByUserAndPose: async (userId, poseId) => {
    return db("media")
      .join("progressions", "media.progression_id", "=", "progressions.id")
      .where({
        "progressions.user_id": userId,
        "progressions.pose_id": poseId,
      })
      .select("media.*")
      .orderBy("media.created_at", "desc");
  },
};
