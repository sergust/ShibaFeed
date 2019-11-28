<template>
  <b-container v-if="authenticated">
    <b-row class="mb-4 ml-1 mr-1" align-h="center">
      <b-col cols="12" xl="8" lg="8" md="12" sm="12" class="add-post--block">
        <div>
          <b-form-input
            id="input-large"
            size="lg"
            placeholder="What's new?"
            class="mb-2 mt-2"
            @blur="$v.title.$touch()"
            v-model="title"
            :state="$v.title.$dirty ? !$v.title.$error : null"
          ></b-form-input>
          <b-form-invalid-feedback class="ml-3">
            Please enter a title
          </b-form-invalid-feedback>
        </div>

        <hr />
        <div>
          <b-form-textarea
            id="textarea-rows"
            placeholder="Tell a bit more :)"
            rows="6"
            @blur="$v.description.$touch()"
            v-model="description"
            :state="$v.description.$dirty ? !$v.description.$error : null"
          ></b-form-textarea>
          <b-form-invalid-feedback class="ml-3 mt-3 mb-3">
            Description should be less than
            {{ $v.description.$params.maxLen.max }} characters and should not be
            empty
          </b-form-invalid-feedback>
        </div>

        <div class="mb-3">
          <b-button v-show="false" variant="outline-primary" class="mr-3"
            >Add a photo</b-button
          >
          <b-button
            variant="success"
            @click="sendPost"
            :disabled="$v.$anyDirty && !$v.$anyError ? false : true"
            >Post!</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      title: '',
      description: ''
    };
  },
  methods: {
    sendPost() {
      const reqBody = {
        title: this.title,
        description: this.description
      };
      this.$store.dispatch('sendPost', { ...reqBody }).then(() => {
        this.title = '';
        this.description = '';
      });
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  validations: {
    title: {
      required,
      minLen: minLength(1),
      maxLen: maxLength(50)
    },
    description: {
      required,
      minLen: minLength(1),
      maxLen: maxLength(500)
    }
  }
};
</script>

<style scoped>
#input-large,
#textarea-rows {
  border: 0;
}

#input-large:focus,
#input-large:active,
#textarea-rows:focus,
#textarea-rows:active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}

.add-post--block {
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
</style>
