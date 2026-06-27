import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access token expired, use refresh token",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Find user
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.userId = user._id;

    next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};