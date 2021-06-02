<template>
  <div id="board">
    <app-header></app-header>
    <div id="left">
      <app-canvas @wordAdded="newWord" @movieGet="getMovie"></app-canvas>
    </div>
    <div id="right">
      <div v-for="(word, index) in words" :key="`word-${index}`" class="word">
        <span>{{ word }}</span>
        <span @click="deleteWord(index)" class="delete"><i class="fas fa-times"></i></span>
      </div>
      <br/>
      <center>
      <div class="result-btn" v-if="words.length" @click="guess"><div class="eff"></div>Guess Movie!</div>
      </center>
      <h2 class="movie-text" v-if="guessed">{{ max_movie }}</h2>
      <img class="movie" v-if="guessed" v-bind:src="'http://image.tmdb.org/t/p/w500'+poster_path">
      <div v-for="(movie, index) in movie_list.slice(0,5)" :key="`movie-${index}`">
        <div class="else_btn" v-if="movie.name != max_movie && guessed" @click="showElse(index)"><div class="eff-5"></div>/></div>
        <div v-if="movie.name != max_movie && guessed" :id="index" class="ml">
          <div class="el_text">{{movie.name}}</div>
          <img class="el_movie" v-if="guessed" v-bind:src="'http://image.tmdb.org/t/p/w500'+movie.poster_path">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Canvas from "../components/Canvas.vue";

export default {
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
    },
    getMovie(movieword) {
      for (var i = 0; i < movieword.length; i++) {
        var temp = movieword[i].keyword.replace('"', "").split(",");
        this.movieKeyword.push(temp);
        this.count.push(0);
      }
      this.movieDB = movieword;
    },
    showElse(i) {
      var doc = document.getElementById(i)
      if (doc.style.display != "block") doc.style.display = "block";
      else doc.style.display = "none";
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