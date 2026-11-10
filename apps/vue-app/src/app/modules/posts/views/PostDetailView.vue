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
        <CommentsList />
      </div>
    </div>
  </div>
</template>

<script>
import CommentsList from '../components/CommentsList.vue';

export default {
  props: {
    id: String
  },
  components: {
    CommentsList
  },
  data() {
    return {
      post: {
        title: 'The waves are high & beautiful u',
        description:
          'This is a wider card with supporting text below as a natural lead-i to additional content. This content is a little bit longer.',
        image: 'https://cdn.pixabay.com/photo/2017/02/22/17/06/wave-2089959_960_720.jpg',
        category: {
          _id: '2',
          name: 'Travel'
        },
        comments: [
          {
            author: 'Alejandro',
            content: 'First comment'
          }
        ],
        _id: '1'
      }
    };
  },
  created() {
    console.log('🚀 ~ created ~ this.id:', this.id);
  },
  unmounted() {}
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
