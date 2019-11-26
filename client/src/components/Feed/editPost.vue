<template>
  <b-col cols="12" xl="8" lg="8" md="12" sm="12" class="mx-auto">
    <b-card
      :title="getPost.title"
      img-alt="Image"
      img-top
      class="post--card mb-5"
      v-if="!isEditing"
      ref="post--card"
    >
      <b-card-text>{{ getPost.description }}</b-card-text>
      <template v-slot:footer>
        <b-container>
          <b-row align-v="center" no-gutters>
            <b-col>
              <div>
                <p>
                  <font-awesome-icon :icon="['fas', 'user-ninja']" class="mr-3" />
                  <small class="text-muted">{{ getPost.user.firstName }} {{getPost.user.lastName}}</small>
                </p>
              </div>
              <div>
                <small class="text-muted">{{ getPost.createdAt | moment('MMMM Do YYYY, h:mm a') }}</small>
              </div>
            </b-col>
            <b-col class="post--comment-block">
              <a class="post--comment-icon mt-2 mr-4">
                <font-awesome-icon :icon="['fas', 'comment']" class="mr-2" />
                {{ getPost.comments ? getPost.comments.length : 0 }}
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
              <div v-for="comment in getPost.comments" :key="comment.id">
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
                  <b-button variant="outline-success" @click="leaveComment">Add</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-card>
    <b-container v-else ref="post--card-editor">
      <app-edit-post-redactor
        :titleProp="getPost.title"
        :descriptionProp="getPost.description"
        :switchProp="this.switchEditing"
        :postIdProp="postId"
      ></app-edit-post-redactor>
    </b-container>
    <div class="mb-3 mt-5">
      <span>
        <b-button @click="switchEditing" class="mr-3">{{ isEditing ? 'Back' : 'Edit post'}}</b-button>
        <b-button @click="deletePost" variant="danger">Delete post</b-button>
      </span>
    </div>
  </b-col>
</template>

<script>
import PostComment from './PostComment.vue';
import EditPostRedactor from './EditPostRedactor.vue';
export default {
  data() {
    return {
      commentBody: '',
      postId: this.$route.params.postId,
      isEditing: false
    };
  },
  components: {
    appPostComment: PostComment,
    appEditPostRedactor: EditPostRedactor
  },
  methods: {
    leaveComment() {
      this.$store.dispatch('leaveComment', {
        commentBody: this.commentBody,
        postId: this.postId
      });
      this.commentBody = '';
    },
    deletePost() {
      this.$store.dispatch('deletePost', { postId: this.postId }).then(() => {
        this.$router.push('/');
      });
    },
    switchEditing() {
      this.isEditing = !this.isEditing;
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
    getPost() {
      const post = this.$store.getters.getPost(this.postId);
      console.log(post);

      return post;
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

.post--card {
  position: relative;
}

.post--ellipsis {
  position: absolute;
  right: 0;
  top: 15px;
}
</style>
