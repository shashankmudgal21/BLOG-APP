import slugify from "slugify";
import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(400, "You are not admin"));
  }
  const string = req.body.title;
  const slug = slugify(string);
  const newPost = new Post({ ...req.body, slug, userId: req.user.id });
  try {
     const savedPost = await newPost.save();
     res.status(200).json(newPost)
  } catch (error) {
    next(error)
  }
};
