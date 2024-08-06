import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database", error);
    // process.exit(1);
  }
};

export default connectToDatabase;
