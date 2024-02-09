import Category from "../models/Category";

//GET All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message}); 
    }
}

//GET Category by Id
const getCategoryById = async (req, res) =>{
    const {id} = req.params;

    try {
        const category = await Category.findById(id);
        if(!category){
            res.status(404).json('Category not found');
        }
        res.status(200).json(category);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//POST Category
const createCategory = async (req, res) =>{
    try {const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//PATCH Category
const updateCategory = async (req, res) =>{
    try {
        const {id} = req.params;

        const category = await Category.findByIdAndUpdate(id, req.body, {new: true});
        if(!category){
            res.status(400).json('Category not found');
        }
        res.status(200).json(category);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//Delete Category
const deleteCategory = async (req, res) =>{
    try {
        const {id} = req.params;

        const category = await Category.findByIdAndDelete(id);
        if(!category){
            res.status(400).json('Category not found');
        }
        //res.status(204); 204 No Content so category not returned
        res.status(200).json(category);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

export default {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}