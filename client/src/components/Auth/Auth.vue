<template>
  <b-row align-h="center">
    <b-col cols="11" md="6" sm="8" xl="4">
      <div class="auth--login mb-5">
        <h4 class="mx-auto">Log in</h4>
        <b-form-input
          type="email"
          placeholder="Your email"
          v-model="loginEmail"
        ></b-form-input>
        <b-form-input
          type="password"
          placeholder="Your password"
          v-model="loginPassword"
        ></b-form-input>
        <p>
          <b-button @click="logIn" variant="outline-primary" class="mr-4"
            >Log in</b-button
          >
          <b-link>Forgot password?</b-link>
        </p>
      </div>
      <div>
        <div class="auth--signup">
          <h4>First time there?</h4>
          <p>Sign up for ShibaFeed</p>
          <b-form-input
            type="text"
            placeholder="Your first name"
            v-model="signUpFirstName"
          ></b-form-input>
          <b-form-input
            i
            type="text"
            placeholder="Your last name"
            v-model="signUpLastName"
          ></b-form-input>
          <b-form-input
            type="email"
            placeholder="Your email"
            v-model="signUpEmail"
          ></b-form-input>
          <b-form-input
            type="password"
            placeholder="Your password"
            v-model="signUpPassword"
          ></b-form-input>
          <b-button @click="signUp" block type="success" variant="success"
            >Sign Me Up!</b-button
          >
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import axios from '../../auth/axios-auth';
export default {
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      signUpFirstName: null,
      signUpLastName: null,
      signUpEmail: null,
      signUpPassword: null
    };
  },
  methods: {
    logIn() {
      const reqBody = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      axios
        .post('/api/v1/auth/login', reqBody)
        .then(res => console.log(res))
        .catch(err => {
          this.makeToast(err.response.data.error, 'Failed login!');
        });
    },
    signUp() {
      const reqSignUpBody = {
        firstName: this.signUpFirstName,
        lastName: this.signUpLastName,
        email: this.signUpEmail,
        password: this.signUpPassword
      };
      axios
        .post('/api/v1/auth/register', reqSignUpBody)
        .then(res => console.log(res))
        .catch(err => {
          this.makeToast(err.response.data.error, 'Signing Up failed!');
        });
    },
    makeToast(
      message,
      title = 'Something went wrong!',
      variant = 'danger',
      position = 'b-toaster-top-center'
    ) {
      this.$bvToast.toast(`${message}`, {
        title: `${title}`,
        toaster: position,
        variant: variant,
        solid: true
      });
    }
  }
};
</script>

<style>
.auth--login,
.auth--signup {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.auth--login > *,
.auth--signup > * {
  margin-bottom: 15px;
}

.auth--signup > h4,
.auth--signup > p {
  text-align: center;
}
</style>
