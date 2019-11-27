<template>
  <div id="app">
    <app-header></app-header>
    <b-container class="app--container">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>
#app {
  height: 100vh;
  background-color: #fbfbfb;
}

.app--container {
  height: 100vh;
}
</style>
