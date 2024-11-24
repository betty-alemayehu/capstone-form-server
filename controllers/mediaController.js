//mediaController.js
import db from "../db/dbConfig.js";

// Fetch the most recent media for a progression
export const fetchLatestMedia = async (req, res) => {
  const { progression_id } = req.query;

  if (!progression_id) {
    return res.status(400).json({ error: "Progression ID is required." });
  }

  try {
    const media = await db("media")
      .where({ progression_id })
      .orderBy("created_at", "desc")
      .first(); // Get the most recent media

    if (!media) {
      return res.status(200).json(null); // Return null if no media found
    }

    res.status(200).json(media);
  } catch (err) {
    console.error("Error fetching media:", err.message);
    res.status(500).json({ error: "Failed to fetch media." });
  }
};

// Fetch all media for a specific user and pose
export const fetchMediaByUserAndPose = async (req, res) => {
  const { user_id, pose_id } = req.query;

  if (!user_id || !pose_id) {
    return res.status(400).json({ error: "User ID and Pose ID are required." });
  }

  try {
    const media = await db("media")
      .join("progressions", "media.progression_id", "=", "progressions.id")
      .where({
        "progressions.user_id": user_id,
        "progressions.pose_id": pose_id,
      })
      .select("media.*")
      .orderBy("media.created_at", "desc"); // Order by latest media first

    if (media.length === 0) {
      return res
        .status(404)
        .json({ message: "No media found for this pose and user." });
    }

    res.status(200).json(media);
  } catch (err) {
    console.error("Error fetching user-pose media:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch media for the user and pose." });
  }
};
