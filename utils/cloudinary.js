import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadImage = async (filePath) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(filePath);
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};
