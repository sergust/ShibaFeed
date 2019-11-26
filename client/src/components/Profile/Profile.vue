<template>
  <b-container>
    <b-row>
      <b-col cols="12" xl="8" lg="8" md="12" sm="12" class="mx-auto">
        <div class="profile-name mb-5 mt-5">
          <b-img src="../../assets/ava.jpeg" class="profile-name--avatar"></b-img>
          <h2>{{user.firstName}} {{user.lastName}}</h2>
          <h4>{{user.email}}</h4>
        </div>
        <div>
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
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Post from '../Feed/Post';
export default {
  created() {
    this.$store.dispatch('getSingleUser', {
      userId: this.$route.params.userId
    });
  },
  computed: {
    user() {
      return this.$store.getters.authorizedUser;
    },
    posts() {
      return this.$store.getters.getPosts;
    }
  },
  components: {
    appPost: Post
  }
};
</script>

<style scoped>
.profile-name {
  text-align: center;
}

.profile-name--avatar {
  border-radius: 50%;
  border: 10px solid #f4efd3;
}
</style>