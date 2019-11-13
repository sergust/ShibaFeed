<template>
  <div id="app">
    <app-header></app-header>
    <app-add-post></app-add-post>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AddPost from "./components/AddPost.vue";
export default {
  components: {
    appHeader: Header,
    appAddPost: AddPost
  }
};
</script>

<style>
#app {
  background-color: #fbfbfb;
}
</style>
