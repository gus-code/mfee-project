import express from 'express';

import categoryController from '../controllers/category';

const routerCatergories = express.Router();

// Get all categories
routerCatergories.get('/', categoryController.getCategories);

// Get category by id
routerCatergories.get('/:id', categoryController.getCategoryById);

// Create category
routerCatergories.post('/', categoryController.createCategory);

// Update category
routerCatergories.patch('/:id', categoryController.updateCategory);

// Delete category
routerCatergories.delete('/:id', categoryController.deleteCategory);

export default routerCatergories;
