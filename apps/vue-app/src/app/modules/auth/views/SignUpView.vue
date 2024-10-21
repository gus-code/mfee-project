<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Sign Up</h5>
        <form @submit.prevent>
          <div class="form-group pb-3">
            <label>Username</label>
            <input type="text" class="form-control" :class="v$.newUser.username.$error === true ? 'is-invalid' : ''" v-model="newUser.username"/>
            <span class="form-text text-danger" v-for="error of v$.newUser.username.$errors" :key="error.$uid"> {{ error.$message }}</span>
          </div>
          <div class="form-group pb-3">
            <label>Password</label>
            <input type="password" class="form-control" :class="v$.newUser.password.$error === true ? 'is-invalid' : ''" v-model="newUser.password"/>
            <span class="form-text text-danger" v-for="error of v$.newUser.password.$errors" :key="error.$uid"> {{ error.$message }}</span>
          </div>
          <div class="form-group pb-3">
            <label>Confirm Password</label>
            <input type="password" class="form-control" :class="v$.newUser.confirmPassword.$error === true ? 'is-invalid' : ''" v-model="newUser.confirmPassword"/>
            <span class="form-text text-danger" v-for="error of v$.newUser.confirmPassword.$errors" :key="error.$uid"> {{ error.$message }}</span>
          </div>
          <div class="d-flex justify-content-end mt-1">
            <button style="margin-right: 5px;" class="btn btn-primary" v-on:click="backLogin">Back</button>
            <button class="btn btn-primary" v-on:click="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>     

<script>
import { useVuelidate } from '@vuelidate/core';
import router from '../../../router/router';
import { helpers, required, sameAs } from '@vuelidate/validators';
import { register } from '../../../helpers/auth/user';
import { alerts} from '../../../helpers/alerts';
import { store } from '../../../store/store';

export default {
  components: {},
  mixins:[alerts],
    data() {
        return {
          newUser: {
            username: null,
            password: null,
            confirmPassword: null
          },
          v$: useVuelidate(),
        };
    },
    beforeCreate() {
      store.setShowNavBar(false);
    },
    validations() {
      return {
          newUser: {
            username: {
              required: helpers.withMessage('User field is required.', required),
              $autoDirty: true
            },
            password: {
              required: helpers.withMessage('Password field is required.', required),
              $autoDirty: true
            },
            confirmPassword: {
              required: helpers.withMessage('Confirm password field is required. ', required),
              sameAsPassword: helpers.withMessage('Password and Confirm Password must match.', sameAs(this.newUser.password)),
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
          this.signUp();
        }
      },

      backLogin() {
        router.push({
          name: 'login'
        });
      },

      async signUp() {
        let status;
        const { username, password } = this.newUser;
        status = await register({ username, password });

        if (status) {
           this.showAlert('success', 'The user has been added');
          router.push({
            name: 'login'
          });
        } else {
           this.showAlert('error', "The user couldn't be added");
        }
      }
    }
};
</script>