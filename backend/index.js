import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/urls", urlsRoutes);
app.use("", indexRoutes);
// app.use("/api/urls/qr", qrRoutes);

// Error handling
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server is running at PORT ${PORT}`);
});
