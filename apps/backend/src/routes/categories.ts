import express from 'express';

import categoryController from '../controllers/category';

const router = express.Router();

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
