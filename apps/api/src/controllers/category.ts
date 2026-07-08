
import { Request, Response } from "express";

export interface Category {
  id: string,
  name: string
}

const seedCategory = {
  id: "92b8d466-b4de-457e-9683-b003e232f3ba",
  name: "Tech"
}
const categories: Category[] = []
categories.push(seedCategory);

export const findCategoryById = (id: string) => {
  return categories.find((p) => p.id === id);
};

// Get all categories
export const getCategories = (req: Request, res: Response) => {
  res.status(200).json(categories);
}

// Get category by id
export const getCategoryById = (req: Request, res: Response) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Check if we have a category with that id
  const category = findCategoryById(id);

  if (!category) {
    // If we don't find the category return a 404 status code with a message
    return res.status(404).json({ message: 'Category not found' });
    // Note: Remember that json method doesn't interrupt the workflow
    // therefore is important to add a "return" to break the process
  }

  // Return the category with a 200 status code
  res.status(200).json(category);
}

// Create category
export const createCategory = (req: Request, res: Response) => {
  // Retrieve the name from the request body
  const { name } = req.body;

  if (!name) {
    // If name is empty or undefined return a 400 status code with a message
    return res.status(400).json({ message: 'The name is required.' });
  }

  // Generate a new category
  const newCategory = {
    id: Date.now().toString(), // Convert id to string to match the value in get by id endpoint
    name
  };
  // Add the new category to our array
  categories.push(newCategory);

  // Return the created category with a 201 status code
  res.status(201).json(newCategory);
}

// Update category
export const updateCategory = (req: Request, res: Response) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the category in the array
  const categoryIndex = categories.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (categoryIndex === -1) {
    // If we don't find the category return a 404 status code with a message
    return res.status(404).json({ message: 'Category not found' });
  }

  // Generate a copy of our cateogory
  const updatedCategory = { ...categories[categoryIndex] };
  // Retrieve the name from the request body
  const { name } = req.body;

  // Check if we have a name, if so update the property
  if (name) {
    updatedCategory.name = name;
  }

  // Update the category in our array
  categories[categoryIndex] = updatedCategory;

  // Return the updated category with a 200 status code
  res.status(200).json(updatedCategory);
}

// Delete category
export const deleteCategory = (req: Request, res: Response) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the category in the array
  const categoryIndex = categories.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (categoryIndex === -1) {
    // If we don't find the category return a 404 status code with a message
    return res.status(404).json({ message: 'Category not found' });
  }

  // Remove the category from the array
  categories.splice(categoryIndex, 1);

  // Return a 204 status code
  res.status(204).send();
}
