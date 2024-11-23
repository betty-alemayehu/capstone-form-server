//models/Progression.js
import db from "../db/dbConfig.js";

// Fetch all progressions
export const getAllProgressions = async () => {
  return await db("progressions")
    .join("poses", "progressions.pose_id", "=", "poses.id")
    .select("progressions.*", "poses.english_name");
};

// Fetch progressions by user ID
export const getUserProgressions = async (userId) => {
  return await db("progressions")
    .where({ user_id: userId })
    .join("poses", "progressions.pose_id", "=", "poses.id")
    .select("progressions.*", "poses.english_name");
};

// Fetch a progression by its ID
export const getProgressionById = async (id) => {
  return await db("progressions")
    .where({ id })
    .join("poses", "progressions.pose_id", "=", "poses.id")
    .select("progressions.*", "poses.english_name")
    .first(); // Return only the first record
};

// Update a progression by user_id and pose_id
export const updateProgressionByUserAndPose = async (
  userId,
  poseId,
  status
) => {
  try {
    // Perform the update
    const rowsAffected = await db("progressions")
      .where({ user_id: userId, pose_id: poseId })
      .update({ status, updated_at: db.fn.now() });

    // Check if any rows were updated
    if (rowsAffected === 0) {
      return null; // No matching progression found
    }

    // Return the updated progression
    return await db("progressions")
      .where({ user_id: userId, pose_id: poseId })
      .first();
  } catch (error) {
    console.error(
      `Error updating progression for user_id ${userId} and pose_id ${poseId}:`,
      error.message
    );
    throw error;
  }
};
