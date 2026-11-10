<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Login</h5>
          <form>
            <div class="form-group pb-3">
              <label>Username</label>
              <input v-model="newUser.username" type="text" class="form-control is-invalid" />
              <span class="form-text text-danger"> Error </span>
            </div>
            <div class="form-group pb-3">
              <label>Password</label>
              <input v-model="newUser.password" type="password" class="form-control" />
              <span class="form-text text-danger"> Error </span>
            </div>

            <span class="form-text text-danger"> Error </span>
            <div class="d-flex justify-content-end mt-1">
              <button class="btn btn-outline-primary me-1" @click="signUp">Sign Up</button>
              <button class="btn btn-primary" @click="logIn">Login</button>
            </div>
          </form>
        </div>
      </div>
  </div>  
</template>
<script>
  export default {
    name: 'LoginView',
    components: {
    },
    data() {
        return {
          newUser: {
            username: null,
            password: null,
            confirmPassword: null,
          }
        };
    },
    methods: {
      signUp() {
        console.log('** sign up :) **');
      },
      logIn() {
        console.log('** log In :) **');
      }

    }
  };
</script>
