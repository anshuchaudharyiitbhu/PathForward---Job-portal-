//“Check if the user has a valid token (i.e., is logged in). If yes, allow them to continue. If not, block access.”




import jwt from "jsonwebtoken";

const isauth = async (req, res, next) => {
  try {
    ("auth ");
    
    const token = req.cookies.token;
    

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decoded.userId;
    next();

  } catch (error) {
    console.error("Authentication Error:", error.message); // Better logging

    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isauth;
