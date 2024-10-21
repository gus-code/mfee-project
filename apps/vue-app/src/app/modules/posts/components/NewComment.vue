<template>
  <div class="col-md-6 mt-5">
    <form @submit.prevent>
      <input type="text" class="form-control" placeholder="Write a comment" v-model="comment" :class="v$.comment.$error === true ? 'is-invalid' : ''"/>
      <span class="form-text text-danger" v-for="error of v$.comment.$errors" :key="error.$uid"> {{ error.$message }} </span>
    </form>
  </div>
  <div class="col-md-6">
    <button class="btn btn-primary mt-2" @click="submit">Add</button>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { createComment } from '../../../helpers/comments';
import { useRoute } from 'vue-router';
import { alerts } from '../../../helpers/alerts';

export default {
  components: {},
  mixins: [alerts],
  emits: ['getPostById'],
  data() {
    return {
      v$: useVuelidate(),
      comment: null,
      postId: null,
      route: null
    };
  },
  validations() {
    return {
      comment: {
        required: helpers.withMessage('User field is required.', required),
        $autoDirty: true
      }
    };
  },
  methods: {
    getPostById() {
      this.$emit('getPostById');
    },

    reset() {
      this.comment = null;
      this.v$.$reset();
    },

    async submit() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        this.v$.$touch();
      } else {
        this.addComment();
      }
    },

    async addComment() {
      let status;
      const newComment = { content: this.comment, author: 'Jorge Orozco', postId: this.postId };
      status = await createComment(newComment);

      if (status) {
        this.showAlert('success', 'The comment has been added');
        this.getPostById();
        this.reset();
      } else {
        this.showAlert('error', "The comment couldn't be saved");
      }
    }
  },
  created() {
    this.route = useRoute();
  },
  mounted() {
    this.postId = this.route.params.id;
  }
};
</script>
