// Local JSON-backed API for the react-app.
// Serves the same routes as apps/backend but reads/writes a plain JSON file
// (db.json in this same folder) instead of MongoDB. No database needed.
import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config({
  path: './apps/api/.env'
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

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

console.log('ACCESS:', process.env.ACCESS_TOKEN_SECRET)
console.log('REFRESH:', process.env.REFRESH_TOKEN_SECRET);

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
app.use(cookieParser());
// Frontend runs with credentials: true, so reflect the origin instead of "*".
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

const verifyToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    );

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// --- Auth ---
app.post('/api/auth/register',async (req, res) => {
  const db = readDB();
  const { firstname, lastname, username, password } = req.body as Partial<User>;

  if (!firstname?.trim() || !lastname?.trim() || !username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = db.users.find((user) => user.username === username?.trim());
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password.trim(), 10);

  const user: User = {
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    username: username.trim(),
    password: hashedPassword
  };

  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '30d' }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '30d' }
  );

  db.users.push(user);
  writeDB(db);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    message: 'User registered',
    user: { firstname: user.firstname, lastname: user.lastname, username: user.username }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const db = readDB();
  const { username, password } = req.body as Partial<User>;

  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = db.users.find(
    (candidate) => candidate.username === username.trim()
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(
    password.trim(),
    user.password
  );

  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '30d' }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '30d' }
  );

  res.status(200).json({
    message: 'Logged in',
    accessToken,
    user: { firstname: user.firstname, lastname: user.lastname, username: user.username }
  });
});
app.post('/api/auth/refresh', (_req, res) => res.status(200).json({ message: 'Token refreshed' }));
app.post('/api/auth/logout', (_req, res) => res.status(200).json({ message: 'Logged out' }));

app.get("/api/auth/validate", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Token valid",
    user: (req as any).user,
  });
});

// --- Categories ---
app.get('/api/categories', (_req, res) => res.status(200).json(readDB().categories));

app.get('/api/categories/:id', (req, res) => {
  const category = readDB().categories.find((c) => c.id === req.params.id);
  category ? res.status(200).json(category) : res.status(404).json({ message: 'Category not found' });
});

app.post('/api/categories', verifyToken, (req: Request, res: Response) => {
  const db = readDB();
  const category: Category = { id: randomUUID(), name: req.body.name, createdAt: now(), updatedAt: now() };
  db.categories.push(category);
  writeDB(db);
  res.status(201).json(category);
});

app.patch('/api/categories/:id', verifyToken, (req, res) => {
  const db = readDB();
  const category = db.categories.find((c) => c.id === req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  if (req.body.name !== undefined) category.name = req.body.name;
  category.updatedAt = now();
  writeDB(db);
  res.status(200).json(category);
});

app.delete('/api/categories/:id', verifyToken,  (req, res) => {
  const db = readDB();
  const before = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== req.params.id);
  if (db.categories.length === before) return res.status(404).json({ message: 'Category not found' });
  writeDB(db);
  res.status(204).send();
});

// --- Posts ---
app.get('/api/posts', (_req, res) => res.status(200).json(readDB().posts));


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

app.post('/api/posts',verifyToken, (req, res) => {
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

app.patch('/api/posts/:id', verifyToken, (req, res) => {
  const db = readDB();

  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const { title, image, description, category } = req.body;

  if (title !== undefined) post.title = title;
  if (image !== undefined) post.image = image;
  if (description !== undefined) post.description = description;
  if (category !== undefined) post.category = category;

  post.updatedAt = now();
  writeDB(db);

  // console.log("PATCH BODY:", req.body);

  res.status(200).json(post);
});

app.delete('/api/posts/:id',verifyToken, (req, res) => {
  const db = readDB();
  const before = db.posts.length;
  db.posts = db.posts.filter((p) => p.id !== req.params.id);
  if (db.posts.length === before) return res.status(404).json({ message: 'Post not found' });
  writeDB(db);
  res.status(204).send();
});

app.post('/api/posts/:id/comments',verifyToken, (req, res) => {
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
