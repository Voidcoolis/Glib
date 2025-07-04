import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file
const app = express();

const PORT = process.env.PORT;

//! middleware to parse JSON bodies with increased limit (for the profile pic)
//! if you don't specify the limit, it defaults to 100kb, which is not enough for some images
app.use(express.json({ limit: "2mb" }));
//middleware to parse URL-encoded bodies (optional, but recommended if you receive form data)
app.use(express.urlencoded({ limit: "2mb", extended: true }));

// Middleware to parse cookies(to grab the token from the cookies and add it to the auth.middleware.js)
app.use(cookieParser());

// CORS configuration to allow requests from the frontend
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from the frontend
  credentials: true, // Allow cookies to be sent with requests
}))

app.use("/api/auth", authRoutes); // Route for authentification
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB(); // connects to MongoDB database
})