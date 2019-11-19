<template>
  <b-row align-h="center">
    <b-col cols="11" md="6" sm="8" xl="4">
      <form class="auth--login mb-5">
        <h4 class="mx-auto">Log in</h4>
        <b-form-input type="email" placeholder="Your email"></b-form-input>
        <b-form-input
          type="password"
          placeholder="Your password"
        ></b-form-input>
        <p>
          <b-button variant="outline-primary" class="mr-4">Log in</b-button>
          <b-link>Forgot password?</b-link>
        </p>
      </form>
      <div>
        <form action="post" class="auth--signup">
          <h4>First time there?</h4>
          <p>Sign up for ShibaFeed</p>
          <b-form-input
            type="text"
            placeholder="Your first name"
          ></b-form-input>
          <b-form-input
            i
            type="text"
            placeholder="Your last name"
          ></b-form-input>
          <b-form-input type="email" placeholder="Your email"></b-form-input>
          <b-form-input
            type="password"
            placeholder="Your password"
          ></b-form-input>
          <b-button block type="success" variant="success"
            >Sign Me Up!</b-button
          >
        </form>
      </div>
    </b-col>
  </b-row>
</template>

<script></script>

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
