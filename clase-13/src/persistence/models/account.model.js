import mongoose from "mongoose";

const accountCollection = "accounts";

const accountSchema = new mongoose.Schema({
  accountNumber: Number,
  alias: String,
  balance: { type: Number, default: 0 },
  userId: String,
});

export const accountModel = mongoose.model(accountCollection, accountSchema);
