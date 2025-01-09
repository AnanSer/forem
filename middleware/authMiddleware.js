const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication failed" });
  }

  try {
    const data = jwt.verify(authHeader, "secret");
    req.user = data; // Attach user data to request object
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
}

module.exports = authMiddleware;
