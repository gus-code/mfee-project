// Category model using lowdb for local JSON database
// Defines the Category type and functions to interact with db-categories.json
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const adapter = new JSONFile<{ categories: Category[] }>('db-categories.json');
const db = new Low(adapter, { categories: [] });

export async function getAllCategories() {
  await db.read();
  return db.data?.categories || [];
}

export async function getCategoryById(id: string) {
  await db.read();
  return db.data?.categories.find((c) => c.id === id);
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) {
  await db.read();
  const category: Category = {
    ...data,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.data!.categories.push(category);
  await db.write();
  return category;
}

export async function updateCategory(id: string, data: Partial<Category>) {
  await db.read();
  const category = db.data!.categories.find((c) => c.id === id);
  if (!category) return null;
  Object.assign(category, data, { updatedAt: new Date().toISOString() });
  await db.write();
  return category;
}

export async function deleteCategory(id: string) {
  await db.read();
  const idx = db.data!.categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const [deleted] = db.data!.categories.splice(idx, 1);
  await db.write();
  return deleted;
}
