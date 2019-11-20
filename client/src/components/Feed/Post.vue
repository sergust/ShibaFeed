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
                <small class="text-muted">{{ postOwner }}</small>
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
              {{ numberOfComments }}
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
            <div v-for="(comment, index) in comments" :key="index">
              <app-post-comment
                :commentBody="comment.commentBody"
                :commentOwner="comment.user"
              ></app-post-comment>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>

<script>
import PostComment from './PostComment.vue';
export default {
  components: {
    appPostComment: PostComment
  },
  props: [
    'title',
    'description',
    'comments',
    'lastUpdated',
    'postOwner',
    'numberOfComments'
  ]
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
