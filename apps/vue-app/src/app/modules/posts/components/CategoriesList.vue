<template>
  <div class="btn-group" role="group">
    <CategoryItem v-for="category in categories" :key="category._id" :category="category" @select-category="selectCategory($event)" />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue';
import { store } from '../../../store/store';

export default {
  name: 'CategoriesList',
  components: {
    CategoryItem
  },
  data() {
    return {
      categories: [
        {
          _id: '6667d88982f08e5ed86ae88a',
          name: 'Sport'
        },
        {
          _id: '667ee7e882f08e5ed86af174',
          name: 'Food updated 2'
        }
      ],
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
    }
  },
  created() {
    this.buildCategories();
  }
};
</script>
