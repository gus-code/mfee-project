import { RequestHandler } from 'express';
import CategorySchema from '../schemas/Category';

const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await CategorySchema.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategoryById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CategorySchema.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const saveCateogry: RequestHandler = async (req, res) => {
  try {
    const category = await CategorySchema.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const editCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategorySchema.findByIdAndUpdate(id, req.body, { new: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CategorySchema.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    res.status(200).send(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unexpected error' });
    }
  }
};

export default { getCategories, getCategoryById, saveCateogry, editCategory, deleteCategory };
