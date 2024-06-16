import express from 'express'
import {verifyToken} from '../utils/verifyToken.js'
import { createComment } from '../controllers/comment.controller.js';

const router = express.Router();
router.post('/addComment',verifyToken,createComment);

export default router