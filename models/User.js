import db from "../db/dbConfig.js";

export const createUser = async (userData) => {
  const [id] = await db("users").insert(userData); // Insert the user, return only the ID
  const user = await db("users").where({ id }).first(); // Fetch the full user record
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await db("users").where({ email }).first();
  return user;
};

export const userById = async (id) => {
  const user = await db("users").where({ id }).first();
  return user;
};
