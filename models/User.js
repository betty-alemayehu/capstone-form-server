//models/User.js
import db from "../db/dbConfig.js";
import { deleteFiles } from "../utils/fileUtils.js";

// GET all users
export const getAllUsers = async () => {
  return await db("users").select(
    "id",
    "name",
    "email",
    "profile_picture",
    "created_at"
  );
};

// POST users
export const createUser = async (userData) => {
  const [id] = await db("users").insert(userData); // Insert the user, return only the ID
  const user = await db("users").where({ id }).first(); // Fetch the full user record
  return user;
};

// GET user by email
export const getUserByEmail = async (email) => {
  const user = await db("users").where({ email }).first();
  return user;
};

// GET user by ID
export const getUserById = async (id) => {
  const user = await db("users").where({ id }).first();
  return user;
};

// PUT Update user by ID
export const putUserById = async (id, updates) => {
  await db("users").where({ id }).update(updates);
  const updatedUser = await db("users").where({ id }).first();
  return updatedUser;
};

// DELETE user by Id
export const deleteUserById = async (id) => {
  const user = await db("users").where({ id }).first(); // Fetch user
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }

  // Fetch all associated media files for the user
  const userMedia = await db("media")
    .where({ user_id: id })
    .select("custom_media");
  const filePaths = userMedia.map((media) => media.custom_media);

  // Delete associated files
  if (filePaths.length > 0) {
    await deleteFiles(filePaths);
  }

  // Remove the user record
  await db("users").where({ id }).del();

  return user; // Return the deleted user for confirmation
};
