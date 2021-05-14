<template>
  <div id="app">
    <div class="empty"></div>
    <app-ball></app-ball>
    <img class="home-img" src="../assets/home.png"/>
    <button class="learn-more" @click="moveTo('board')">Start Game</button>
  </div>
</template>

<script>
import Ball from "../components/Ball.vue";
import router from "../router.js";

export default {
  router,
  name: "App",
  data: function() {
    return {};
  },
  computed: {},
  methods: {
    moveTo(page) {
      location.href = "http://localhost:8080/" + page
    }
  },
  mounted() {},
  watch: {},
  components: {
    appBall: Ball
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/home.scss";
</style>



