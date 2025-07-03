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

//middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies(to grab the token from the cookies and add it to the auth.middleware.js)
app.use(cookieParser());

app.use("/api/auth", authRoutes); // Route for authentification
app.use("/api/message", messageRoutes)
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from the frontend
  credentials: true, // Allow cookies to be sent with requests
}))


app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB(); // connects to MongoDB database
})