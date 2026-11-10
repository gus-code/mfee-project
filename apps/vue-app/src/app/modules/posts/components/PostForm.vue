<template>
  <div class="modal fade" id="createPostModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">{{ action }} Post</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group pb-3">
              <label>Title</label>
              <input type="text" class="form-control" v-model="post.title" />
              <span class="form-text text-danger"> Error </span>
            </div>
            <div class="form-group pb-3">
              <label>Description</label>
              <textarea class="form-control" rows="2" v-model="post.description"></textarea>
              <span class="form-text text-danger"> Error </span>
            </div>
            <div class="form-group pb-3">
              <label>Category</label>
              <select class="form-select" v-model="post.category">
                <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
              </select>
              <span class="form-text text-danger"> Error </span>
            </div>
            <div class="form-group">
              <label>URL of the image</label>
              <input type="text" class="form-control" v-model="post.image" />
              <span class="form-text text-danger"> Error </span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="btnCloseModal" @click="reset()">Cancel</button>
          <button class="btn btn-primary" @click="submit()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  data() {
    return {
      action: 'Create',
      post: {
        _id: null,
        title: null,
        description: null,
        category: null,
        image: null
      },
      categories: [
        {
          _id: '2',
          name: 'Category 1'
        },
        {
          _id: '3',
          name: 'Category 2'
        },
        {
          _id: '4',
          name: 'Category 3'
        }
      ]
    };
  },
  methods: {
    submit() {
      console.log(this.post);
    },
    reset() {
      this.post = {
        _id: null,
        title: null,
        description: null,
        category: null,
        image: null
      };
    }
  },
  created() {},
  unmounted() {}
};
</script>
