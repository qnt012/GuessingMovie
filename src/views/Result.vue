<template>
  <div id="result">
    <center>
    <div class="gohome" onclick="location.href = 'http://localhost:8080/'"><i class="fas fa-undo-alt"></i> Go home</div>
    <div class="bar">
    <div v-for="(word, index) in words" :key="`word-${index}`" class="word">
      <span>{{ word }}</span>
    </div>
    </div>
    <div class="result-container">
      <h2 class="movie-text">{{ count[0][0] }}</h2>
      <img class="movie" v-bind:src="'http://image.tmdb.org/t/p/w500'+ count[0][1]">
      <div v-for="(movie, index) in count" :key="`movie-${index}`">
        <div v-if="(movie[0] != count[0][0]) && (movie[2] >= words.length - 1)" :id="index" class="ml">
          <div class="el_text">{{movie[0]}}</div>
          <img class="el_movie" v-bind:src="'http://image.tmdb.org/t/p/w500'+movie[1]">
        </div>
      </div>
    </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "result",
  data: function() {
    return {
    };
  },
  mounted(){
    console.log(this.count)
  },
  props: {
    count: null,
    words: null
  },
  methods: {
    showElse(i) {
      var doc = document.getElementById(i);
      if (doc.style.display != "block") doc.style.display = "block";
      else doc.style.display = "none";
    }
  },

};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/result.scss";
</style>