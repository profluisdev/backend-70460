
import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true},
  password: String
})

export const userModel = mongoose.model(userCollection, userSchema);