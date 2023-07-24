import express from "express";
const router = express.Router();
import {
  registerUserController,
  loginUserController,
  userProfileController,
  deleteUserController,
  updateUserController,
} from "../../../controllers/users/usersController.js";
import extractJwtFromHeaders from "../../../middlewares/extractJwtFromHeaders.js";

// POST /api/v1/users/register
router.post("/register", registerUserController);

// POST /api/v1/users/login
router.post("/login", loginUserController);

// GET /api/v1/users/profile/:id
router.get("/profile", extractJwtFromHeaders, userProfileController);

// DELETE /api/v1/users/:id
router.delete("/", extractJwtFromHeaders, deleteUserController);

// PUT /api/v1/users/:id
router.put("/", extractJwtFromHeaders, updateUserController);

export default router;
