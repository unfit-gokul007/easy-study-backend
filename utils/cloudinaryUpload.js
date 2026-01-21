import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.v2.uploader.upload(filePath, {
    resource_type: "raw",
    folder: "easy-study-files",
  });

  fs.unlinkSync(filePath); // remove local file
  return result;
};
