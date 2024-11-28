//models/Pose.js
import db from "../db/dbConfig.js";

export const getPoseById = async (id) => {
  return await db("poses").where({ id }).first();
};
