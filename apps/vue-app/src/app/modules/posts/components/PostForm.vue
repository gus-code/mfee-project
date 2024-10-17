<template>
  <div class="modal fade" id="createPostModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">{{ action }} Post</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reset()"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group pb-3">
              <label>Title</label>
              <input type="text" class="form-control" v-model="post.title" :class="v$.post.title.$error === true ? 'is-invalid' : ''" />
              <span class="form-text text-danger" v-for="error of v$.post.title.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </div>
            <div class="form-group pb-3">
              <label>Description</label>
              <textarea
                class="form-control"
                rows="2"
                v-model="post.description"
                :class="v$.post.description.$error === true ? 'is-invalid' : ''"
              ></textarea>
              <span class="form-text text-danger" v-for="error of v$.post.description.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </div>
            <div class="form-group pb-3">
              <label>Category</label>
              <select class="form-select" v-model="post.category" :class="v$.post.category.$error === true ? 'is-invalid' : ''">
                <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
              </select>
              <span class="form-text text-danger" v-for="error of v$.post.category.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </div>
            <div class="form-group">
              <label>URL of the image</label>
              <input type="text" class="form-control" v-model="post.image" :class="v$.post.image.$error === true ? 'is-invalid' : ''" />
              <span class="form-text text-danger" v-for="error of v$.post.image.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
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
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { getCategories } from '../../../helpers/categories';
import { createPost } from '../../../helpers/posts';
import { store } from '../../../store/store';

export default {
  name: 'PostForm',
  data() {
    return {
      store,
      v$: useVuelidate(),
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
  validations() {
    return {
      post: {
        title: {
          required: helpers.withMessage('Title field is required.', required),
          $autoDirty: true
        },
        description: {
          required: helpers.withMessage('Description field is required.', required),
          $autoDirty: true
        },
        category: {
          required: helpers.withMessage('Category field is required.', required),
          $autoDirty: true
        },
        image: {
          required: helpers.withMessage('Image field is required.', required),
          $autoDirty: true
        }
      }
    };
  },
  methods: {
    async submit() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        this.v$.$touch();
      } else {
        const { title, description, category, image, comments } = this.post;
        const [categorySelected] = this.categories.filter(({ _id }) => _id === category);
        const post = {
          title,
          description,
          image,
          category: categorySelected,
          comments
        };

        this.savePost(post);
      }
    },
    async savePost(post) {
      let status;
      if (this.action === 'Create') {
        status = await createPost(post);
      }

      if (status) {
        this.store.getPosts();
      } else {
        console.error('Error to create a new post');
      }
      this.$refs.btnCloseModal.click();
    },
    reset() {
      this.post = {
        _id: null,
        title: null,
        description: null,
        category: null,
        image: null
      };
      this.v$.$reset();
    },
    async getCategories() {
      this.categories = await getCategories();
    }
  },
  created() {
    this.getCategories();
  },
  unmounted() {}
};
</script>
