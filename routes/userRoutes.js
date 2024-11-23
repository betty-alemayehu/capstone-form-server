import express from "express";
import {
  registerUser,
  loginUser,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// User routes grouped under "/users"
router
  .route("/")
  .get(fetchAllUsers) // GET /users - Fetch all users
  .post(registerUser); // POST /users - Register a new user

router
  .route("/:id")
  .get(fetchUserById) // GET /users/:id - Fetch a user by ID
  .put(updateUserById) // PUT /users/:id - Update user details
  .delete(deleteUser); // DELETE /users/:id - Delete a user by ID

// Login route (separate because it's not strictly resource-based)
router.post("/login", loginUser); // POST /users/login - User login

export default router;
