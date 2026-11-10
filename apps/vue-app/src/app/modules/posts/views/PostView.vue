<template>
  <HeaderPosts />
  <div class="row pt-5" v-if="thereArePosts">
    <PostItem v-for="(post, index) in postsFiltered" :key="index" :post="post" />
  </div>
  <div class="alert alert-warning m-3" role="alert" v-if="!thereArePosts">There are not results.</div>
</template>

<script>
import HeaderPosts from '../components/HeaderPosts.vue';
import PostItem from '../components/PostItem.vue';
import { store } from '../../../store/store';

export default {
  components: {
    HeaderPosts,
    PostItem
  },
  data() {
    return {
      store
    };
  },
  created() {
    this.store.getPosts();
  },
  computed: {
    thereArePosts() {
      return this.store.posts.length > 0;
    },
    postsFiltered() {
      if (this.store.currentCategoryId === '1') {
        return this.store.posts;
      }
      const postFiltered = this.store.posts.filter((post) => post.category._id === this.store.currentCategoryId);
      return postFiltered;
    }
  }
};
</script>
