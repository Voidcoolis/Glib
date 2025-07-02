import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';

dotenv.config(); // Load environment variables from .env file
const app = express();

const PORT = process.env.PORT;

//middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies(to grab the token from the cookies and add it to the auth.middleware.js)
app.use(cookieParser());

// Route for authentification
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB(); // connects to MongoDB database
})