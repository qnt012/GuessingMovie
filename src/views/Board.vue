<template>
  <div id="board">
    <app-header></app-header>
    <div id="left">
      <app-canvas @wordAdded="newWord"></app-canvas>
    </div>
    <div id="right">
      <div v-for="(word, index) in words" :key="`word-${index}`" :id="index" class="word">
        <span>{{ word }}</span>
        <span @click="deleteWord(index)" class="delete"><i class="fas fa-times"></i></span>
      </div>
      <br/>
      <center>
      <div class="result-btn" v-if="words.length" @click="guess"><div class="eff"></div>Guess Movie!</div>
      <div class="movie" v-if="guessed"></div>
      <span class="movie-text" v-if="guessed">{{ movie }}</span>
      </center>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Canvas from "../components/Canvas.vue";

export default {
  data: function() {
    return {
      words: [],
      guessed: false,
      movie: "test"
    };
  },
  methods: {
    newWord(word) {
      if (this.words.length >= 5) {
        alert("There should be no more than 5 keywords.");
        return;
      }
      if (!this.words.includes(word)) {
        this.words.push(word);
        this.guessed = false;
      }
    },
    deleteWord(index) {
      this.words.splice(index, 1);
      this.guessed = false;
    },
    guess() {
      this.guessed = true;
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    appCanvas: Canvas
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/board.scss";
</style>