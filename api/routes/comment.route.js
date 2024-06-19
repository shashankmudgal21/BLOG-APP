import express from 'express'
import {verifyToken} from '../utils/verifyToken.js'
import { createComment, getComment, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();
router.post('/addComment',verifyToken,createComment);
router.get('/getComment/:postId',getComment)
router.put('/likeComment/:commentId',verifyToken,likeComment);

export default router