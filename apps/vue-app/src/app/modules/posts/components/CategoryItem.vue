<template>
  <button type="button" class="btn btn-light" :class="{ active: category.active }" @click="selectCategory(category._id)">
    {{ category.name }}
  </button>
</template>

<script>
export default {
  name: 'CategoryItem',
  emits: ['selectCategory'],
  props: {
    category: {
      type: Object,
      required: true,
      default() {
        return {
          _id: '1',
          name: 'Default name'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    selectCategory(id) {
      this.$emit('selectCategory', id);
    }
  }
};
</script>
