<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <form>
          <div class="form-group pb-3">
            <label>Username</label>
            <input type="text" class="form-control is-invalid" v-model="credentials.username"/>
            <span class="form-text text-danger" v-for="error of v$.credentials.username.$errors" :key="error.$uid"> {{ error.$message }}<br></span>
          </div>
          <div class="form-group pb-3">
            <label>Password</label>
            <input type="password" class="form-control" v-model="credentials.password"/>
            <span class="form-text text-danger" v-for="error of v$.credentials.password.$errors" :key="error.$uid"> {{ error.$message }} <br></span>
          </div>

          <span v-if="error" class="form-text text-danger"> {{ error }} </span>
          <div class="d-flex justify-content-end mt-1">
            <button class="btn btn-outline-primary me-1" v-on:click="signUp()">Sign Up</button>
            <button class="btn btn-primary" v-on:click="login()">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import router from '../../../router/router';
import { required, email, helpers } from '@vuelidate/validators';
import { loginService } from '../../../helpers/auth';
import { store } from '../../../store/store';
export default {
    data() {
        return {
          credentials: {
            username: '',
            password: ''
          },
          v$: useVuelidate(),
          error: null
    };
  },
  methods: {
      signUp() {
        router.push({
          name: 'register'
        });
      },
      login() {
        this.v$.$touch();
        if (this.v$.$invalid) {
          return;
        }
        loginService(this.credentials.username, this.credentials.password)
          .then(() => {
            console.log('Login success');
            store.setLogged(true);
            router.push({
              name: 'home'
            });
          })
          .catch((error) => {
            console.log('Error', error);
            this.error = error;
          });
      }
    },
    validations() {
      return {
        credentials: {
          username: {
            required: helpers.withMessage('Username is required', required),
            $autoDirty: true,
            email: helpers.withMessage('Invalid email', email)
          },
          password: { required: helpers.withMessage('Password is required', required), $autoDirty: true }
        }
      };
    }
};
</script>