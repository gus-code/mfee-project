import express from 'express';
import categoryController from '../controllers/category';

const router = express.Router();

//typescript interface definition :)
interface Category {
  id: string;
  name: string;
}

export const getCategory = (id: string) => {
  return categories.find((p) => p.id === id);
};

// Initialize categories array to save data in memory
const categories: Category[] = [];

// Get all categories
router.get('/', categoryController.getCategories);

// Get category by id
router.get('/:id', categoryController.getCategoryById);

// Create category
router.post('/', categoryController.createCategory);

// Update category
router.patch('/:id', categoryController.updateCategory);

// Delete category
router.delete('/:id', categoryController.deleteCategory);

export default router;
