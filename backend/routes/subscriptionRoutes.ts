import express from "express";
import {
  createSubscription,
  getInvoices,
  getInvoiceById,
  getUserSubscription,
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getUserSubscription)
  .post(protect, createSubscription);
router.route("/invoices").get(protect, getInvoices);
router.route("/invoices/:id").get(protect, getInvoiceById);

export default router;
