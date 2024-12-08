//fileUploadMiddleware.js
import fileUpload from "express-fileupload";
import cloudinary from "../utils/cloudinary.js";

// Middleware to configure file uploads
export const configureFileUpload = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10 MB
  createParentPath: true, // Automatically create parent directories if needed
  abortOnLimit: true, // Abort the request if file exceeds size limit
  useTempFiles: true, // Use temporary files instead of keeping files in memory
  tempFileDir: "/tmp", // Directory for storing temporary files on Heroku
});

// Middleware to handle file uploads and upload to Cloudinary
export const handleFileUpload = async (req, res, next) => {
  try {
    // Log the request body and file details for debugging
    console.log("File Upload Request Body:", req.body);
    console.log("Uploaded File Details:", req.files);

    // Check if a file is provided
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const uploadedFile = req.files.image;
    console.log("Temp file path:", uploadedFile.tempFilePath); // Log the temporary file path

    const { user_id, pose_id } = req.body;
    if (!user_id || !pose_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Upload the file to Cloudinary
    console.log("Uploading file to Cloudinary...");
    const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
      folder: "bodylingo/uploads", // Organize files into a specific folder in Cloudinary
      public_id: `${user_id}_${pose_id}_${Date.now()}`, // Generate a unique public ID
    });

    console.log("Cloudinary Upload Result:", result);

    // Attach the Cloudinary URL and public ID to the request
    req.filePath = result.secure_url; // URL for accessing the file
    req.publicId = result.public_id; // Public ID for managing the file

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error during file upload to Cloudinary:", err);
    res
      .status(500)
      .json({ error: "File upload failed.", details: err.message });
  }
};
