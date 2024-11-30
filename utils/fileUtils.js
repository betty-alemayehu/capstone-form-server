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
    const fullPath = path.join(uploadsDir, filePath);
    await fs.unlink(fullPath); // Delete the file
    console.log(`Deleted file: ${fullPath}`);
  } catch (error) {
    // Log and continue if file is not found or inaccessible
    if (error.code !== "ENOENT") {
      console.error(`Error deleting file: ${filePath}`, error.message);
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
