import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body; //! to make it work add middleware in index.js to parse JSON bodies
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" }); //if any field is empty
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the generated salt

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here since user is saved in the database (adjust the time of expiration in the utils.js file)
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  req.send("Login endpoint");
};

export const logout = (req, res) => {
  req.send("Logout endpoint");
};
