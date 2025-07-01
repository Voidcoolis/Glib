import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "", //not required, so default to empty string
    },
  },
  { timestamps: true }  // timestamps will add createdAt and updatedAt fields automatically
);

//created model based on the userSchema
const User = mongoose.model("User", userSchema);

export default User;
