import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utilis/datauri.js";
import cloudinary from "../utilis/cloudinary.js";
import path from "path";

const emailRegex = /^\S+@\S+\.\S+$/;
const isProduction = process.env.NODE_ENV === "production";

// ------------------ REGISTER ------------------
export const register = async (req, res) => {
  try {
    const { name, email, contact, password, role } = req.body;
    const file = req.file;

    if (!name || !email || !contact || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Enter correct email",
        success: false,
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const newUser = await User.create({
      name,
      email,
      contact,
      password: hashedPassword,
      role,
      profile: {
        profilephoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(403).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
      })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log("Logout Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ------------------ UPDATE PROFILE ------------------
export const updateprofile = async (req, res) => {
  try {
    const { name, email, contact, bio, skills } = req.body;
    const userId = req.id;
    const file = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Enter correct email",
        success: false,
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(",").map((s) => s.trim());
    }

    if (file) {
      const fileUri = getDataUri(file);
      const originalName = path.parse(file.originalname).name;

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "resumes",
        use_filename: true,
        public_id: originalName,
        access_mode: "public",
      });

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalname = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
