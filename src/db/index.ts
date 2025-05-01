import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URL}`);
    console.log(
      `\n> MongoDB connected !!\n> DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED:", error);
    process.exit(1);
  }
};

export default connectDB;
