<template>
  <div>
    <app-add-post></app-add-post>
    <app-feed></app-feed>
  </div>
</template>

<script>
import AddPost from '../AddPost.vue';
import Feed from '../Feed/Feed.vue';
export default {
  components: {
    appAddPost: AddPost,
    appFeed: Feed
  }
};
</script>