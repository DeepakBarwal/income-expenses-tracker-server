import AppErrors from "../utils/AppErrors.js";
import verifyToken from "../utils/verifyToken.js";

const extractJwtFromHeaders = (req, res, next) => {
  const headers = req.headers;
  const token = headers["authorization"]?.split(" ")[1];
  const user = verifyToken(token);
  if (!token || !user) {
    return next(
      new AppErrors("Invalid/Expired token, please login again", 401)
    );
  }
  req.userId = user.id;
  next();
};

export default extractJwtFromHeaders;
