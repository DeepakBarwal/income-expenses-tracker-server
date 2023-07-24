import express from "express";
const router = express.Router();
import {
  createTransactionController,
  getAllTransactionsController,
  getSingleTransactionController,
  deleteTransactionController,
  updateTransactionController,
} from "../../../controllers/transactions/transactionsController.js";
import extractJwtFromHeaders from "../../../middlewares/extractJwtFromHeaders.js";

// POST /api/v1/transactions
router.post("/", extractJwtFromHeaders, createTransactionController);

// GET /api/v1/transactions
router.get("/", getAllTransactionsController);

// GET /api/v1/transactions/:id
router.get("/:id", getSingleTransactionController);

// DELETE /api/v1/transactions/:id
router.delete("/:id", deleteTransactionController);

// PUT /api/v1/transactions/:id
router.put("/:id", updateTransactionController);

export default router;
