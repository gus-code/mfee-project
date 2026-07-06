import express from 'express';

import commentController from '../controllers/comment';

const router = express.Router();

// Get category by id
router.get('/:id', commentController.getPostComments);


export default router;
