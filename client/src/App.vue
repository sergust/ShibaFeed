<template>
  <div id="app">
    <app-header></app-header>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  components: {
    appHeader: Header
  }
};
</script>

<style>
#app {
  background-color: #fbfbfb;
}
</style>
