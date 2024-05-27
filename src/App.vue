<template>
  
  <div id="app">
    
    <Header />
    
    <router-view />
  </div>
</template>

<script>

import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 10% 90%;
  background-color: rgb(229, 231, 231);
}

.primary-text {
  font-size: 50px;
  color: rgb(18, 149, 253);
}

.secondary-text {
  font-size: 18px;
}

.primary-icon {
  width: 50px;
  height: 50px;
}

.header-text {
  font-size: 28px;
}

label {
  margin-bottom: 10px;
  color: rgb(115, 118, 119);
}

input {
  margin-bottom: 50px;
}


@media screen and (max-width: 430px) and (max-height: 932px) {
  .header-text {
    font-size: 20px;
  }
}
</style>
