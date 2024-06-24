import express from 'express'
import {verifyToken} from '../utils/verifyToken.js'
import { createComment, deleteComment, editComment, getAllComment, getComment, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();
router.post('/addComment',verifyToken,createComment);
router.get('/getComment/:postId',getComment)
router.put('/likeComment/:commentId',verifyToken,likeComment);
router.put('/editComment/:commentId',verifyToken,editComment)
router.delete('/deleteComment/:commentId',verifyToken,deleteComment)
router.get('/getComment',verifyToken,getAllComment)

export default router