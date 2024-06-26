import express from 'express';

import categoryController from '../controllers/category';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', categoryController.createCategory);

router.patch('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

export default router;