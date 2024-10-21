<template>
<div class="container mt-5">
    <div class="d-flex justify-content-between">
        <h1 class="display-6">Categories</h1>
        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createCategoryModal">Add Category</button>
    </div>

    <hr />
    <div class="alert alert-warning m-3" role="alert" v-show="!existResults">There are not results.</div>
    <table class="table table-striped"  v-show="existResults">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody v-for="category in categories" :key="category._id">
            <tr>
                <th scope="row">{{ category._id }}</th>
                <td>{{ category.name }}</td>
                <td>
                    <i class="fa-solid fa-pen me-3" data-bs-toggle="modal" data-bs-target="#createCategoryModal"
                        v-on:click="selectCategory(category)"></i>
                    <i class="fa-solid fa-trash" v-on:click="remove(category._id)"></i>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<CategoryForm :category-selected="categorySelected" @get-categories="getCategories" @select-category="selectCategory" />
</template>
<script>
import CategoryForm from './CategoryForm.vue';
import { getCategories } from '../../../helpers/categories';
import { deleteCategory } from '../../../helpers/categories';
import { alerts } from '../../../helpers/alerts';

export default {
components: {
    CategoryForm
},
mixins: [alerts],
data() {
    return {
    categories: null,
    categorySelected: null
    };
},
methods: {
        async remove(id) {
            let status;
            status = await deleteCategory(id);

            if (status) {
                this.getCategories();
                this.showAlert('success', 'The category has been deleted');
            } else {
                this.showAlert('error', "The category couldn't be deleted");
            }
        },

        selectCategory(category) {
            this.categorySelected = category;
        },
        async getCategories() {
            this.categories = await getCategories();
        }
    },
    created() {
        this.getCategories();
    },
  computed: {
        existResults() {
            return this.categories && this.categories.length > 0;
        }
    }
    
};
</script>