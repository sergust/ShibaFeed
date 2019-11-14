<template>
  <div id="app">
    <app-header></app-header>
    <app-main-page></app-main-page>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MainPage from './components/MainPage/MainPage.vue';
export default {
  components: {
    appHeader: Header,
    appMainPage: MainPage
  }
};
</script>

<style>
#app {
  background-color: #fbfbfb;
}
</style>
