import express from 'express';
import {verifyToken} from '../utils/verifyToken.js'
import { createPost, deletePost, getPost } from '../controllers/post.controller.js';
const router = express.Router();
router.post('/create',verifyToken,createPost);
router.get('/getAllPost',getPost)
router.delete('/delete/:postId/:userId',verifyToken,deletePost)
export default router