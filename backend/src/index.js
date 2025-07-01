import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from "./lib/db.js";

dotenv.config(); // Load environment variables from .env file
const app = express();

const PORT = process.env.PORT;

// Route for authentification
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB(); // connects to MongoDB database
})