<template>
  <div class="btn-group" role="group">
    <CategoryItem v-for="category in categories" :key="category._id" :category="category" @select-category="selectCategory($event)" />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue';
import { store } from '../../../store/store';
import { getCategories } from '../../../helpers/categories';

export default {
  name: 'CategoriesList',
  components: {
    CategoryItem
  },
  data() {
    return {
      categories: [],
      store
    };
  },
  methods: {
    buildCategories() {
      this.categories = [
        {
          _id: '1',
          name: 'All'
        },
        ...this.categories
      ];

      this.categories = this.categories.map((category) => ({
        ...category,
        active: category.name === 'All'
      }));
    },
    selectCategory(id) {
      this.categories = this.categories.map((category) => ({
        ...category,
        active: category._id === id
      }));

      this.store.setCurrentCategory(id);
    },
    async getCategories() {
      this.categories = await getCategories();
      this.buildCategories();
    }
  },
  created() {
    this.getCategories();
  }
};
</script>
