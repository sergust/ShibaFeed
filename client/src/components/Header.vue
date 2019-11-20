<template>
  <b-navbar toggleable="lg" type="dark" class="mb-4 header">
    <b-container>
      <b-navbar-brand href="#">
        <b-link to="/feed" class="header--brand">
          <b-img src="../assets/logo.svg" class="header--logo"></b-img>
          <a class="header--logo-text ml-3">ShibaFeed</a>
        </b-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="authenticated" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <a>{{ getUsername }}</a>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#" v-if="!authenticated">Log in</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  computed: {
    getUsername() {
      return this.$store.getters.getUsername;
    },
    authenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signout');
    }
  }
};
</script>

<style>
.header--logo {
  width: 54px;
  height: 54px;
}

.header {
  background-color: #756c83;
  box-shadow: 0px 0px 10px grey;
}

.header--logo-container {
  text-align: center;
}

.header--auth {
  font-size: 24px;
}

@import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah&display=swap');

.header--logo-text {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 1.7rem;
  vertical-align: middle;
}

.header--brand {
  text-decoration: none;
  color: #fff;
}

.header--brand:hover {
  text-decoration: none;
  color: #fff;
}
</style>
