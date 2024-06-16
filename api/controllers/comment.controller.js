import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js"

export const createComment = async(req,res,next)=>{
    if(req.user.id !== req.body.userId){
        return next(errorHandler(400,"You are not allowed to comment"));
    }
    const {content,postId,userId} = req.body;
    if(!content || !postId || !userId) return next(errorHandler(400,"please fill out all field"));
    try {
        const comment = new Comment({
            content,
            postId,
            userId
        })
        const newComment = await comment.save();
        return res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}