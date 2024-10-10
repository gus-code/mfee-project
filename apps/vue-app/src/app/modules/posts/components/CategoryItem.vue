<template>
  <button type="button" class="btn btn-light" :class="{ active: category.active }" @click="selectCategory(category._id)">
    {{ category.name }}
  </button>
</template>

<script>
export default {
  name: 'CategoryItem',
  data() {
    return {
      category: {
        _id: '1',
        name: 'Default name'
      }
    };
  },
  methods: {
    selectCategory(id) {
      console.log(id);
    }
  }
};
</script>
