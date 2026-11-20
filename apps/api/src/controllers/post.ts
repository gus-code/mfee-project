import { RequestHandler } from 'express';
import PostSchema from '../schemas/Post';
import CommentSchema from '../schemas/Comment';

const getPosts: RequestHandler = async (req, res) => {
  try {
    const posts = await PostSchema.find();
    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const savePost: RequestHandler = async (req, res) => {
  try {
    const post = await PostSchema.create(req.body);
    return res.status(201).json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const getPostsByCategory: RequestHandler = async (req, res) => {
  const { category } = req.params;

  try {
    const posts = await PostSchema.find({ category });

    return res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostSchema.findById(id).populate('category').populate('comments');

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const savePostComment: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostSchema.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    const comment = await CommentSchema.create(req.body);

    post.comments.push(comment._id.toString());

    await post.save();

    return res.status(201).json(comment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const deletePostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostSchema.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    await CommentSchema.deleteMany({
      _id: { $in: post.comments }
    });

    await post.deleteOne();

    res.status(200).send({ message: 'Post deleted successfully!' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const editPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

export default { getPosts, savePost, getPostsByCategory, getPostById, savePostComment, deletePostById, editPostById };
