import { createUser, getUserByEmail } from "../models/User.js";

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
