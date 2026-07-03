// Local JSON-backed API for the react-app.
// Serves the same routes as apps/backend but reads/writes a plain JSON file
// (db.json in this same folder) instead of MongoDB. No database needed.
import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import cors from 'cors';
import express, { Request, Response } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

// ponytail: db.json lives next to the source; nx serve runs from the workspace
// root, so resolve from cwd. Move to an env var if you ever run from elsewhere.
const DB_PATH = join(process.cwd(), 'apps/api/src/db.json');

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
interface User {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}
interface DB {
  categories: Category[];
  posts: Post[];
  users: User[];
}

const readDB = (): DB => {
  const parsed = JSON.parse(readFileSync(DB_PATH, 'utf-8')) as Partial<DB>;
  return {
    categories: parsed.categories ?? [],
    posts: parsed.posts ?? [],
    users: parsed.users ?? []
  };
};
const writeDB = (db: DB) => writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
const now = () => new Date().toISOString();

const app = express();
app.use(express.json());
// Frontend runs with credentials: true, so reflect the origin instead of "*".
app.use(cors({ origin: true, credentials: true }));

// --- Auth ---
app.post('/api/auth/register', (req, res) => {
  const db = readDB();
  const { firstname, lastname, username, password } = req.body as Partial<User>;

  if (!firstname?.trim() || !lastname?.trim() || !username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = db.users.find((user) => user.username === username?.trim());
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const user: User = {
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    username: username.trim(),
    password: password.trim()
  };

  db.users.push(user);
  writeDB(db);

  res.status(201).json({
    message: 'User registered',
    user: { firstname: user.firstname, lastname: user.lastname, username: user.username }
  });
});

app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { username, password } = req.body as Partial<User>;

  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = db.users.find(
    (candidate) => candidate.username === username.trim() && candidate.password === password.trim()
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({
    message: 'Logged in',
    user: { firstname: user.firstname, lastname: user.lastname, username: user.username }
  });
});
app.post('/api/auth/refresh', (_req, res) => res.status(200).json({ message: 'Token refreshed' }));
app.post('/api/auth/logout', (_req, res) => res.status(200).json({ message: 'Logged out' }));
app.get('/api/auth/me', (_req, res) => res.status(200).json({ user: { name: 'Demo', username: 'demo@example.com' } }));

// --- Categories ---
app.get('/api/categories', (_req, res) => res.status(200).json(readDB().categories));

app.get('/api/categories/:id', (req, res) => {
  const category = readDB().categories.find((c) => c.id === req.params.id);
  category ? res.status(200).json(category) : res.status(404).json({ message: 'Category not found' });
});

app.post('/api/categories', (req: Request, res: Response) => {
  const db = readDB();
  const category: Category = { id: randomUUID(), name: req.body.name, createdAt: now(), updatedAt: now() };
  db.categories.push(category);
  writeDB(db);
  res.status(201).json(category);
});

app.patch('/api/categories/:id', (req, res) => {
  const db = readDB();
  const category = db.categories.find((c) => c.id === req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  if (req.body.name !== undefined) category.name = req.body.name;
  category.updatedAt = now();
  writeDB(db);
  res.status(200).json(category);
});

app.delete('/api/categories/:id', (req, res) => {
  const db = readDB();
  const before = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== req.params.id);
  if (db.categories.length === before) return res.status(404).json({ message: 'Category not found' });
  writeDB(db);
  res.status(204).send();
});

// --- Posts ---
app.get('/api/posts', (_req, res) => res.status(200).json(readDB().posts));

// Must come before "/:id" so "category" is not read as an id.
app.get('/api/posts/category/:category', (req, res) => {
  const db = readDB();
  const id = req.params.category;
  const name = db.categories.find((c) => c.id === id)?.name;
  // Seed posts store the category name; new posts may store the id — match both.
  const posts = db.posts.filter((p) => p.category === id || p.category === name);
  res.status(200).json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = readDB().posts.find((p) => p.id === req.params.id);
  post ? res.status(200).json(post) : res.status(404).json({ message: 'Post not found' });
});

app.post('/api/posts', (req, res) => {
  const db = readDB();
  const post: Post = {
    id: randomUUID(),
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
    comments: [],
    createdAt: now(),
    updatedAt: now()
  };
  db.posts.push(post);
  writeDB(db);
  res.status(201).json(post);
});

app.patch('/api/posts/:id', (req, res) => {
  const db = readDB();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  for (const field of ['title', 'image', 'description', 'category'] as const) {
    if (req.body[field] !== undefined) post[field] = req.body[field];
  }
  post.updatedAt = now();
  writeDB(db);
  res.status(200).json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  const db = readDB();
  const before = db.posts.length;
  db.posts = db.posts.filter((p) => p.id !== req.params.id);
  if (db.posts.length === before) return res.status(404).json({ message: 'Post not found' });
  writeDB(db);
  res.status(204).send();
});

app.post('/api/posts/:id/comments', (req, res) => {
  const db = readDB();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comment: Comment = {
    id: randomUUID(),
    author: req.body.author,
    content: req.body.content,
    createdAt: now(),
    updatedAt: now()
  };
  post.comments.push(comment);
  writeDB(db);
  res.status(201).json(comment);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}/api`);
});
