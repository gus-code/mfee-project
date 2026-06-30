// Post model using lowdb for local JSON database
// Defines the Post type and functions to interact with db-posts.json
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import { Comment } from './comment';

export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Inicialización de lowdb
const adapter = new JSONFile<{ posts: Post[] }>('db-posts.json');
const db = new Low(adapter, { posts: [] });

export async function getAllPosts() {
  await db.read();
  return db.data?.posts || [];
}

export async function getPostById(id: string) {
  await db.read();
  return db.data?.posts.find((p) => p.id === id);
}

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) {
  await db.read();
  const post: Post = {
    ...data,
    id: nanoid(),
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.data!.posts.push(post);
  await db.write();
  return post;
}

export async function updatePost(id: string, data: Partial<Post>) {
  await db.read();
  const post = db.data!.posts.find((p) => p.id === id);
  if (!post) return null;
  Object.assign(post, data, { updatedAt: new Date().toISOString() });
  await db.write();
  return post;
}

export async function deletePost(id: string) {
  await db.read();
  const idx = db.data!.posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const [deleted] = db.data!.posts.splice(idx, 1);
  await db.write();
  return deleted;
}

// Para comentarios y categorías, se recomienda crear archivos similares.
