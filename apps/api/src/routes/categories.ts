import express from 'express';
import categoryController from '../controllers/category';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', categoryController.saveCateogry);

router.patch('/:id', categoryController.editCategory);

router.delete('/:id', categoryController.deleteCategory);

export default router;