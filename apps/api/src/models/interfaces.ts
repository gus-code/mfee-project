import { Request } from 'express';

export interface IPost {
    id: string,
    title: string,
    image: string,
    description: string,
    category: string,
    comments: string[]
}

export interface ICategory {
    id: string,
    name: string
}

export interface IPostResponse {
    id: string,
    title: string,
    image: string,
    description: string,
    category: ICategory[],
    comments: IPostComment[];
}

export interface IPostComment {
    id: string,
    author: string,
    content: string
}

export interface IPostRequest extends Request {
    postItem?: IPost
}