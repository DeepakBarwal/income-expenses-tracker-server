import express from "express";
const router = express.Router();
import userRouter from "./users/userRouter.js";
import accountRouter from "./accounts/accountRouter.js";
import transactionRouter from "./transactions/transactionRouter.js";

// users routes
router.use("/users", userRouter);

// accounts routes
router.use("/accounts", accountRouter);

// transactions routes
router.use("/transactions", transactionRouter);

export default router;
