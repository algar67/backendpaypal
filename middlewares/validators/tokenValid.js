const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const userVerified = jwt.verify(token, process.env.SECRET);
    req.userUuid = userVerified.userUuid;
    next();
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = validateToken;
