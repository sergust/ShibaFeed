<template>
  <b-navbar toggleable="lg" type="dark" class="mb-4 header">
    <b-container>
      <b-navbar-brand href="#">
        <b-img src="../assets/logo.svg" class="header--logo"></b-img>
        <a class="ml-3">ShibaFeed</a>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <a>{{ getUsername }}</a>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
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
</style>