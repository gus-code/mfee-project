import express from 'express';
import categoryController from '../controllers/category';

const router = express.Router();

router.route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)


router.route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory)

export default router
