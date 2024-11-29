//userController.js
import {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserById,
  putUserById,
  deleteUserById,
} from "../models/User.js";

import jwt from "jsonwebtoken";

//REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const user = await createUser({ name, email, password });

    if (!user) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    res.status(201).json({
      message: "User registered successfully",
      user, // Send the full user object
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//LOGIN using authentication
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a token
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token, // Include token in the response
      user_id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

//GET user by ID
export const fetchUserById = async (req, res) => {
  const { id } = req.params; // Assume the user ID is passed as a query parameter
  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile." });
  }
};

//PUT Update user by Id
export const updateUserById = async (req, res) => {
  const { id } = req.params; // Extract user ID from route parameter
  const updates = req.body; // Extract fields to update from request body

  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // Check if the user exists
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Perform the update
    const updatedUser = await putUserById(id, updates);

    res.status(200).json({
      message: `User with ID ${id} updated successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Failed to update user." });
  }
};

//DELETE user by ID logged in using params
export const deleteUser = async (req, res) => {
  const { id } = req.params; // Get the ID from route parameters

  try {
    const deletedUser = await deleteUserById(id); // Call the model function
    res.status(200).json({
      message: `User with ID ${id} deleted successfully.`,
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to delete user." });
  }
};

//=====================================================
