import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Savings",
        "Shopping",
        "Health",
        "Bills",
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
    initialBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Account = mongoose.model("Account", accountSchema);

export default Account;
