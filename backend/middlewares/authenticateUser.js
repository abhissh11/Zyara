import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId, role: decoded.role };

    next();
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    res.status(401).json({ message: "Invalid or expired access token" });
  }
};
