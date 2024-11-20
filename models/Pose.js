import db from "../db/dbConfig.js";

export const getAllPoses = async () => {
  return await db("poses").select("*");
};

export const getPoseById = async (id) => {
  return await db("poses").where({ id }).first();
};
