<template>
  <div class="container row mt-5 d-flex flex-column align-items-center">
    <p class="text-center fs-5"><strong> Comments </strong></p>
    <CommentItem v-for="comment in comments" :key="comment._id" :comment="comment" v-show="thereAreComments" />
    <div class="alert alert-warning m-3" role="alert" v-show="!thereAreComments">There are not comments.</div>
    <NewComment @get-post-by-id="getPostById" />
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue';
import NewComment from './NewComment.vue';
export default {
  name: 'PostCommentsList',
  emits: ['getPostById'],
  props: { comments: Array },
  components: {
    CommentItem,
    NewComment
  },
  data() {
    return {
    };
  },
  methods: {
    getPostById() {
      this.$emit('getPostById');
    }
  },
  computed: {
    thereAreComments() {
      return this.comments && this.comments.length > 0;
    }
  }
};
</script>
