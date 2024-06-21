import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

router.route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

router.route("/:id/comments")
  .post(postController.createComment)

router.route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost)

router.route("/category/:category")
  .get(postController.getAllPostsByCategory)

export default router
