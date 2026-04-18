import jwt from "jsonwebtoken";
import User from "../models/User.js";


// 1. Extract token from Authorization header
// 2. Verify token
// 3. Find user
// 4. Attach user to req.user
// 5. Call next()
// 6. If invalid → return 401

const authMiddleware = async (req, res, next) => {
  try{
    const token = req.headers.authorisation?.split("")[1];
      if (!token) 
      return res.status(401).json({message:"Access Denied"})
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(email).select("password");
      if (!req.user) return res.status(401).json({ error: "User not found" });
      next();
}
  catch(e){
    res.status(401).json({e:"Invalid token"})
  }
}
export default authMiddleware;