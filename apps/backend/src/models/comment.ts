// Comment model using lowdb for local JSON database
// Defines the Comment type and functions to interact with db-comments.json
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  post_id:string
}

const adapter = new JSONFile<{ comments: Comment[] }>('db-comments.json');
const db = new Low(adapter, { comments: [] });

export async function getAllComments() {
  await db.read();
  return db.data?.comments || [];
}

export async function getCommentsByPostId(id: string) {
  await db.read();
  return db.data?.comments.filter((c) => c.post_id === id);
}

export async function getCommentById(id: string) {
  await db.read();
  return db.data?.comments.find((c) => c.id === id);
}

export async function createComment(data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) {
  await db.read();
  const comment: Comment = {
    ...data,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.data!.comments.push(comment);
  await db.write();
  return comment;
}

export async function deleteComment(id: string) {
  await db.read();
  const idx = db.data!.comments.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const [deleted] = db.data!.comments.splice(idx, 1);
  await db.write();
  return deleted;
}
