import { Comment, Post } from '../types/types';

const POSTS: Post[] = [
  {
    title: 'Post Test Postman',
    image:
      'https://images.unsplash.com/photo-1556276797-5086e6b45ff9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800',
    description: 'Description from Postman',
    category: 'cat_1',
    comments: ['a47f5337-16f2-49a0-bc14-e97bb24b56a1']
  }
];

const COMMENTS: Comment[] = [
  {
    author: 'John Doe',
    content: 'Great post!'
  }
];

const CATEGORIES = [
  {
    name: 'Other'
  },
  {
    name: 'React'
  }
];

export { POSTS, COMMENTS, CATEGORIES };
