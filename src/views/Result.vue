<template>
  <div id="result">
    <center>
    <div class="gohome" onclick="location.href = 'http://localhost:8080/'"><i class="fas fa-undo-alt"></i> Go home</div>
    <div class="result-container">
      <h2 class="movie-text">{{ max_movie }}</h2>
      <img class="movie" v-bind:src="'http://image.tmdb.org/t/p/w500'+poster_path">
      <div v-for="(movie, index) in movie_list" :key="`movie-${index}`">
        <div v-if="movie.name != max_movie" :id="index" class="ml">
          <div class="el_text">{{movie.name}}</div>
          <img class="el_movie" v-bind:src="'http://image.tmdb.org/t/p/w500'+movie.poster_path">
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
  props: {
    max_movie: {},
    poster_path: {},
    movie_list: {},
    poster_list: {}
  },
  methods: {
    showElse(i) {
      var doc = document.getElementById(i);
      if (doc.style.display != "block") doc.style.display = "block";
      else doc.style.display = "none";
    }
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
@import "../styles/result.scss";
</style>