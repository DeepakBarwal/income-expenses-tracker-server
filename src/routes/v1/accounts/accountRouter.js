import express from "express";
const router = express.Router();
import {
  createAccountController,
  getAllAccountsController,
  getSingleAccountController,
  deleteAccountController,
  updateAccountController,
} from "../../../controllers/accounts/accountsController.js";
import extractJwtFromHeaders from "../../../middlewares/extractJwtFromHeaders.js";

// POST /api/v1/accounts
router.post("/", extractJwtFromHeaders, createAccountController);

// GET /api/v1/accounts
router.get("/", extractJwtFromHeaders, getAllAccountsController);

// GET /api/v1/accounts/:id
router.get("/:id", getSingleAccountController);

// DELETE /api/v1/accounts/:id
router.delete("/:id", deleteAccountController);

// PUT /api/v1/accounts/:id
router.put("/:id", updateAccountController);

export default router;
