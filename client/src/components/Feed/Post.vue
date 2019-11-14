<template>
  <b-card
    title="Title"
    img-src="https://picsum.photos/300/300/?image=41"
    img-alt="Image"
    img-top
    class="mb-5"
  >
    <b-card-text>
      This is a wider card with supporting text below as a natural lead-in to
      additional content. This card has even longer content than the first to
      show that equal height action.
    </b-card-text>
    <template v-slot:footer>
      <b-container>
        <b-row align-v="center" no-gutters>
          <b-col>
            <div>
              <p>
                <font-awesome-icon
                  :icon="['fas', 'user-ninja']"
                  class="mr-3"
                /><small class="text-muted">User Name</small>
              </p>
            </div>
            <div>
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </b-col>
          <b-col class="post--comment-block">
            <a class="post--comment-icon mt-2 mr-4">
              <font-awesome-icon :icon="['fas', 'comment']" class="mr-2" />3
            </a>
            <a
              ><a class="post--paw-icon mt-2">
                <font-awesome-icon :icon="['fas', 'paw']" class="mr-2" />3
              </a></a
            >
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>

<script>
export default {};
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
</style>
