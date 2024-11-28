//progressionController.js
import {
  getAllProgressions,
  getUserProgressions,
  getProgressionById,
  getProgressionsWithMedia,
} from "../models/Progression.js";

// Fetch all progressions
export const fetchAllProgressions = async (req, res) => {
  try {
    console.log("Fetching all progressions");

    const progressions = await getAllProgressions();

    if (!progressions || progressions.length === 0) {
      return res.status(404).json({ message: "No progressions found." });
    }

    res.status(200).json(progressions);
  } catch (error) {
    console.error("Error fetching progressions:", error.message);
    res.status(500).json({ error: "Failed to fetch progressions." });
  }
};

// Fetch progressions by user ID
export const fetchUserProgressions = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    console.log(`Fetching progressions for user_id: ${user_id}`);
    const progressions = await getUserProgressions(user_id);

    if (!progressions || progressions.length === 0) {
      return res
        .status(404)
        .json({ message: "No progressions found for this user." });
    }

    res.status(200).json(progressions);
  } catch (error) {
    console.error("Error fetching user progressions:", error.message);
    res.status(500).json({ error: "Failed to fetch user progressions." });
  }
};

// Fetch progression by progression ID
export const fetchProgressionById = async (req, res) => {
  const { id } = req.params; // Extract the progression ID from route parameters

  if (!id) {
    return res.status(400).json({ error: "Progression ID is required." });
  }

  try {
    const progression = await getProgressionById(id);

    if (!progression) {
      return res.status(404).json({ message: "Progression not found." });
    }

    res.status(200).json(progression);
  } catch (error) {
    console.error("Error fetching progression by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch progression." });
  }
};

// controllers/progressionController.js
export const getUserProgressionsWithMedia = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await getProgressionsWithMedia(userId);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching progressions with media:", error);
    res
      .status(500)
      .json({ message: "Failed to load progressions with media.", error });
  }
};
