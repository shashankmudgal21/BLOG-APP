import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  if (req.user.id !== req.body.userId) {
    return next(errorHandler(400, "You are not allowed to comment"));
  }
  const { content, postId, userId } = req.body;
  if (!content || !postId || !userId)
    return next(errorHandler(400, "please fill out all field"));
  try {
    const comment = new Comment({
      content,
      postId,
      userId,
    });
    const newComment = await comment.save();
    return res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not Found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex == -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.userId && !req.user.isAdmin)
      return next(errorHandler(400, "You are not allowed to edit the comment"));
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {}
};
export const deleteComment = async(req,res,next) =>{
  try {
    const comment = await Comment.findById(req.params.commentId);
    if(!comment && comment._id !== req.user._id){
      return next(errorHandler(400,"comment can't be deleted"));
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("comment succesfully deleted")
  } catch (error) {
    next(error)
  }
}
