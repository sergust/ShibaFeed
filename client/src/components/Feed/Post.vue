<template>
  <b-card :title="title" img-alt="Image" img-top class="post--card mb-5">
    <font-awesome-icon
      @click="onEditPost"
      :icon="['fas', 'ellipsis-h']"
      class="post--ellipsis mr-3"
    />

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
              <small class="text-muted">{{
                lastUpdated | moment('MMMM Do YYYY, h:mm a')
              }}</small>
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
                v-on:keyup.enter="leaveComment"
                @blur="$v.commentBody.$touch()"
                v-model="commentBody"
                :state="$v.commentBody.$dirty ? !$v.commentBody.$error : null"
              ></b-form-input>

              <b-input-group-append>
                <b-button
                  variant="outline-success"
                  @click="leaveComment"
                  :disabled="$v.$anyDirty && !$v.$anyError ? false : true"
                  >Add</b-button
                >
              </b-input-group-append>
              <b-form-invalid-feedback>
                Comment should be less than
                {{ $v.commentBody.$params.maxLen.max }}
                characters and should not be empty
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import PostComment from './PostComment.vue';
export default {
  data() {
    return {
      commentBody: ''
    };
  },
  validations: {
    commentBody: {
      required,
      maxLen: maxLength(250),
      minLen: minLength(1)
    }
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
    },
    onEditPost() {
      this.$router.push({ path: `/${this.$props.postId}` });
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

.post--card {
  position: relative;
}

.post--ellipsis {
  position: absolute;
  right: 0;
  top: 15px;
}
</style>
