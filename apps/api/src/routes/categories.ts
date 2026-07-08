import express from 'express'; 
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category'

const router = express.Router();
// Initialize categories array to save data in memory
export interface Categorie {
  id: string,
  name: string
}

// Get all categories
router.get('/', getCategories)

// Get category by id
router.get('/:id', getCategoryById)

// Create category
router.post('/', createCategory)

// Update category
router.patch('/:id', updateCategory)

// Delete category
router.delete('/:id', deleteCategory)

export default router;
