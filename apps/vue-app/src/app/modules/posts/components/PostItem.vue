<template>
  <div class="col-md-12 col-lg-6">
    <div class="card bg-dark text-white">
      <img :src="post.image" class="card-img" />
      <div class="card-img-overlay mt-3 ms-3 card-img" @click="goToPostDetail(post._id)">
        <div class="card-content">
          <h1 class="display-5">{{ post.title }}</h1>
          <p class="card-text fs-5">
            <em>{{ post.comments.length }} comments </em>
            <i class="fa-solid fa-comment"></i>
          </p>
          <p class="card-text fs-5">
            {{ post.description }}
          </p>
          <p class="card-text fs-5 text-uppercase">
            <strong>{{ post.category?.name }}</strong>
          </p>
        </div>
      </div>
      <div class="card-img-overlay card-buttons">
        <div class="d-flex justify-content-end align-items-center ms-4">
          <i class="fa-solid fa-pen pe-3" data-bs-toggle="modal" data-bs-target="#createPostModal" @click="editPost()"></i>
          <i class="fa-solid fa-trash" @click="deletePost()"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../../router/router';
import { deletePost } from '../../../helpers/posts';
import { store } from '../../../store/store';

export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      store
    };
  },
  methods: {
    goToPostDetail(id) {
      router.push({
        name: 'post-detail',
        params: { id }
      });
    },
    async deletePost() {
      const status = await deletePost(this.post._id);
      if (status) {
        this.store.getPosts();
      } else {
        console.error("The post couldn't be deleted");
      }
    },
    editPost() {
      console.log('🚀 ~ editPost');
    }
  }
};
</script>

<style scoped>
.col-md-12,
.col-lg-6 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.card {
  border: 0;
  border-radius: 0;
}
.card:hover {
  cursor: pointer;
}
.card-content {
  display: flex;
  justify-content: end;
  flex-direction: column;
  height: 100%;
}
.card-img {
  bottom: 40px;
}
.card-buttons {
  top: 85%;
}
</style>
