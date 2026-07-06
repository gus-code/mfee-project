// Controller for category-related endpoints
// Handles CRUD operations for categories
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../models/category';

// Get all categories
// Usage: GET /api/categories
// Returns an array of all categories
const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by id
// Usage: GET /api/categories/:id
// Returns a single category by its id
const getCategoryByIdHandler = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategoryHandler = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const category = await deleteCategory(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getCategories,
  getCategoryById: getCategoryByIdHandler,
  createCategory: createCategoryHandler,
  updateCategory: updateCategoryHandler,
  deleteCategory: deleteCategoryHandler
};
