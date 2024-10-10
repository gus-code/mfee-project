<template>
  <div class="col-md-12 col-lg-6">
    <div class="card bg-dark text-white">
      <img :src="post.image" class="card-img" />
      <div class="card-img-overlay mt-3 ms-3 card-img" @click="goToPostDetail(post)">
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
export default {
  name: 'PostItem',
  data() {
    return {
      post: {
        _id: '6661055a82f08e5ed86ae7f5',
        title: 'Torre Eiffel UPDATED',
        image: 'https://wallpaper.forfun.com/fetch/1f/1fb47ac98e070792db4d1d7949716b4c.jpeg',
        description:
          'La Torre Eiffel es un monumento excepcional y las vistas desde sus plataformas son alucinantes. Tiene tres niveles, el primero a 57 metros, el segundo a 115 metros y el tercero a unos vertiginosos 276 metros.',
        category: {
          _id: '6667d88982f08e5ed86ae88a',
          name: 'Sport',
          createdAt: '2024-06-11T04:54:33.269Z',
          updatedAt: '2024-06-11T04:54:40.365Z',
          __v: 0
        },
        comments: ['6682419a82f08e5ed86af27a', '668242a582f08e5ed86af28e', '66942d6a4891864731f93985'],
        createdAt: '2024-06-06T00:39:54.397Z',
        updatedAt: '2024-07-14T19:56:26.702Z',
        __v: 3
      }
    };
  },
  methods: {
    goToPostDetail() {
      console.log('🚀 ~ goToPostDetail');
    },
    deletePost() {
      console.log('🚀 ~ deletePost');
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
