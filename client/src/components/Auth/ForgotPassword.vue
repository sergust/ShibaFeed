<template>
  <b-row align-h="center" align-v="center">
    <b-col cols="11" md="6" sm="8" xl="4">
      <div class="auth--login mb-5">
        <h4 class="mx-auto">Password retrieval</h4>
        <p>Please enter the email that you used to sign in</p>
        <b-form-input
          type="email"
          placeholder="Your email"
          @blur="$v.email.$touch()"
          v-model="email"
          :state="$v.email.$dirty ? !$v.email.$error : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          Please enter a valid email
        </b-form-invalid-feedback>
        <b-button
          @click="sendEmail"
          block
          type="success"
          variant="success"
          :disabled="$v.$anyDirty && !$v.$anyError ? false : true"
          >Reset my password!</b-button
        >
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import axios from '../../auth/axios-auth';
export default {
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    sendEmail() {
      const reqBody = {
        email: this.email
      };
      axios
        .post('/api/v1/auth/forgotpassword', reqBody)
        .then(res => {
          this.$bvToast.toast(`Please check your ${reqBody.email} email`, {
            title: 'Email sent!',
            toaster: 'b-toaster-top-center',
            variant: 'Success',
            solid: true
          });
          console.log(res);
        })
        .catch(err => {
          this.$bvToast.toast(`${err.response.data.error}`, {
            title: 'Whoops, something went wrong!',
            toaster: 'b-toaster-top-center',
            variant: 'danger',
            solid: true
          });
          console.log(err.response);
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
