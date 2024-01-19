import express, { Request, Response } from 'express';
import { categories } from './categories'
import { IPost, IPostComment, IPostRequest, IPostResponse } from '../models/interfaces'

const postsRouter = express.Router()

const posts: IPost[] = [];
const comments: IPostComment[] = [];

export const getPost = (id: string) => {
  return posts.find((item) => item.id === id);
};

export const getPostIndex = (id: string) => {
  return posts.findIndex((item) => item.id === id);
};

postsRouter.route('/')
  .get((req: Request, res: Response) => {
    res.status(200).json(posts);
  })
  .post((req: Request, res: Response) => {
    const { title, image, description, category } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'The title is required.' });
    }
    if (!image) {
      return res.status(400).json({ message: 'The image is required.' });
    }
    if (!description) {
      return res.status(400).json({ message: 'The description is required.' });
    }
    if (!category) {
      return res.status(400).json({ message: 'The category is required.' });
    }

    const newPost: IPost = {
      id: Date.now().toString(),
      title,
      image,
      description,
      category,
      comments: []
    };
    posts.push(newPost);
  
    res.status(201).json(newPost);
  });
postsRouter.route('/category/:categoryId')
  .get((req: Request, res: Response) => {
    const { categoryId } = req.params;

    const postsByCategory: IPost[] = posts.filter(item => item.category === categoryId);

    postsByCategory.map(postItem => postItem.category = categories.find((categoryItem) => categoryItem.id === postItem.category));

    res.status(200).json(postsByCategory);
  });
postsRouter.use('/:postId', (req: Request, res: Response, next) => {
  const { postId } = req.params;
  const postItem: IPost = getPost(postId);

  if (postItem) {
    req['postItem'] = postItem;
    return next();
  }

  return res.status(404).json({ message: 'Post not found' });
});
postsRouter.route('/:postId/comments')
  .post((req: Request, res: Response) => {
    const { postId } = req.params;
    const { author, content } = req.body;
    const postIndex: number = getPostIndex(postId);
    const updatedPost: IPost = { ...posts[postIndex] };
    let newComment: IPostComment;

    if (author && content) {
      newComment = {
        id: Date.now().toString(),
        author,
        content
      };
      updatedPost.comments.push(newComment.id);
      comments.push(newComment);
    }
    posts[postIndex] = updatedPost;

    res.status(201).json(newComment);
  });
postsRouter.route('/:postId')
  .get((req: IPostRequest, res: Response) => { 
    const { postItem } = req;
    const postItemResponse: IPostResponse = {
      id: postItem.id,
      title: postItem.title,
      image: postItem.image,
      description: postItem.description,
      category: categories.find((categoryItem) => categoryItem.id === postItem.category),
      comments: postItem.comments.map(commentItem => comments.find((comment) => comment.id === commentItem))
    };

    res.status(200).json(postItemResponse)
  })
  .patch((req: Request, res: Response) => {
    const { postId } = req.params;
    const { title, image, description, category } = req.body;
    const postIndex: number = getPostIndex(postId);

    const updatedPost: IPost = { ...posts[postIndex] };

    if (title) {
      updatedPost.title = title;
    }
    if (image) {
      updatedPost.image = image;
    }
    if (description) {
      updatedPost.description = description;
    }
    if (category) {
      updatedPost.category = category;
    }
    posts[postIndex] = updatedPost;

    res.status(200).json(updatedPost);
  })
  .delete((req: Request, res: Response) => {
    const { postId } = req.params;
    const postIndex: number = getPostIndex(postId);

    posts.splice(postIndex, 1);
  
    res.status(204).send();
  });

export default postsRouter;