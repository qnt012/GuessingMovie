<template>
  <div id="board">
    <app-header></app-header>
    <center>
      <app-canvas></app-canvas>
    </center>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Canvas from "../components/Canvas.vue";
import Footer from "../components/Footer.vue";

export default {
  data: function() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    appHeader: Header,
    appCanvas: Canvas,
    appFooter: Footer
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/board.scss";
</style>



