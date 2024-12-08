//fileUploadMiddleware.js
import fileUpload from "express-fileupload";
import cloudinary from "../utils/cloudinary.js";

// Middleware to configure file uploads with express-fileupload
export const configureFileUpload = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10 MB
  createParentPath: true, // Automatically create folders if needed
  abortOnLimit: true, // Abort request if file exceeds size limit
});

// Middleware to handle file uploads and upload to Cloudinary
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

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
      folder: "bodylingo/uploads", // Organize files into a folder in Cloudinary
      public_id: `${user_id}_${pose_id}_${Date.now()}`, // Optional: Generate a unique public ID
    });

    // Attach the Cloudinary URL and public ID to the request
    req.filePath = result.secure_url; // URL for accessing the file
    req.publicId = result.public_id; // Public ID for managing the file

    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error("Error during file upload to Cloudinary:", err);
    res.status(500).json({ error: "File upload failed." });
  }
};
