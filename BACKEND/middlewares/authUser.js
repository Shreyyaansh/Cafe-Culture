import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", tokenDecoded);  // For debugging

    if (tokenDecoded.id) {
      req.user = { id: tokenDecoded.id };  // ✅ Use req.user instead of req.body
      next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
