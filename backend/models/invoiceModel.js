import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  invoiceId: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paidDate: {
    type: Date,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
  paymentMethodType: {
    type: String,
    required: false,
  },
  paymentMethodLast4: {
    type: String,
    required: false,
  },
  receiptUrl: {
    type: String,
    required: false,
  },
  billingAddress: {
    type: Object,
    required: false,
  },
});
