<template>
  <HeaderPosts />
  <div class="row pt-5">
    <PostItem />
    <PostItem />
    <PostItem />
  </div>
  <div class="alert alert-warning m-3" role="alert">There are not results.</div>
</template>

<script>
import HeaderPosts from '../components/HeaderPosts.vue';
import PostItem from '../components/PostItem.vue';

export default {
  components: {
    HeaderPosts,
    PostItem
  },
  data() {
    return {};
  }
};
</script>
