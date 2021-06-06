<template>
  <div id="board">
    <app-header></app-header>
    <center>
    <div v-for="(word, index) in words" :key="`word-${index}`" class="word">
      <span>{{ word }}</span>
      <span @click="deleteWord(index)" class="delete"><i class="fas fa-times"></i></span>
    </div>
    <app-canvas @wordAdded="newWord" @movieGet="getMovie"></app-canvas>
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
      max_movie: "",
      movie_list: [],
      poster_path: "",
      poster_list: []
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
    async guess() {
      if (this.words.length < 2) {
        alert("There must be at least 2 keywords.");
        return;
      }
      this.movie_list = [];
      this.poster_list = [];
      this.guessed = true;
      var max = 0;
      var maxidx = 0;
      for (var a = 0; a < this.count.length; a++) this.count[a] = 0;
      for (var i of this.words) {
        for (var j = 0; j < this.movieKeyword.length; j++) {
          var index = this.movieKeyword[j].indexOf(i);
          if (index != -1) {
            this.count[j] += 1;
            this.movie_list.push(this.movieDB[j]);
          }
        }
      }
      for (var k = 0; k < this.count.length; k++) {
        if (max < this.count[k]) {
          max = this.count[k];
          maxidx = k;
        }
      }
      this.max_movie = this.movieDB[maxidx].name;
      this.poster_path = this.movieDB[maxidx].poster_path;
      router.push({ name: 'result', params: { max_movie: this.max_movie, poster_path: this.poster_path, movie_list: this.movie_list, poster_list: this.poster_list }})
    },
    getMovie(movieword) {
      for (var i = 0; i < movieword.length; i++) {
        var temp = movieword[i].keyword.replace('"', "").split(",");
        this.movieKeyword.push(temp);
        this.count.push(0);
      }
      this.movieDB = movieword;
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