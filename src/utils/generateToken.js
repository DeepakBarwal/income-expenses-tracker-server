import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

export default generateToken;
