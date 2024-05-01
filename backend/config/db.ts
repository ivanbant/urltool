import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  // Connect to database
  try {
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Error: ${err.message}`.red.underline.bold);
    } else {
      console.log(`An error occurred: ${err}`.red.underline.bold);
    }
    process.exit(1);
  }
};

export default connectDB;
