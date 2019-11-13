<template>
  <b-container>
    <b-row>
      <b-col cols="8" class="add-post--block mx-auto">
        <b-form>
          <b-form-input id="input-large" size="lg" placeholder="What's new?" class="mb-2 mt-2"></b-form-input>
          <hr />
          <b-form-textarea id="textarea-rows" placeholder="Tell a bit more :)" rows="6"></b-form-textarea>
          <div class="mb-3">
            <b-button variant="outline-primary" class="mr-3">Add a photo</b-button>
            <b-button type="submit" variant="success">Post!</b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

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