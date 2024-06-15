import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({
    message: "hello",
  });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(400, "You can't update other user profile"));
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(
        errorHandler(400, "Password must be atleast 8 character long")
      );
    }
    req.body.password = await bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 to 20 letters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username can't contain spaces"));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(400, "You cant delete another user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted succesfully");
  } catch (error) {
    next(error);
  }
};
export const userSignOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
export const getAllUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(400, "You can't fetch all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .limit(limit)
      .skip(startIndex);
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUser = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastmonthUser = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      userWithoutPassword,
      totalUser,
      lastmonthUser,
    });
  } catch (error) {
    next(error);
  }
};
