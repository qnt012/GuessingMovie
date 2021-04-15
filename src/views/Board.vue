<template>
  <div id="board">
    <app-header></app-header>
    <center>
      <app-canvas></app-canvas>
    </center>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Canvas from "../components/Canvas.vue";

export default {
  data: function() {
    return {
      words: []
    };
  },
  computed: {},
  methods: {},
  components: {
    appHeader: Header,
    appCanvas: Canvas
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/board.scss";
</style>



