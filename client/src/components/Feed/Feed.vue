<template>
  <b-container>
    <b-row>
      <b-col cols="12" xl="8" lg="8" md="12" sm="12" class="mx-auto">
        <div v-for="post in posts" :key="post.id">
          <app-post
            :title="post.title"
            :description="post.description"
            :comments="post.comments"
            :lastUpdated="post.createdAt"
            :postOwner="post.user"
            :numberOfComments="post.numberOfComments"
            :postId="post.id"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Post from './Post.vue';
export default {
  components: {
    appPost: Post
  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    }
  }
};
</script>
