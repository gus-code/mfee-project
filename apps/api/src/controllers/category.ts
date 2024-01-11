import Category from '../models/category';

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    // Return all the categories with a 200 status code
    res.status(200).json(categories);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Get category by id
const getCategoryById = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    // Check if we have a category with that id
    const category = await Category.findById(id);

    if (!category) {
      // If we don't find the category return a 404 status code with a message
      return res.status(404).json({ message: 'Category not found' });
      // Note: Remember that json method doesn't interrupt the workflow
      // therefore is important to add a "return" to break the process
    }

    // Return the category with a 200 status code
    res.status(200).json(category);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Create category
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    // Return the created category with a 201 status code
    res.status(201).json(category);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    // Check and update if we have a category with that id
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

    // If we don't find the category return a 404 status code with a message
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Return the updated category with a 200 status code
    res.status(200).json(category);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    // Check and delete if we have a category with that id
    const category = await Category.findByIdAndDelete(id);

    // If we don't find the category return a 404 status code with a message
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Return a 200 status code
    res.status(200).json(category);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
