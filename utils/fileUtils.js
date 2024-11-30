//fileUtils.js
import fs from "fs/promises";
import path from "path";

// Base directory for uploads
const uploadsDir = path.resolve("uploads");

/**
 * Deletes a single file from the uploads directory.
 * Logs an error if the file is missing or cannot be deleted.
 * @param {string} filePath - The relative path to the file in the uploads folder.
 */
export const deleteFile = async (filePath) => {
  try {
    // Normalize the file path by removing the "/uploads/" prefix if it exists
    const cleanedPath = filePath.replace(/^\/uploads\//, "");
    const fullPath = path.join(uploadsDir, cleanedPath);

    console.log(`Attempting to delete file: ${fullPath}`); // Log for debugging

    // Check if the file exists
    const fileExists = await fs
      .access(fullPath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      console.warn(`File not found: ${fullPath}`);
      return; // Exit if the file doesn't exist
    }

    // Delete the file
    await fs.unlink(fullPath);
    console.log(`Deleted file: ${fullPath}`);
  } catch (error) {
    // Handle other errors (e.g., permission issues)
    console.error(`Error deleting file: ${filePath}`, error.message);
    if (error.code !== "ENOENT") {
      throw new Error(`Failed to delete file: ${filePath}`);
    }
  }
};

/**
 * Deletes multiple files from the uploads directory.
 * Errors in one file deletion will not halt the process for others.
 * @param {string[]} filePaths - Array of relative file paths.
 */
export const deleteFiles = async (filePaths) => {
  const deletionResults = await Promise.allSettled(
    filePaths.map((filePath) => deleteFile(filePath))
  );

  deletionResults.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Failed to delete file: ${filePaths[index]}`,
        result.reason
      );
    }
  });
};
