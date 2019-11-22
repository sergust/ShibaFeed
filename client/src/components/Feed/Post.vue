<template>
  <b-card
    :title="title"
    img-src="https://picsum.photos/300/300/?image=41"
    img-alt="Image"
    img-top
    class="mb-5"
  >
    <b-card-text>{{ description }}</b-card-text>
    <template v-slot:footer>
      <b-container>
        <b-row align-v="center" no-gutters>
          <b-col>
            <div>
              <p>
                <font-awesome-icon :icon="['fas', 'user-ninja']" class="mr-3" />
                <small class="text-muted">{{ fullName() }}</small>
              </p>
            </div>
            <div>
              <small class="text-muted">
                {{ lastUpdated | moment('MMMM Do YYYY, h:mm a') }}</small
              >
            </div>
          </b-col>
          <b-col class="post--comment-block">
            <a class="post--comment-icon mt-2 mr-4">
              <font-awesome-icon :icon="['fas', 'comment']" class="mr-2" />
              {{ comments ? comments.length : 0 }}
            </a>
            <a>
              <a class="post--paw-icon mt-2 post--paw-counter">
                <font-awesome-icon :icon="['fas', 'paw']" class="mr-2" />3
              </a>
            </a>
          </b-col>
        </b-row>
        <b-row class="post--comments mt-4">
          <b-col>
            <div v-for="comment in comments" :key="comment.id">
              <app-post-comment
                :commentBody="comment.commentBody"
                :commentOwner="comment.user"
                :commentId="comment._id"
                :postId="postId"
              ></app-post-comment>
            </div>
            <b-input-group v-if="authenticated" class="mt-3">
              <b-form-input
                placeholder="Add a comment..."
                v-model="commentBody"
                v-on:keyup.enter="leaveComment"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-success" @click="leaveComment"
                  >Add</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>

<script>
import PostComment from './PostComment.vue';
export default {
  data() {
    return {
      commentBody: ''
    };
  },
  components: {
    appPostComment: PostComment
  },
  methods: {
    fullName() {
      return `${this.$props.postOwner.firstName} ${this.$props.postOwner.lastName}`;
    },
    leaveComment() {
      this.$store.dispatch('leaveComment', {
        commentBody: this.commentBody,
        postId: this.$props.postId
      });
      this.commentBody = '';
    }
  },
  props: [
    'title',
    'description',
    'comments',
    'lastUpdated',
    'postOwner',
    'numberOfComments',
    'postId'
  ],
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style>
.post--footer-block {
  display: inline-block;
}

.post--comment-block {
  text-align: right;
}

.post--comment-icon:hover,
.post--paw-icon:hover {
  cursor: pointer;
}

.post--paw-counter {
  display: none;
}
</style>
