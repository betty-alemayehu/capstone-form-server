import express from "express";
import db from "../db/dbConfig.js";

const router = express.Router();

// Fetch the most recent media for a progression
router.get("/latest", async (req, res) => {
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
      return res
        .status(404)
        .json({ error: "No media found for this progression." });
    }

    res.status(200).json(media);
  } catch (err) {
    console.error("Error fetching media:", err.message);
    res.status(500).json({ error: "Failed to fetch media." });
  }
});

export default router;
