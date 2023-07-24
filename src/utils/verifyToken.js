import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    }
    return decoded;
  });
};

export default verifyToken;
