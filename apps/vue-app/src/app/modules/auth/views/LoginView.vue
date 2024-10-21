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
            <button style="margin-right: 5px;" class="btn btn-outline-primary me-1" v-on:click="signUp">Sign Up</button>
            <button class="btn btn-primary" v-on:click="login">Login</button>
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
import { loginRequest } from '../../../helpers/auth/user';
import { store } from '../../../store/store';
import { alerts} from '../../../helpers/alerts';

export default {
   mixins:[alerts],
    data() {
        return {
          credentials: {
            username: '',
            password: ''
          },
          v$: useVuelidate(),
          error: null,
    };
  },
  beforeCreate() {
    store.setShowNavBar(false);
  },
  methods: {
      signUp() {
        router.push({
          name: 'signUp'
        });
      },
      login() {
        this.v$.$touch();
        if (this.v$.$invalid) {
          return;
        }
        loginRequest(this.credentials)
          .then( result => {
            if(result){
              console.log('Login success');
              store.setShowNavBar(true);
              router.push({
                name: 'home'
              });
            }else{
              this.showAlert('error', "Incorrect Username or Password");
            }
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