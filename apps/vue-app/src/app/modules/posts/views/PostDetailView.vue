<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card bg-dark text-white">
        <img :src="post.image" class="card-img" />
        <div class="card-img-overlay">
          <div class="d-flex justify-content-start align-items-center ms-4" @click="this.$router.back()">
            <i class="fa-solid fa-chevron-left me-2"></i>
            <span>View Posts</span>
          </div>
        </div>
        <div class="card-img-overlay text-center title">
          <div class="card-content">
            <h1 class="display-2">
              <strong>{{ post.title }}</strong>
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 bg-gray">
      <div class="container m-5">
        <p class="fs-5">
          {{ post.description }}
        </p>
        <CommentsList :comments="post.comments" @get-post-by-id="getPostById" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentsList from '../components/CommentsList.vue';
import { getPostById } from '../../../helpers/posts';
import { store } from '../../../store/store';

export default {
  props: {
    id: String
  },
  components: {
    CommentsList
  },
  data() {
    return {
      store,
      post: {},
      comments: null
    };
  },
  methods: {
    async getPostById() {
      this.post = await getPostById(this.id);
    }
  },
  created() {
    this.getPostById();
    store.setShowNavBar(false);
  },
  unmounted() {
    store.setShowNavBar(true);
  }
};
</script>
<style scoped>
.card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.bg-gray {
  background-color: #e7e7e7;
}
.title {
  top: 40px;
}
</style>
