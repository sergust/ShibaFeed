<template>
  <b-container fluid class="header">
    <b-container>
      <b-row align-h="between" align-v="center">
        <b-col class="header--logo-container" cols="2">
          <b-img src="../assets/logo.svg" class="header--logo mx-auto mt-3 mb-3"></b-img>
        </b-col>
        <b-col cols="3" class="header--auth">
          <p>🙌 Hi, {{ getUsername }}!</p>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  computed: {
    getUsername() {
      return this.$store.getters.getUsername;
    }
  }
};
</script>

<style>
.header--logo {
  width: 54px;
  height: 54px;
}

.header {
  background-color: #756c83;
  box-shadow: 0px 0px 10px grey;
  margin-bottom: 35px;
}

.header--logo-container {
  text-align: center;
}

.header--auth {
  font-size: 24px;
}
</style>