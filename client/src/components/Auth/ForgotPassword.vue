<template>
  <b-row align-h="center" align-v="center">
    <b-col cols="11" md="6" sm="8" xl="4">
      <div class="auth--login mb-5">
        <h4 class="mx-auto">Password retrieval</h4>
        <p>Please enter the email that you used to sign in</p>
        <b-form-input
          type="email"
          placeholder="Your email"
          v-model="email"
        ></b-form-input>
        <b-button @click="sendEmail" block type="success" variant="success"
          >Reset my password!</b-button
        >
      </div>
    </b-col>
  </b-row>
</template>

<script>
import axios from '../../auth/axios-auth';
export default {
  data() {
    return {
      email: null
    };
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
