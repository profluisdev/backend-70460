import mongoose from "mongoose";

// Función de conexión a mongo 
export const connectMongoDB = async () => {
  try {

    await mongoose.connect("mongodb://localhost:27017/70460");
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}