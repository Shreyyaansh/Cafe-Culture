import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file


//Register function  /api/user/register

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Error registering user:", error);  // Look here in terminal!
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Login function  /api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
        }
    
        const user = await User.findOne({ email });
    
        if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
        });
    
        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    
        return res.status(200).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        message: "User logged in successfully",
        });
    
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Check Auth : api/user/is-auth

export const isAuth = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    return res.status(200).json({
      success: true,
      user,
    });


  } 
  catch (error) {
    console.error("Error checking authentication:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });

  }
}


// Logout function  /api/user/logout

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });

  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}