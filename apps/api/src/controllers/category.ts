
import { Request, Response } from "express";
import Category from "../models/category.model";

export interface Category {
  id: string,
  name: string
}

const seedCategory = {
  id: "92b8d466-b4de-457e-9683-b003e232f3ba",
  name: "Tech"
}
const categories: Category[] = []
categories.push(seedCategory);

export const findCategoryById = (id: string) => {
  return categories.find((p) => p.id === id);
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    const {message} = error;
    res.status(500).send({message});
  }
}

// Get category by id
export const getCategoryById = async (req: Request, res: Response) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    const categories = await Category.findById(id);
    res.status(200).json(categories);

  } catch (error) {
    const {message} = error;
    res.status(500).send({message});
  }
}

// Create category
export const createCategory = async (req: Request, res: Response) => {

  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);

  } catch (error) {
    const {message} = error;
    res.status(500).send({message});
  }
}

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {new: true});

    if( !category ){
      res.status(400).send({message: "Category not found"});
    }

    res.status(201).send(category)

  } catch (error) {
    const {message} = error;
    res.status(500).send({message});
  }

}

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id, req.body);

    if( !category ){
      res.status(400).send({message: "Category not found"});
    }
    res.status(201).send(category)

  } catch (error) {
    const {message} = error;
    res.status(500).send({message});
  }

}
