import jwt from 'jsonwebtoken';


const authSeller = (req, res, next) => { 
    const {sellerToken} = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ success: false ,message: 'Unauthorized access' });
    }

try {
    const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    console.log("Token decoded:", tokenDecoded);  // For debugging

    if (tokenDecoded.email === process.env.SELLER_EMAIL) {
      next(); 
    } 
    else {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

export default authSeller;