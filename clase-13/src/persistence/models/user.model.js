import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  account: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  movements: { type: [{ movement: { type: mongoose.Schema.Types.ObjectId, ref: "movements" } }] },
});

export const userModel = mongoose.model(userCollection, userSchema);
