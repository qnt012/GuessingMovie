<template>
  <div id="board">
    <app-header></app-header>
    <center>
      <div v-for="(word, index) in words" :key="`word-${index}`" :id="index" class="word">
        <span>{{ word }}</span>
        <span @click="deleteWord(index)" class="delete"><i class="fas fa-times"></i></span>
      </div>
      <app-canvas @wordAdded="newWord"></app-canvas>
      <button class="result-btn">Guess Movie!</button>
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
  methods: {
    newWord(word) {
      if (!this.words.includes(word)) {
        this.words.push(word);
        console.log(this.words);
      }
    },
    deleteWord(index) {
      this.words.splice(index, 1);
    }
  },
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



