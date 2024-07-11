<template>
  <div class="btn-group" role="group">
    <CategoryItem />
    <CategoryItem />
    <CategoryItem />
    <CategoryItem />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue';

export default {
  name: 'CategoriesList',
  components: {
    CategoryItem
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
