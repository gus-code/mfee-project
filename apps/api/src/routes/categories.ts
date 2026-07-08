import express from 'express';
import category from '../controllers/category'

const router = express.Router();
// Initialize categories array to save data in memory
export interface Categorie {
  id: string,
  name: string
}

// Get all categories
router.get('/', category.getCategories)

// Get category by id
router.get('/:id', category.getCategoryById)

// Create category
router.post('/', category.createCategory)

// Update category
router.patch('/:id', category.updateCategory)

// Delete category
router.delete('/:id', category.deleteCategory)

export default router;
