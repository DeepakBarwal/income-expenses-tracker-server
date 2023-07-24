import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000,
  MONGO_URI = process.env.MONGO_URI,
  SALT_ROUNDS = process.env.SALT_ROUNDS,
  JWT_SECRET = process.env.JWT_SECRET;
