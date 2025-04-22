
import mongoose from "mongoose";

const movementCollection = "movements";

const movementSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now()},
  description: String,
  amount: Number,
  operationType: String,
  originAccountId: String,
  destinationAccountId: String,
})

export const movementModel = mongoose.model(movementCollection, movementSchema);