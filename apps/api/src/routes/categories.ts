import express from 'express';

import categoryController from '../controllers/category';

const router = express.Router();

//GET all categories
router.get('/', categoryController.getCategories);

//GET category by ID
router.get('/:id', categoryController.getCategoryById);

//POST category
router.post('/', categoryController.createCategory);

//PATCH category
router.patch('/:id', categoryController.updateCategory);

//DELETE category
router.delete('/:id', categoryController.deleteCategory);

export default router;