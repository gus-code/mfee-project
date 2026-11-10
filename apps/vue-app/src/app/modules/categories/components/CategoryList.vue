<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-between">
        <h1 class="display-6">Categories</h1>
        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createCategoryModal" data-toggle="modal">Add Category</button>
        </div>

        <hr />
        <table v-show="thereAreCategories" class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories">
                  <th scope="row"> {{ category._id }} </th>
                  <td> {{ category.name }} </td>
                  <td>
                      <i class="fa-solid fa-pen me-3" data-bs-toggle="modal" data-bs-target="#createCategoryModal" @click="editCategory(category)"></i>
                      <i class="fa-solid fa-trash" @click="removeCategory(category._id)"></i>
                  </td>
                </tr>
            </tbody>
        </table>
        <div class="alert alert-warning m-3" role="alert" v-show="!thereAreCategories">There are no categories.</div>
    </div>
    <CategoryForm />
</template>
<script>
  import CategoryForm from './CategoryForm.vue';
  export default {
    components: {
        CategoryForm
    },
    computed: {
      thereAreCategories() {
        return this.categories.length > 0;
      }
    },
    data() {
        return {
            categories: [
                {
                _id: '2',
                name: 'Category 1'
                },
                {
                _id: '3',
                name: 'Category 2'
                },
                {
                _id: '4',
                name: 'Category 3'
                }
            ]
        };
    },
    methods: {
      editCategory(category) {
          console.log(' EDIT :D ', category);
      },
      removeCategory(id) {
          console.log(' remove D: ', id);
      }  
    }
  };
</script>