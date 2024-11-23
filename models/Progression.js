//models/Progression.js
import db from "../db/dbConfig.js";

export const getUserProgressions = async (userId) => {
  return await db("progressions")
    .where({ user_id: userId })
    .join("poses", "progressions.pose_id", "=", "poses.id")
    .select("progressions.*", "poses.english_name");
};

export const updateProgression = async (id, status) => {
  return await db("progressions").where({ id }).update({ status });
  // .returning("*"); //doesn't exist in sql - how to return all?
};
