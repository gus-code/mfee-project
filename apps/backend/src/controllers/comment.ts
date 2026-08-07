// Controller for comment-related endpoints
// This file handles fetching comments for a given post
import { getCommentsByPostId } from '../models/comment';

// Get comments by post id
// Usage: GET /api/comments/:id
// Returns all comments for the post with the given id
const getCommentsByPostIdHandler = async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export controller methods for use in routes
export default {
  getPostComments: getCommentsByPostIdHandler
};
