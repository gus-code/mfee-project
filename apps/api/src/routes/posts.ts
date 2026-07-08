import express from 'express';
import { getPosts, getPostByID, getPostByCategory, createPost, updatePost, deletePost, createComment } from '../controllers/post';

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostByID);
router.get("/category/:id", getPostByCategory);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/comments", createComment);

export default router