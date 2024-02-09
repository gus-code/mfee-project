import express from 'express';

import commentController from '../controllers/comment';

const router = express.Router();

//GET all comments
router.get('/', commentController.getComments);

//GET comment by ID
router.get('/:id', commentController.getCommentById);

//POST comment
router.post('/', commentController.createComment);

//PATCH comment
router.patch('/:id', commentController.updateComment);

//DELETE comment
router.delete('/:id', commentController.deleteComment);

export default router;