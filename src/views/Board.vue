<template>
  <div id="board">
    <app-header></app-header>
    <div v-if="candidates.length" class="candi-container">
      <div v-if="candidates.length" @click="candidates = []" class="cx"><i class="fas fa-times"></i></div>
      <div v-for="(candidate, index) in candidates" :key="`candi-${index}`" class="candi">
        <span @click="newWord(candidate)">{{ candidate }}</span>
      </div>
    </div>
    <center>
    <div v-for="(word, index) in words" :key="`word-${index}`" class="word">
      <span>{{ word }}</span>
      <span @click="deleteWord(index)" class="delete"><i class="fas fa-times"></i></span>
    </div>
    <app-canvas @wordAdded="newWord" @movieGet="getMovie" @candiGet="getCandi"></app-canvas>
    <div class="result-btn" v-if="words.length" @click="guess"><div class="eff"></div>Guess Movie!</div>
    </center>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Canvas from "../components/Canvas.vue";
import router from "../router.js";

export default {
  router,
  data: function() {
    return {
      words: [],
      movieDB: Object,
      movieKeyword: [],
      count: [],
      guessed: false,
      candidates: [],
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
      this.candidates = [];
    },
    deleteWord(index) {
      this.words.splice(index, 1);
      this.guessed = false;
    },
    async guess() {
      if (this.words.length < 2) {
        alert("There must be at least 2 keywords.");
        return;
      }
      this.guessed = true;
      for (var i of this.words) {
        for (var j = 0; j < this.movieKeyword.length; j++) {
          for (var e of this.movieKeyword[j]){
            if (i == e) this.count[j][2] += 1;
          }
        }
      }
      this.count.sort(function(a, b) {
        return b[2] - a[2];
      });
      router.push({ name: 'result', params: { count: this.count.splice(0,50), words: this.words}})
    },
    getMovie(movieword) {
      for (var i = 0; i < movieword.length; i++) {
        var temp = movieword[i].keyword.replace('"', "").split(",");
        this.movieKeyword.push(temp);
        this.count.push([movieword[i].name,movieword[i].poster_path, 0])
      }
      this.movieDB = movieword;
    },
    getCandi(c){
      this.candidates = c;
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