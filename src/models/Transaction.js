import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Income", "Expenses"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Shopping",
        "Health",
        "Bills",
        "Savings",
        "Investment",
        "Checking",
        "Credit Card",
        "Building",
        "School",
        "Project",
        "Utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash Flow",
        "Uncategorized",
        "Education",
      ],
      required: true,
    },
    color: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
