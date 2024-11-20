import db from "../db/dbConfig.js";

export const createUser = async (userData) => {
  const [user] = await db("users").insert(userData).returning("*");
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await db("users").where({ email }).first();
  return user;
};
