import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); //Returns a list of users for the sidebar. Only accessible if authenticated.
router.get("/:id", protectRoute, getMessages);  //returns messages for a specific user or conversation

router.post("/send/:id", protectRoute, sendMessage); //Sends a message to the user with the given id

export default router;
