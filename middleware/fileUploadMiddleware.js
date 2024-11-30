//fileUploadMiddleware.js
import fileUpload from "express-fileupload";
import fs from "fs/promises";
import path from "path";

// Middleware to configure file uploads
export const configureFileUpload = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10 MB
  createParentPath: true, // Automatically create folders if needed
  abortOnLimit: true, // Abort request if file exceeds size limit
});

// Helper function to handle file uploads and generate file paths
export const handleFileUpload = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { user_id, pose_id } = req.body;
    if (!user_id || !pose_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const uploadedFile = req.files.image;

    // Generate a unique filename
    const uniqueFileName = `${user_id}_${pose_id}_${Date.now()}${path.extname(
      uploadedFile.name
    )}`;
    const uploadPath = path.join("uploads", uniqueFileName);

    // Move file to the uploads directory
    await uploadedFile.mv(uploadPath);

    // Attach the relative path to the request for further processing
    req.filePath = `/uploads/${uniqueFileName}`;

    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({ error: "File upload failed." });
  }
};
