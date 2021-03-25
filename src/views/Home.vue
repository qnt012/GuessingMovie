<template>
  <div id="app">
    <app-header></app-header>
    <app-ball></app-ball>
    <img class="home-img" src="../assets/home.png" />
    <button class="learn-more">Start Game</button>
    <app-foot></app-foot>
  </div>
</template>

<script>
import Foot from "../components/Foot.vue";
import Header from "../components/Header.vue";
import Ball from "../components/Ball.vue";

export default {
  name: "App",
  data: function() {
    return {};
  },
  computed: {},
  methods: {},
  async mounted() {},
  watch: {},
  components: {
    appHeader: Header,
    appBall: Ball,
    appFoot: Foot
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/home.scss";
</style>



