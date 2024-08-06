import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./database/connection.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();

// Routes
app.use("/api/users", userRoutes);

// Test route to check server is working
app.get("/api/test", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
