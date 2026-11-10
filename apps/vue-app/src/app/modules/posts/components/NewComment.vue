<template>
  <div class="col-md-6 mt-5">
    <form>
      <input v-model="newComment" type="text" class="form-control" placeholder="Write a comment" />
    </form>
  </div>
  <div class="col-md-6">
    <button class="btn btn-primary mt-2" @click="addNewComment">Add</button>
  </div>
</template>
<script>
  export default {
    name: 'NewComment',
    components: {
    },
    data() {
        return {
          newComment: ''
        };
    },
    methods: {
      addNewComment() {
        console.log('--ADD NEW COMMENT--');
      }
    }
  };
</script>
