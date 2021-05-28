<template>
  <div id="board">
    <app-header></app-header>
    <div id="left">
      <app-canvas @wordAdded="newWord" @movieGet="getMovie"></app-canvas>
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
      movieDB: Object,
      movieKeyword: [],
      count: [],
      guessed: false,
      movie: ""
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
      var max = 0
      var maxidx = 0
      for (var a = 0; a < this.count.length; a++)
        this.count[a] = 0
      for (var i of this.words)
      {
        for (var j = 0; j < this.movieKeyword.length; j++)
        {
          var index = this.movieKeyword[j].indexOf(i)
          if (index != -1)
          {
            this.count[j] += 1
            //console.log(this.movieDB[j].name)
          }
        }
      }
      for (var k = 0; k < this.count.length; k++)
      {
        if (max < this.count[k])
        {
            max = this.count[k]
            maxidx = k
        }
      }
      this.movie = this.movieDB[maxidx].name
      console.log(this.movieDB[maxidx].name)
      console.log(maxidx)
      console.log(max)
    },
    getMovie(movieword) {
      for (var i = 0; i < movieword.length; i++)
      {
        var temp = movieword[i].keyword.replace("\"","").split(",")
        this.movieKeyword.push(temp)
        this.count.push(0)
      }
      this.movieDB = movieword
      //console.log(this.movieDB[0])
      //console.log(this.movieKeyword[1205][1])
      //console.log(this.movieKeyword.length)
      //console.log(this.count)
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    appCanvas: Canvas,
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/board.scss";
</style>