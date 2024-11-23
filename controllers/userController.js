import {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserById,
  deleteUserById,
} from "../models/User.js";

//REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
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

//LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET users
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
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

//DELETE user by ID logged in using params
export const deleteUser = async (req, res) => {
  const { id } = req.params; // Extract ID from route parameters

  console.log(`Incoming DELETE request for user ID: ${id}`); // Debug log

  if (!id) {
    console.log("No ID provided"); // Debug log
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    console.log(`Attempting to delete user with ID: ${id}`); // Debug log
    const rowsDeleted = await deleteUserById(id);
    console.log(`Rows deleted: ${rowsDeleted}`); // Debug log

    if (rowsDeleted === 0) {
      console.log("User not found"); // Debug log
      return res.status(404).json({ error: "User not found." });
    }

    console.log("User deleted successfully"); // Debug log
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message); // Debug log
    return res.status(500).json({ error: "Failed to delete user." });
  }
};
