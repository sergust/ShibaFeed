<template>
  <div>
    <div class="post--comment" v-if="!isEditing">
      <p class="post--comment--p">
        <font-awesome-icon :icon="['fas', 'user-ninja']" class="mr-3" />
        <small class="text-muted">{{ fullName() }} said: &nbsp;</small>
        <small class="text-muted">{{ commentBody }}</small>
        <font-awesome-icon
          :icon="['fas', 'edit']"
          class="post-comment--delete-icon ml-2"
          @click="showEdit"
          v-if="this.$store.getters.isAuthenticated"
        />
      </p>
    </div>
    <div v-if="isEditing">
      <b-input-group
        :prepend="fullName()"
        class="mt-3 mb-3"
        @keydown.esc="hideEdit"
      >
        <b-form-input
          ref="inputItem"
          :value="this.$props.commentBody"
          @keyup.enter="updateComment"
          @blur="$v.comment.$touch()"
          v-model="comment"
          :state="$v.comment.$dirty ? !$v.comment.$error : null"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="updateComment"
            ><font-awesome-icon :icon="['fas', 'edit']"
          /></b-button>
          <b-button variant="danger" @click="deleteComment"
            ><font-awesome-icon :icon="['fas', 'backspace']"
          /></b-button>
        </b-input-group-append>
        <b-form-invalid-feedback>
          Comment should be less than
          {{ $v.comment.$params.maxLen.max }}
          characters
        </b-form-invalid-feedback>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      isEditing: false,
      comment: this.$props.commentBody
    };
  },
  validations: {
    comment: {
      required,
      minLen: minLength(1),
      maxLen: maxLength(250)
    }
  },
  methods: {
    fullName() {
      return `${this.$props.commentOwner.firstName} ${this.$props.commentOwner.lastName}`;
    },
    showEdit() {
      this.isEditing = true;
      this.$nextTick(() => this.$refs.inputItem.$el.focus());
    },
    hideEdit() {
      this.isEditing = false;
      this.$nextTick(() => (this.isEditing = false));
    },
    updateComment() {
      this.$store.dispatch('updateComment', {
        commentBody: this.comment,
        commentId: this.$props.commentId,
        postId: this.$props.postId
      });
      this.hideEdit();
    },
    deleteComment() {
      this.$store.dispatch('deleteComment', {
        commentId: this.$props.commentId,
        postId: this.$props.postId
      });
      this.hideEdit();
    }
  },
  props: ['commentBody', 'commentOwner', 'commentId', 'postId']
};
</script>

<style scoped>
.post-comment--delete-icon {
  display: none;
}

.post--comment--p:hover .post-comment--delete-icon {
  display: initial;
}
</style>
