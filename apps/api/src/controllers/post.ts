import Post from "../models/post";
import Comment from "../models/comments";

//Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category').populate('comments');

    // Return all the posts with a 200 status code
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

//Get post by id
const getPostById = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('category').populate('comments');

    if (!post) {
      // If we don't find the category return a 404 status code with a message
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the category with a 200 status code
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

//Get post by category
const getPostsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const post = await Post.find({ category: category }).populate('category').populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post by category not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }

}

//Create post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    // Return the created post with a 201 status code
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

//Create post comment
const createPostComment = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) {
      // If we don't find the category return a 404 status code with a message
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create(req.body);
    post.comments.push(comment.id);
    await post.save();

    // Return the created post with a 201 status code
    res.status(200).json(comment);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

//Update post
const updatePost = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

    if (!post) {
      // If we don't find the category return a 404 status code with a message
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the category with a 200 status code
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

//Delete post
const deletePost = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    // Check and delete if we have a post with that id
    const post = await Post.findById(id);

    // If we don't find the post return a 404 status code with a message
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Comment.deleteMany({
      _id: { $in: post.comments },
    });

    await post.deleteOne();

    // Return a 200 status code
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

export default {
  getPosts,
  getPostById,
  getPostsByCategory,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};
