import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import paypalRoutes from "./routes/paypalRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import config from "./config/config.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();
config();

const app = express();
const corsOptions = {
  origin: ["http://localhost:8080"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/urls", urlsRoutes);
app.use("/api/paypal", paypalRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/config", configRoutes);
app.use("", indexRoutes);
// app.use("/api/urls/qr", qrRoutes);

// Error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server is running at PORT ${PORT}`);
});
