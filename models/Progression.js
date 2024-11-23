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
