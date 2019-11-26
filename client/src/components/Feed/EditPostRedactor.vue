<template>
  <b-row class="mb-4 ml-1 mr-1" align-h="center">
    <b-col class="add-post--block">
      <b-form-input
        id="input-large"
        size="lg"
        placeholder="What's new?"
        class="mb-2 mt-2"
        v-model="title"
      ></b-form-input>
      <hr />
      <b-form-textarea
        id="textarea-rows"
        placeholder="Tell a bit more :)"
        rows="6"
        v-model="description"
      ></b-form-textarea>
      <div class="mt-3">
        <b-button v-show="false" variant="outline-primary" class="mr-3">Add a photo</b-button>
        <b-button variant="success" @click="sendPost">Post!</b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['titleProp', 'descriptionProp', 'switchProp', 'postIdProp'],
  data() {
    return {
      title: this.$props.titleProp,
      description: this.$props.descriptionProp
    };
  },
  methods: {
    sendPost() {
      const reqBody = {
        title: this.title,
        description: this.description
      };
      this.$store
        .dispatch('updatePost', {
          reqBody,
          postId: this.$props.postIdProp
        })
        .then(() => {
          this.title = '';
          this.description = '';
          this.$props.switchProp();
        });
    }
  }
};
</script>