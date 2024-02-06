/* import { Request, Response } from 'express';
import { posts } from '../controllers/post';
import { IPost } from '../models/interfaces'

const getPostItem = (id: string) => {
    return posts.find((item) => item.id === id);
};

const postMiddleware = (req: Request, res: Response, next) => {
    const { postId } = req.params;
    const postItem: IPost = getPostItem(postId);

    if (postItem) {
        req['postItem'] = postItem;
        return next();
    }

    return res.status(404).json({ message: 'Post not found' });
};

export default postMiddleware; */
