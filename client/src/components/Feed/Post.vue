<template>
  <b-card
    title="Title"
    img-src="https://picsum.photos/300/300/?image=41"
    img-alt="Image"
    img-top
    class="mb-5"
  >
    <b-card-text>
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This card has even longer content than the first to show that equal height action.
    </b-card-text>
    <template v-slot:footer>
      <b-container>
        <b-row align-v="center" no-gutters>
          <b-col cols="2" md="2" sm="2" xl="1">
            <div class="post--footer-block">ava</div>
          </b-col>
          <b-col cols="10" md="2" sm="2" xl="10">
            <small class="text-muted">User Name</small>
            <br />
            <small class="text-muted">Last updated 3 mins ago</small>
          </b-col>
          <b-col></b-col>
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
</style>