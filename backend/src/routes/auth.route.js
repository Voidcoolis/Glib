import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

//from controller in auth.controller.js
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//! we don't want to call this function for every single user. They should be authenticated first --> protect Route middleware
router.put("/update-profile", protectRoute, updateProfile)

//! this checks if the user is authenticated or not
router.get("/check", protectRoute, checkAuth);

export default router;