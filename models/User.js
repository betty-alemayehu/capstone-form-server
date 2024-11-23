import db from "../db/dbConfig.js";

// GET all users
export const getAllUsers = async () => {
  return db("users").select(
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

// GET user by email
export const getUserById = async (id) => {
  const user = await db("users").where({ id }).first();
  return user;
};

// DELETE user by ID
export const deleteUserById = async (id) => {
  console.log(`Executing DELETE query for user ID: ${id}`); // Debug log
  const rowsDeleted = await db("users").where({ id }).del();
  console.log(`Query result: Rows deleted: ${rowsDeleted}`); // Debug log
  return rowsDeleted;
};
