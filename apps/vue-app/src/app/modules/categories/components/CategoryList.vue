<template>
<div class="container mt-5">
    <div class="d-flex justify-content-between">
        <h1 class="display-6">Categories</h1>
        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createCategoryModal">Add Category</button>
    </div>

    <hr />
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody v-for="category in categories" :key="category._id">
            <tr>
                <th scope="row">1</th>
                <td>{{ category.name }}</td>
                <td>
                    <i class="fa-solid fa-pen me-3" data-bs-toggle="modal" data-bs-target="#createCategoryModal"
                        v-on:click="editCategory(categories)"></i>
                    <i class="fa-solid fa-trash" v-on:click="deleteCategory(categories._id)"></i>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<CategoryForm :category-selected="categorySelected" />
</template>
<script>
import CategoryForm from './CategoryForm.vue';

export default {
  components: {
    CategoryForm
  },
  data(){
        return {
            categories: [
                {
                    _id:'2',
                    name: 'Category 1'
                } ,  
                {
                    _id:'3',
                    name: 'Category 2'
                } ,  
                {
                    _id:'4',
                    name: 'Category 3'
                } ,   
                {
                    _id:'5',
                    name: 'Category 4'
                },  
            ],
            categorySelected: null
        }
    },
    buildCategories(){
        this.categoriies = [
            {
                _id:'1',
                name: 'All'
            },
            ...this.categoriies
        ]

        this.categoriies = this.categoriies.map((categoriies) => ({
            ...categoriies,
            active: category.name ==='All'
        })
        )
    },
    methods: {
        editCategory(data){
            this.categorySelected = data;
        },
        deleteCategory(){}
    },
};
</script>