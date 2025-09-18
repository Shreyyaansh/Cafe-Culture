
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Seller Login  :  api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Provided:", email, password);
    console.log("Expected:", process.env.SELLER_EMAIL, process.env.SELLER_PASSWORD);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // ✅ CHECK AND RETURN IF MATCHES
    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Seller logged in successfully",
      }); // ✅ MAKE SURE THIS 'return' IS HERE
    }

    // ❌ Only if it didn't match
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });

  } catch (error) {
    console.error("Error during seller login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Check Seller Auth : api/seller/is-auth

export const isSellerAuth  = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
        message: "Seller is authenticated", 
    });


  } 
  catch (error) {
    console.error("Error checking authentication:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });

  }
}

// Logout Seller : api/seller/logout

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.status(200).json({
      success: true,
      message: "Seller logged out successfully",
    });

  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}