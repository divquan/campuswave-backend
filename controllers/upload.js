import { uploadImage } from "../utils/cloudinary.js";
import fs from "fs";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const upload = (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  const fileBuffer = req.files.file.data;
  const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to upload file to Cloudinary" });
    }

    // If the upload was successful, return the Cloudinary URL of the uploaded file
    res.json({ url: result.secure_url });
  });

  // Pass the file buffer to the uploadStream using the write method
  uploadStream.write(fileBuffer);
  uploadStream.end();
};
