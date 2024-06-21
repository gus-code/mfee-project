import type { Category } from "../models/types"

export const categories: Category[] = []

const findCategory = (id: string): Category | void => {
  return categories.find(el => el.id === id)
}

const getCategory = (req, res): void => {
  const { id } = req.params;
  const currentCategory = findCategory(id)

  if (!currentCategory) return res.status(404).json({message: "Category not found"})

  res.status(200).json(currentCategory);
}

const updateCategory = (req, res) => {
  const { id } = req.params;
  const categoryIndex = categories.findIndex(el => el.id === id)
  if (categoryIndex < 0) return res.status(404).json({message: "Category not found"})

  const { name } = req.body;
  if (!name) return res.status(401).json({ message: "Name is required!" })

  categories[categoryIndex].name = name;

  res.status(203).json(categories[categoryIndex]);
}

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const categoryIndex = categories.findIndex(el => el.id === id)
  if (categoryIndex < 0) return res.status(404).json({message: "Category not found"})

  const currentCategory = categories[categoryIndex]

  categories.splice(categoryIndex, 1)

  res.status(200).json({status: "Item Deleted", item: currentCategory});
}


const getAllCategories = (req, res) => {
  res.status(200).json(categories);
}

const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(401).json({ message: "Name is required!" })

  const newCategory: Category = {
    id: Date.now().toString(),
    name
  }

  categories.push(newCategory)

  res.status(201).json(newCategory)
}

export default {
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  createCategory,
}
