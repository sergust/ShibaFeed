<template>
  <b-container>
    <b-row align-h="between" align-v="center" class="header">
      <b-col class="header--logo-container" cols="2">
        <b-img src="../assets/logo.svg" class="header--logo mx-auto mt-3 mb-3"></b-img>
      </b-col>
      <b-col cols="3" class="header--auth">
        <p>🙌 Hi, username!</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.header--logo {
  width: 54px;
  height: 54px;
}

.header {
  background-color: #756c83;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0px 0px 10px grey;
}

.header--logo-container {
  text-align: center;
}

.header--auth {
  font-size: 24px;
}
</style>