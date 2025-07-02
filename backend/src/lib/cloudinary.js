import { v2 as cloudinary } from "cloudinary"; //standard way to use the Cloudinary SDK
import { config } from "dotenv";

// Load environment variables from .env file
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
