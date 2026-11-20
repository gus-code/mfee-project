import { RequestHandler } from "express";
import Category from "../models/CategoryMongo"


const getCategories: RequestHandler = async (req, res, next) => {

    try {
        const categories = await Category.find();
        return res.status(200).json(categories);

    } catch (error) {
        next(error);
    }
};

const getCategoryById: RequestHandler = async (req, res, next) => {

    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

const createCategory: RequestHandler = async (req, res, next) => {

    try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);

    } catch (error) {
        next(error);
    }
};

const updateCategory: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(category);

    } catch (error) {
        next(error);
    }
};

const deleteCategory: RequestHandler = async (req, res, next) => {

    const { id } = req.params;

    try {

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(204).send(category);
    } catch (error) {
        next(error);
    }
};

export default {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}