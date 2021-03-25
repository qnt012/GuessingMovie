<template>
  <div id="app">
    <app-header></app-header>
    <app-ball></app-ball>
    <img class="home-img" src="../assets/home.png"/>
    <button class="learn-more" @click="moveTo('board')">Start Game</button>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
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
    appHeader: Header,
    appBall: Ball,
    appFooter: Footer
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/home.scss";
</style>



