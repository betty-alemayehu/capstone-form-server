//poseController.js
import { getPoseById } from "../models/Pose.js";

// Fetch a pose by ID
export const fetchPoseById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Pose ID is required." });
  }

  try {
    const pose = await getPoseById(id); // Use model function
    if (!pose) {
      return res.status(404).json({ error: "Pose not found." });
    }
    res.status(200).json(pose);
  } catch (error) {
    console.error("Error fetching pose by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch pose by ID." });
  }
};
