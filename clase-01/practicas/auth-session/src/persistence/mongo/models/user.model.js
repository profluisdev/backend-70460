import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  email: {
    type: String,
    unique: true
  },
  age: Number
})

export const userModel = mongoose.model(userCollection, userSchema);