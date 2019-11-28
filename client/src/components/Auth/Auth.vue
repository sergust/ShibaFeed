<template>
  <b-row align-h="center">
    <b-col cols="11" md="6" sm="8" xl="4">
      <div class="auth--login mb-5">
        <h4 class="mx-auto">Log in</h4>
        <div>
          <b-form-input
            type="email"
            placeholder="Your email"
            @blur="$v.loginEmail.$touch()"
            v-model="loginEmail"
            :state="$v.loginEmail.$dirty ? !$v.loginEmail.$error : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            Please provide a valid email address
          </b-form-invalid-feedback>
        </div>

        <div>
          <b-form-input
            type="password"
            placeholder="Your password"
            @blur="$v.loginPassword.$touch()"
            v-model="loginPassword"
            :state="$v.loginPassword.$dirty ? !$v.loginPassword.$error : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            Your password should be at least 6 characters
          </b-form-invalid-feedback>
        </div>

        <p>
          <b-button
            @click="logIn"
            variant="outline-primary"
            class="mr-4"
            :disabled="
              $v.loginPassword.$dirty &&
              $v.loginEmail.$dirty &&
              !$v.loginEmail.$error &&
              !$v.loginPassword.$error
                ? false
                : true
            "
            >Log in</b-button
          >
          <b-link v-b-modal.modal-forgot-password to="/forgotpassword"
            >Forgot password?</b-link
          >
        </p>
      </div>
      <div>
        <div class="auth--signup">
          <h4>First time here?</h4>
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
import { required, email, minLength } from 'vuelidate/lib/validators';
import makeToast from '../../utils/makeToast';
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
      this.$store.dispatch('login', { vm: this, reqBody });
    },
    signUp() {
      const reqSignUpBody = {
        firstName: this.signUpFirstName,
        lastName: this.signUpLastName,
        email: this.signUpEmail,
        password: this.signUpPassword
      };
      console.log(reqSignUpBody);

      this.$store.dispatch('signup', { vm: this, reqSignUpBody });
    },
    ...makeToast
  },
  validations: {
    loginEmail: {
      required,
      email
    },
    loginPassword: {
      required,
      minLen: minLength(6)
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

.input.invalid input {
  color: red;
  border: 1px solid red;
}
</style>
